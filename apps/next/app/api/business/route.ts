import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'

const COLLECTION = 'businesses'

export async function GET(req: NextRequest) {
  try {
    const db = await getDb()
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })

    const doc = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) })
    if (!doc) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json({ ...doc, id: doc._id })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch business' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const db   = await getDb()
    const body = await req.json()

    const doc = {
      ...body,
      plan:      body.plan ?? 'free',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const result = await db.collection(COLLECTION).insertOne(doc)
    return NextResponse.json({ ...doc, id: result.insertedId }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create business' }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const db   = await getDb()
    const body = await req.json()
    const { id } = body
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 })

    const update = { ...body, updatedAt: new Date().toISOString() }
    delete update._id
    delete update.id

    await db.collection(COLLECTION).updateOne(
      { _id: new ObjectId(id) },
      { $set: update }
    )
    const updated = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) })
    return NextResponse.json({ ...updated, id: updated?._id })
  } catch {
    return NextResponse.json({ error: 'Failed to update business' }, { status: 500 })
  }
}
