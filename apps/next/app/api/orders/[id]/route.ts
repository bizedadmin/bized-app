import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'

const COLLECTION = 'orders'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db  = await getDb()
    const doc = await db.collection(COLLECTION).findOne({ _id: new ObjectId(params.id) })
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ ...doc, id: doc._id })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const db   = await getDb()
    const body = await req.json()
    const update = { ...body, updatedAt: new Date().toISOString() }
    delete update._id
    await db.collection(COLLECTION).updateOne(
      { _id: new ObjectId(params.id) },
      { $set: update }
    )
    const updated = await db.collection(COLLECTION).findOne({ _id: new ObjectId(params.id) })
    return NextResponse.json({ ...updated, id: updated?._id })
  } catch {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}
