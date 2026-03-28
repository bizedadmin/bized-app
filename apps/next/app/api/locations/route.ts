import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "bizedapp");
    
    const locations = await db.collection("locations").find({}).toArray();
    return NextResponse.json(locations.map(loc => ({ ...loc, id: loc._id.toString() })));

  } catch (error) {
    console.error("Locations API error:", error);
    return NextResponse.json({ message: "Failed to fetch locations" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "bizedapp");
    const body = await req.json();
    
    const { name } = body;
    if (!name) return NextResponse.json({ message: "Name is required" }, { status: 400 });

    const colors = ['bg-green-500', 'bg-blue-500', 'bg-orange-500', 'bg-purple-500', 'bg-pink-500', 'bg-teal-500'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const initials = name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2);

    const newLocation = {
      name,
      status: 'Online',
      whatsapp: 'Disconnected',
      initials,
      color: randomColor,
      staff: 0,
      createdAt: new Date()
    };

    const result = await db.collection("locations").insertOne(newLocation);
    
    return NextResponse.json({ 
      ...newLocation, 
      id: result.insertedId.toString() 
    });

  } catch (error) {
    console.error("Add location error:", error);
    return NextResponse.json({ message: "Failed to add location" }, { status: 500 });
  }
}
