import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "bizedapp");
    
    // In a real app, you would aggregate these from your orders collection
    // For now, we'll return realistic dynamic mock data
    const stats = {
      revenue: 12540.50,
      revenueGrowth: 12.5,
      orders: 482,
      ordersGrowth: 8.2,
      customers: 1250,
      customersGrowth: 5.4,
    };

    const recentOrders = [
      { id: '1', customer: 'John Doe', total: 45.00, status: 'Completed', date: '2 mins ago' },
      { id: '2', customer: 'Sarah Smith', total: 120.50, status: 'Pending', date: '15 mins ago' },
      { id: '3', customer: 'Mike Johnson', total: 89.99, status: 'In Transit', date: '1 hour ago' },
      { id: '4', customer: 'Emily Brown', total: 32.25, status: 'Completed', date: '3 hours ago' },
    ];

    return NextResponse.json({ stats, recentOrders });

  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json({ message: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
