'use client'

import { useRealTimeFlightData, CleanFlightData } from './fetchingData'
import { useState } from 'react'
import { Button } from "@/components/ui/button"

export default function FlightDataTable() {
  const [isLive, setIsLive] = useState(false)
  const { flightData, loading, error } = useRealTimeFlightData(isLive ? 30000 : 0)

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div>
    </div>
  )
}