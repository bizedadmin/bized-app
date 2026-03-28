"use client"
import React from 'react'

export default function DashboardPage() {
  const stats = { revenue: 12450.00, revenueGrowth: 15, orders: 342, ordersGrowth: -2 }
  const recentOrders = [
    { id: "1", customer: "John Doe", total: 45.00, status: "completed", date: "Today, 10:23 AM" },
    { id: "2", customer: "Sarah Smith", total: 120.50, status: "pending", date: "Today, 09:15 AM" },
    { id: "3", customer: "Mike Johnson", total: 15.00, status: "processing", date: "Yesterday" }
  ]

  const formatCurrency = (amount: number) => `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B141A]">
      <div className="bg-[#075E54] px-6 pt-12 pb-24">
        <div className="max-w-4xl mx-auto">
          <p className="text-white/80 font-medium mb-1">Overview</p>
          <h1 className="text-3xl font-black text-white">Dashboard</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* KPI 1 */}
          <div className="bg-white dark:bg-[#111B21] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
            <div className="w-12 h-12 bg-[#25D366]/10 rounded-xl flex items-center justify-center mb-4 text-[#25D366] text-xl font-black">
              $
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Revenue</p>
            <p className="text-3xl font-black text-gray-900 dark:text-white mb-2">
              {formatCurrency(stats.revenue)}
            </p>
            <p className="text-sm font-bold text-[#25D366]">
              +{stats.revenueGrowth}% <span className="text-gray-400 font-medium">vs last month</span>
            </p>
          </div>

          {/* KPI 2 */}
          <div className="bg-white dark:bg-[#111B21] rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 text-blue-500 text-xl font-black">
              📦
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Orders</p>
            <p className="text-3xl font-black text-gray-900 dark:text-white mb-2">
              {stats.orders}
            </p>
            <p className="text-sm font-bold text-red-500">
              {stats.ordersGrowth}% <span className="text-gray-400 font-medium">vs last month</span>
            </p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-gray-900 dark:text-white font-black text-xl">Recent Orders</h2>
          <button className="text-[#25D366] font-bold text-sm hover:underline">View All</button>
        </div>

        <div className="space-y-3 mb-12">
          {recentOrders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-[#111B21] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-white/5 flex justify-between items-center transition-all hover:border-gray-200 dark:hover:border-white/10">
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{order.customer}</p>
                <p className="text-gray-400 text-sm mt-0.5">{order.date}</p>
              </div>
              <div className="text-right">
                <p className="font-black text-[#25D366] text-lg">{formatCurrency(order.total)}</p>
                <p className={`text-xs font-bold mt-1 capitalize px-2.5 py-1 rounded-md inline-block ${
                  order.status === 'completed' ? 'bg-[#25D366]/10 text-[#25D366]' : 
                  order.status === 'pending' ? 'bg-amber-500/10 text-amber-500' : 
                  'bg-blue-500/10 text-blue-500'
                }`}>
                  {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
