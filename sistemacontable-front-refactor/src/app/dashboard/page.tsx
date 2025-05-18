
import React from 'react'
import { DashboardCards } from './(ui)/dash-cards'
import { DashboardChart } from './(ui)/dash-chart'

type Props = {}

export default function DashboardPage({}: Props) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <DashboardCards />
          {/* <DashboardChart /> */}
        </div>
      </div>
    </div>
  )
}