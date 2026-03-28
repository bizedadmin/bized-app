import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'

const COLLECTION = 'payments'

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

    // Total paid amount
    const summary = await db.collection(COLLECTION).aggregate([
      { $match: { ...(businessId ? { businessId } : {}), status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]).toArray()

    return NextResponse.json({
      data, total, page, perPage,
      totalPages: Math.ceil(total / perPage),
      totalPaid: summary[0]?.total ?? 0,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch payments' }, { status: 500 })
  }
}
