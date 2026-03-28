import { NextRequest, NextResponse } from 'next/server'
import { getDb } from '@/lib/mongodb'

const COLLECTION = 'store_configs'

export async function GET(req: NextRequest) {
  try {
    const db = await getDb()
    const { searchParams } = new URL(req.url)
    const businessId = searchParams.get('businessId')
    if (!businessId) return NextResponse.json({ error: 'businessId is required' }, { status: 400 })

    const doc = await db.collection(COLLECTION).findOne({ businessId })
    return doc
      ? NextResponse.json({ ...doc, id: doc._id })
      : NextResponse.json({ error: 'Store config not found' }, { status: 404 })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch store config' }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const db   = await getDb()
    const body = await req.json()
    const { businessId } = body

    if (!businessId) return NextResponse.json({ error: 'businessId is required' }, { status: 400 })

    // Check subdomain uniqueness (excluding current business)
    if (body.subdomain) {
      const existing = await db.collection(COLLECTION).findOne({
        subdomain:  body.subdomain,
        businessId: { $ne: businessId },
      })
      if (existing) {
        return NextResponse.json({ error: 'Subdomain already taken' }, { status: 409 })
      }
    }

    const update = { ...body, updatedAt: new Date().toISOString() }
    delete update._id

    await db.collection(COLLECTION).updateOne(
      { businessId },
      { $set: update, $setOnInsert: { createdAt: new Date().toISOString() } },
      { upsert: true }
    )

    const updated = await db.collection(COLLECTION).findOne({ businessId })
    return NextResponse.json({ ...updated, id: updated?._id })
  } catch {
    return NextResponse.json({ error: 'Failed to update store config' }, { status: 500 })
  }
}
