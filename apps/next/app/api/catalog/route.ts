import { NextRequest, NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import { getDb } from '@/lib/mongodb'

const COLLECTION = 'products'

// ─── GET /api/catalog ────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  try {
    const db = await getDb()
    const { searchParams } = new URL(req.url)
    const businessId = searchParams.get('businessId')
    const page       = parseInt(searchParams.get('page')    ?? '1')
    const perPage    = parseInt(searchParams.get('perPage') ?? '20')
    const search     = searchParams.get('search') ?? ''
    const inStock    = searchParams.get('inStock')

    const filter: Record<string, unknown> = {}
    if (businessId) filter.businessId = businessId
    if (inStock === 'true')  filter.inStock = true
    if (inStock === 'false') filter.inStock = false
    if (search) filter.name = { $regex: search, $options: 'i' }

    const skip  = (page - 1) * perPage
    const total = await db.collection(COLLECTION).countDocuments(filter)
    const data  = await db.collection(COLLECTION)
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(perPage)
      .toArray()

    return NextResponse.json({ data, total, page, perPage, totalPages: Math.ceil(total / perPage) })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

// ─── POST /api/catalog ───────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const db   = await getDb()
    const body = await req.json()

    const doc = {
      ...body,
      inStock:   body.inStock ?? true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const result = await db.collection(COLLECTION).insertOne(doc)
    return NextResponse.json({ ...doc, id: result.insertedId }, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
