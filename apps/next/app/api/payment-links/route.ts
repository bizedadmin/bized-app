import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'

const COLLECTION = 'payment_links'

export async function GET(req: NextRequest) {
  try {
    const db = await getDb()
    const { searchParams } = new URL(req.url)
    const businessId = searchParams.get('businessId')

    const filter: Record<string, unknown> = {}
    if (businessId) filter.businessId = businessId

    const data = await db.collection(COLLECTION)
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch payment links' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const db   = await getDb()
    const body = await req.json()
    const id   = new ObjectId()

    const doc = {
      ...body,
      _id:      id,
      url:      `https://pay.bized.app/l/${id.toHexString()}`,
      isActive: body.isActive ?? true,
      createdAt: new Date().toISOString(),
    }

    await db.collection(COLLECTION).insertOne(doc)
    return NextResponse.json({ ...doc, id: doc._id }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create payment link' }, { status: 500 })
  }
}
