import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'

const COLLECTION = 'invoices'

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

    // Revenue summary
    const summary = await db.collection(COLLECTION).aggregate([
      { $match: { ...(businessId ? { businessId } : {}), status: 'paid' } },
      { $group: { _id: null, totalRevenue: { $sum: '$total' } } },
    ]).toArray()

    return NextResponse.json({
      data, total, page, perPage,
      totalPages: Math.ceil(total / perPage),
      totalRevenue: summary[0]?.totalRevenue ?? 0,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch invoices' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const db   = await getDb()
    const body = await req.json()

    const subtotal = body.items?.reduce(
      (s: number, i: { quantity: number; unitPrice: number }) => s + i.quantity * i.unitPrice, 0
    ) ?? 0
    const tax   = subtotal * ((body.taxRate ?? 0) / 100)
    const total = subtotal + tax

    const items = body.items?.map((i: { quantity: number; unitPrice: number; description: string }) => ({
      ...i,
      total: i.quantity * i.unitPrice,
    })) ?? []

    const doc = {
      ...body,
      items,
      subtotal,
      tax,
      total,
      status:    body.status ?? 'draft',
      createdAt: new Date().toISOString(),
    }

    const result = await db.collection(COLLECTION).insertOne(doc)
    return NextResponse.json({ ...doc, id: result.insertedId }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 })
  }
}
