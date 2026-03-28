import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'

const COLLECTION = 'bookings'

export async function GET(req: NextRequest) {
  try {
    const db = await getDb()
    const { searchParams } = new URL(req.url)
    const businessId = searchParams.get('businessId')
    const status     = searchParams.get('status')
    const date       = searchParams.get('date')       // YYYY-MM-DD
    const page       = parseInt(searchParams.get('page')    ?? '1')
    const perPage    = parseInt(searchParams.get('perPage') ?? '20')

    const filter: Record<string, unknown> = {}
    if (businessId) filter.businessId = businessId
    if (status)     filter.status     = status
    if (date)       filter.date       = date

    const skip  = (page - 1) * perPage
    const total = await db.collection(COLLECTION).countDocuments(filter)
    const data  = await db.collection(COLLECTION)
      .find(filter)
      .sort({ date: 1, time: 1 })
      .skip(skip)
      .limit(perPage)
      .toArray()

    return NextResponse.json({ data, total, page, perPage, totalPages: Math.ceil(total / perPage) })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const db   = await getDb()
    const body = await req.json()

    const doc = {
      ...body,
      status:    body.status ?? 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const result = await db.collection(COLLECTION).insertOne(doc)
    return NextResponse.json({ ...doc, id: result.insertedId }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
  }
}
