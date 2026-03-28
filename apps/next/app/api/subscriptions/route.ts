import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'

const COLLECTION = 'subscriptions'

export async function GET(req: NextRequest) {
  try {
    const db = await getDb()
    const { searchParams } = new URL(req.url)
    const businessId = searchParams.get('businessId')
    const status     = searchParams.get('status')
    const page       = parseInt(searchParams.get('page')    ?? '1')
    const perPage    = parseInt(searchParams.get('perPage') ?? '20')

    const filter: Record<string, unknown> = {}
    if (businessId) filter.businessId = businessId
    if (status)     filter.status     = status

    const skip  = (page - 1) * perPage
    const total = await db.collection(COLLECTION).countDocuments(filter)
    const data  = await db.collection(COLLECTION)
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage)
      .toArray()

    // Calculate MRR (active monthly subscriptions only)
    const mrr = await db.collection(COLLECTION).aggregate([
      { $match: { ...(businessId ? { businessId } : {}), status: 'active' } },
      { $group: {
        _id: null,
        mrr: { $sum: {
          $switch: {
            branches: [
              { case: { $eq: ['$interval', 'daily'] },   then: { $multiply: ['$price', 30] } },
              { case: { $eq: ['$interval', 'weekly'] },  then: { $multiply: ['$price', 4.33] } },
              { case: { $eq: ['$interval', 'monthly'] }, then: '$price' },
              { case: { $eq: ['$interval', 'yearly'] },  then: { $divide: ['$price', 12] } },
            ],
            default: '$price'
          }
        }}
      }}
    ]).toArray()

    return NextResponse.json({
      data, total, page, perPage,
      totalPages: Math.ceil(total / perPage),
      mrr: Math.round(mrr[0]?.mrr ?? 0),
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch subscriptions' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const db   = await getDb()
    const body = await req.json()

    const doc = {
      ...body,
      status:    body.status ?? 'active',
      createdAt: new Date().toISOString(),
    }

    const result = await db.collection(COLLECTION).insertOne(doc)
    return NextResponse.json({ ...doc, id: result.insertedId }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create subscription' }, { status: 500 })
  }
}
