
import React from 'react'
import { DashboardCards } from './(ui)/dash-cards'
import { DashboardChart } from './(ui)/dash-chart'
import { Verification } from './verification'

export const metadata = {
  title: "SSAA II - Dashboard",
  description: "Resumen general del sistema",
}

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <Verification />
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <DashboardCards />
          <div className="px-4 lg:px-6">
            <DashboardChart />
          </div>
        </div>
      </div>
    </div>
  )
}