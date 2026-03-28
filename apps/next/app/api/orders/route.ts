import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'

const COLLECTION = 'orders'

// ─── GET /api/orders ─────────────────────────────────────────────────────────
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

    // Aggregate stats
    const stats = await db.collection(COLLECTION).aggregate([
      { $match: businessId ? { businessId } : {} },
      { $group: {
        _id: null,
        total:     { $sum: 1 },
        pending:   { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
        delivered: { $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0] } },
        revenue:   { $sum: { $cond: [{ $eq: ['$status', 'delivered'] }, '$total', 0] } },
      }}
    ]).toArray()

    return NextResponse.json({
      data,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage),
      stats: stats[0] ?? { total: 0, pending: 0, delivered: 0, revenue: 0 },
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}

// ─── POST /api/orders ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const db   = await getDb()
    const body = await req.json()

    const order = {
      ...body,
      status:    body.status ?? 'pending',
      total:     body.items?.reduce((s: number, i: { price: number; quantity: number }) => s + i.price * i.quantity, 0) ?? 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const result = await db.collection(COLLECTION).insertOne(order)
    return NextResponse.json({ ...order, id: result.insertedId }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }
}
