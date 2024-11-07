'use client'

import React, { useState, useMemo } from 'react'
import { Plane, Users, Home} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, Pie, PieChart } from 'recharts'

import CarouselMetric from './CarouselMetric'

interface Flight {
    flight_number: string
    brand: string
    month: string
    estimated_departure: string
    estimated_arrival: string
    actual_departure: string
    actual_arrival: string
    aircraft_type: string
    aircraft_capacity: number
    status: string
    price_per_kg: number
    departure_origin: string
    arrival_place: string
    }
  
  
  
  const flights: Flight[] = [
    {
      "flight_number": "CX126",
      "brand": "Cathay",
      "month": "January",
      "estimated_departure": "2023-01-10T09:00:00Z",
      "estimated_arrival": "2023-01-10T13:00:00Z",
      "actual_departure": "2023-01-10T09:05:00Z",
      "actual_arrival": "2023-01-10T13:05:00Z",
      "aircraft_type": "Airbus A330",
      "aircraft_capacity": 80000,
      "status": "OnTime",
      "price_per_kg": 25,
      "departure_origin": "Hong Kong",
      "arrival_place": "Los Angeles"
    },
    {
      "flight_number": "CX127",
      "brand": "Cathay",
      "month": "February",
      "estimated_departure": "2023-02-11T11:00:00Z",
      "estimated_arrival": "2023-02-11T15:00:00Z",
      "actual_departure": "2023-02-11T11:20:00Z",
      "actual_arrival": "2023-02-11T15:25:00Z",
      "aircraft_type": "Boeing 777",
      "aircraft_capacity": 90000,
      "status": "Delayed",
      "price_per_kg": 26,
      "departure_origin": "Hong Kong",
      "arrival_place": "Chicago"
    },
    {
      "flight_number": "CX128",
      "brand": "Cathay",
      "month": "March",
      "estimated_departure": "2023-03-12T12:00:00Z",
      "estimated_arrival": "2023-03-12T16:00:00Z",
      "actual_departure": "2023-03-12T12:00:00Z",
      "actual_arrival": "2023-03-12T16:00:00Z",
      "aircraft_type": "Boeing 747",
      "aircraft_capacity": 100000,
      "status": "OnTime",
      "price_per_kg": 27,
      "departure_origin": "Hong Kong",
      "arrival_place": "New York"
    },
    {
      "flight_number": "SQ459",
      "brand": "Singapore Airlines",
      "month": "April",
      "estimated_departure": "2023-04-13T14:00:00Z",
      "estimated_arrival": "2023-04-13T18:00:00Z",
      "actual_departure": "2023-04-13T14:15:00Z",
      "actual_arrival": "2023-04-13T18:10:00Z",
      "aircraft_type": "Airbus A350",
      "aircraft_capacity": 90000,
      "status": "OnTime",
      "price_per_kg": 30,
      "departure_origin": "Singapore",
      "arrival_place": "San Francisco"
    },
    {
      "flight_number": "SQ460",
      "brand": "Singapore Airlines",
      "month": "May",
      "estimated_departure": "2023-05-14T16:00:00Z",
      "estimated_arrival": "2023-05-14T20:00:00Z",
      "actual_departure": "2023-05-14T16:05:00Z",
      "actual_arrival": "2023-05-14T20:05:00Z",
      "aircraft_type": "Boeing 777",
      "aircraft_capacity": 95000,
      "status": "OnTime",
      "price_per_kg": 31,
      "departure_origin": "Singapore",
      "arrival_place": "London"
    },
    {
      "flight_number": "SQ461",
      "brand": "Singapore Airlines",
      "month": "June",
      "estimated_departure": "2023-06-15T07:00:00Z",
      "estimated_arrival": "2023-06-15T11:00:00Z",
      "actual_departure": "2023-06-15T07:10:00Z",
      "actual_arrival": "2023-06-15T11:15:00Z",
      "aircraft_type": "Airbus A380",
      "aircraft_capacity": 120000,
      "status": "OnTime",
      "price_per_kg": 37,
      "departure_origin": "Singapore",
      "arrival_place": "Dubai"
    },
    {
      "flight_number": "EK792",
      "brand": "Emirates",
      "month": "July",
      "estimated_departure": "2023-07-16T08:00:00Z",
      "estimated_arrival": "2023-07-16T12:00:00Z",
      "actual_departure": "2023-07-16T08:05:00Z",
      "actual_arrival": "2023-07-16T12:05:00Z",
      "aircraft_type": "Boeing 777",
      "aircraft_capacity": 100000,
      "status": "OnTime",
      "price_per_kg": 39,
      "departure_origin": "Dubai",
      "arrival_place": "Frankfurt"
    },
    {
      "flight_number": "EK793",
      "brand": "Emirates",
      "month": "August",
      "estimated_departure": "2023-08-17T15:00:00Z",
      "estimated_arrival": "2023-08-17T19:00:00Z",
      "actual_departure": "2023-08-17T15:20:00Z",
      "actual_arrival": "2023-08-17T19:30:00Z",
      "aircraft_type": "Airbus A380",
      "aircraft_capacity": 120000,
      "status": "Delayed",
      "price_per_kg": 38,
      "departure_origin": "Dubai",
      "arrival_place": "New York"
    },
    {
      "flight_number": "EK794",
      "brand": "Emirates",
      "month": "September",
      "estimated_departure": "2023-09-18T09:00:00Z",
      "estimated_arrival": "2023-09-18T13:00:00Z",
      "actual_departure": "2023-09-18T09:05:00Z",
      "actual_arrival": "2023-09-18T13:05:00Z",
      "aircraft_type": "Boeing 747",
      "aircraft_capacity": 100000,
      "status": "OnTime",
      "price_per_kg": 39,
      "departure_origin": "Dubai",
      "arrival_place": "Los Angeles"
    },
    {
      "flight_number": "EK795",
      "brand": "Emirates",
      "month": "October",
      "estimated_departure": "2023-10-19T14:00:00Z",
      "estimated_arrival": "2023-10-19T18:00:00Z",
      "actual_departure": "2023-10-19T14:15:00Z",
      "actual_arrival": "2023-10-19T18:10:00Z",
      "aircraft_type": "Airbus A350",
      "aircraft_capacity": 90000,
      "status": "OnTime",
      "price_per_kg": 30,
      "departure_origin": "Dubai",
      "arrival_place": "Tokyo"
    },
    {
      "flight_number": "SQ462",
      "brand": "Singapore Airlines",
      "month": "November",
      "estimated_departure": "2023-11-20T11:00:00Z",
      "estimated_arrival": "2023-11-20T15:00:00Z",
      "actual_departure": "2023-11-20T11:20:00Z",
      "actual_arrival": "2023-11-20T15:25:00Z",
      "aircraft_type": "Boeing 777",
      "aircraft_capacity": 95000,
      "status": "Delayed",
      "price_per_kg": 31,
      "departure_origin": "Singapore",
      "arrival_place": "Sydney"
    },
    {
      "flight_number": "SQ463",
      "brand": "Singapore Airlines",
      "month": "December",
      "estimated_departure": "2023-12-21T12:00:00Z",
      "estimated_arrival": "2023-12-21T16:00:00Z",
      "actual_departure": "2023-12-21T12:00:00Z",
      "actual_arrival": "2023-12-21T16:00:00Z",
      "aircraft_type": "Airbus A330",
      "aircraft_capacity": 80000,
      "status": "OnTime",
      "price_per_kg": 32,
      "departure_origin": "Singapore",
      "arrival_place": "Bangkok"
    },
    {
      "flight_number": "CX129",
      "brand": "Cathay",
      "month": "January",
      "estimated_departure": "2023-01-15T10:00:00Z",
      "estimated_arrival": "2023-01-15T14:00:00Z",
      "actual_departure": "2023-01-15T10:05:00Z",
      "actual_arrival": "2023-01-15T14:10:00Z",
      "aircraft_type": "Airbus A350",
      "aircraft_capacity": 85000,
      "status": "OnTime",
      "price_per_kg": 29,
      "departure_origin": "Hong Kong",
      "arrival_place": "Toronto"
    },
    {
      "flight_number": "CX130",
      "brand": "Cathay",
      "month": "February",
      "estimated_departure": "2023-02-20T13:00:00Z",
      "estimated_arrival": "2023-02-20T17:00:00Z",
      "actual_departure": "2023-02-20T13:10:00Z",
      "actual_arrival": "2023-02-20T17:15:00Z",
      "aircraft_type": "Boeing 787",
      "aircraft_capacity": 95000,
      "status": "OnTime",
      "price_per_kg": 28,
      "departure_origin": "Hong Kong",
      "arrival_place": "Singapore"
    },
    {
      "flight_number": "SQ464",
      "brand": "Singapore Airlines",
      "month": "March",
      "estimated_departure": "2023-03-23T11:00:00Z",
      "estimated_arrival": "2023-03-23T15:00:00Z",
      "actual_departure": "2023-03-23T11:05:00Z",
      "actual_arrival": "2023-03-23T15:05:00Z",
      "aircraft_type": "Airbus A380",
      "aircraft_capacity": 120000,
      "status": "OnTime",
      "price_per_kg": 34,
      "departure_origin": "Singapore",
      "arrival_place": "Tokyo"
    },
    {
      "flight_number": "EK796",
      "brand": "Emirates",
      "month": "April",
      "estimated_departure": "2023-04-05T14:00:00Z",
      "estimated_arrival": "2023-04-05T18:00:00Z",
      "actual_departure": "2023-04-05T14:10:00Z",
      "actual_arrival": "2023-04-05T18:15:00Z",
      "aircraft_type": "Boeing 777",
      "aircraft_capacity": 100000,
      "status": "Delayed",
      "price_per_kg": 36,
      "departure_origin": "Dubai",
      "arrival_place": "Sydney"
    },
    {
      "flight_number": "EK797",
      "brand": "Emirates",
      "month": "May",
      "estimated_departure": "2023-05-30T09:00:00Z",
      "estimated_arrival": "2023-05-30T13:00:00Z",
      "actual_departure": "2023-05-30T09:15:00Z",
      "actual_arrival": "2023-05-30T13:20:00Z",
      "aircraft_type": "Airbus A350",
      "aircraft_capacity": 90000,
      "status": "OnTime",
      "price_per_kg": 32,
      "departure_origin": "Dubai",
      "arrival_place": "London"
    },
    {
      "flight_number": "SQ465",
      "brand": "Singapore Airlines",
      "month": "June",
      "estimated_departure": "2023-06-25T16:00:00Z",
      "estimated_arrival": "2023-06-25T20:00:00Z",
      "actual_departure": "2023-06-25T16:05:00Z",
      "actual_arrival": "2023-06-25T20:10:00Z",
      "aircraft_type": "Boeing 787",
      "aircraft_capacity": 95000,
      "status": "OnTime",
      "price_per_kg": 33,
      "departure_origin": "Singapore",
      "arrival_place": "Los Angeles"
    },
    {
      "flight_number": "CX131",
      "brand": "Cathay",
      "month": "July",
      "estimated_departure": "2023-07-14T11:00:00Z",
      "estimated_arrival": "2023-07-14T15:00:00Z",
      "actual_departure": "2023-07-14T11:05:00Z",
      "actual_arrival": "2023-07-14T15:05:00Z",
      "aircraft_type": "Airbus A330",
      "aircraft_capacity": 80000,
      "status": "OnTime",
      "price_per_kg": 30,
      "departure_origin": "Hong Kong",
      "arrival_place": "Toronto"
    },
    {
      "flight_number": "CX132",
      "brand": "Cathay",
      "month": "August",
      "estimated_departure": "2023-08-10T09:00:00Z",
      "estimated_arrival": "2023-08-10T13:00:00Z",
      "actual_departure": "2023-08-10T09:10:00Z",
      "actual_arrival": "2023-08-10T13:15:00Z",
      "aircraft_type": "Boeing 777",
      "aircraft_capacity": 90000,
      "status": "Delayed",
      "price_per_kg": 32,
      "departure_origin": "Hong Kong",
      "arrival_place": "New York"
    },
    {
      "flight_number": "EK798",
      "brand": "Emirates",
      "month": "September",
      "estimated_departure": "2023-09-15T14:00:00Z",
      "estimated_arrival": "2023-09-15T18:00:00Z",
      "actual_departure": "2023-09-15T14:15:00Z",
      "actual_arrival": "2023-09-15T18:20:00Z",
      "aircraft_type": "Airbus A380",
      "aircraft_capacity": 120000,
      "status": "OnTime",
      "price_per_kg": 37,
      "departure_origin": "Dubai",
      "arrival_place": "Los Angeles"
    },
    {
      "flight_number": "EK799",
      "brand": "Emirates",
      "month": "October",
      "estimated_departure": "2023-10-25T10:00:00Z",
      "estimated_arrival": "2023-10-25T14:00:00Z",
      "actual_departure": "2023-10-25T10:05:00Z",
      "actual_arrival": "2023-10-25T14:05:00Z",
      "aircraft_type": "Boeing 777",
      "aircraft_capacity": 100000,
      "status": "Delayed",
      "price_per_kg": 35,
      "departure_origin": "Dubai",
      "arrival_place": "Chicago"
    },
    {
      "flight_number": "CX133",
      "brand": "Cathay",
      "month": "November",
      "estimated_departure": "2023-11-11T12:00:00Z",
      "estimated_arrival": "2023-11-11T16:00:00Z",
      "actual_departure": "2023-11-11T12:05:00Z",
      "actual_arrival": "2023-11-11T16:10:00Z",
      "aircraft_type": "Airbus A350",
      "aircraft_capacity": 85000,
      "status": "Delayed",
      "price_per_kg": 29,
      "departure_origin": "Hong Kong",
      "arrival_place": "San Francisco"
    },
    {
      "flight_number": "SQ466",
      "brand": "Singapore Airlines",
      "month": "December",
      "estimated_departure": "2023-12-05T16:00:00Z",
      "estimated_arrival": "2023-12-05T20:00:00Z",
      "actual_departure": "2023-12-05T16:10:00Z",
      "actual_arrival": "2023-12-05T20:15:00Z",
      "aircraft_type": "Boeing 787",
      "aircraft_capacity": 90000,
      "status": "Delayed",
      "price_per_kg": 33,
      "departure_origin": "Singapore",
      "arrival_place": "Los Angeles"
    }
  ]
  
  interface Analytics {
    totalFlights: number
    competitors: number
    countries: number
    routes: Record<string, number>
    priceByAirline: Record<string, number[]>
    status: Record<string, number>
    aircraftTypes: Record<string, number>
  }
  
  const processedData = flights.map(flight => {
    const estimatedDeparture = new Date(flight.estimated_departure)
    const actualDeparture = new Date(flight.actual_departure)
    const delayInMinutes = Math.max(0, (actualDeparture.getTime() - estimatedDeparture.getTime()) / 60000)
    return {
      ...flight,
      delayInMinutes,
      isDelayed: delayInMinutes > 10
    }
  })

export default function KeyMetric(){

  // Analytics for Data Presentation
  const analytics: Analytics = useMemo(() => {
    const totalFlights = flights.length
    const competitors = new Set(flights.map(f => f.brand)).size
    const countries = new Set([...flights.map(f => f.departure_origin), ...flights.map(f => f.arrival_place)]).size

    const routes: Record<string, number> = {}
    const priceByAirline: Record<string, number[]> = {}
    const status: Record<string, number> = {}
    const aircraftTypes: Record<string, number> = {}

    flights.forEach((flight) => {
      const route = `${flight.departure_origin} - ${flight.arrival_place}`
      routes[route] = (routes[route] || 0) + 1

      if (!priceByAirline[flight.brand]) {
        priceByAirline[flight.brand] = []
      }
      priceByAirline[flight.brand].push(flight.price_per_kg)

      status[flight.status] = (status[flight.status] || 0) + 1

      aircraftTypes[flight.aircraft_type] = (aircraftTypes[flight.aircraft_type] || 0) + 1
    })

    return { totalFlights, competitors, countries, routes, priceByAirline, status, aircraftTypes }
  }, [])

  
  // Route Analysis Data Presentation
  const routeData = Object.entries(analytics.routes)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([route, count]) => ({ route, count }))

  // Pricing Trends
  const priceData = Object.entries(analytics.priceByAirline).map(([airline, prices]) => ({
    airline,
    price: prices.reduce((sum, price) => sum + price, 0) / prices.length
  }))

  // Punctuality Analysis
  const statusData = [
    { name: 'On Time', value: analytics.status['OnTime'] || 0 },
    { name: 'Delayed', value: analytics.status['Delayed'] || 0 }
  ]

  // Aircraft Type Analysis
  const aircraftData = Object.entries(analytics.aircraftTypes).map(([type, count]) => ({
    name: type,
    value: count
  }))

  const processedData = flights.map(flight => {
    const estimatedDeparture = new Date(flight.estimated_departure)
    const actualDeparture = new Date(flight.actual_departure)
    const delayInMinutes = Math.max(0, (actualDeparture.getTime() - estimatedDeparture.getTime()) / 60000)
    return {
      ...flight,
      delayInMinutes,
      isDelayed: delayInMinutes > 10
    }
  })
  
  // Simulate varying numbers of delayed flights
  const simulateDelays = (baseDelays) => {
    const months = Object.keys(baseDelays)
    return months.reduce((acc, month) => {
      const randomMultiplier = Math.floor(Math.random() * 5) + 1 // Random number between 1 and 5
      acc[month] = baseDelays[month] * randomMultiplier
      return acc
    }, {})
  }
  
  const monthlyDelays = processedData.reduce((acc, flight) => {
    if (!acc[flight.month]) {
      acc[flight.month] = 0
    }
    if (flight.isDelayed) {
      acc[flight.month]++
    }
    return acc
  }, {})
  
  const simulatedDelays = simulateDelays(monthlyDelays)
  
  const chartData = Object.entries(simulatedDelays).map(([month, delayedFlights]) => ({
    month,
    delayedFlights
  }))

  // Color
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

    return(
        <>
        <h1 className="text-2xl font-bold p-6">Flight Analytics Dashboard</h1>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Flights Analyzed</CardTitle>
        <Plane className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
        <div className="text-2xl font-bold">{analytics.totalFlights}</div>
        <p className="text-xs text-muted-foreground">flights</p>
        </CardContent>
    </Card>
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Competitors</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
        <div className="text-2xl font-bold">{analytics.competitors}</div>
        <p className="text-xs text-muted-foreground">competitors</p>
        </CardContent>
    </Card>
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Country Coverage</CardTitle>
        <Home className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
        <div className="text-2xl font-bold">{analytics.countries}</div>
        <p className="text-xs text-muted-foreground">countries</p>
        </CardContent>
    </Card>
    </div>

    <div className="grid gap-4 md:grid-cols-3 mt-4">
    <Card>
        <CardHeader>
        <CardTitle>Route Analysis</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={routeData} >
                <XAxis dataKey="route" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={8}>
        </Bar>
            </BarChart>
            </ResponsiveContainer>
        </div>
        </CardContent>
    </Card>

    <Card>
    <CardHeader>
    <CardTitle>Pricing Trends</CardTitle>
    </CardHeader>
    <CardContent>
    <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
            data={priceData}
            layout="vertical"
            margin={{
            left: 40, // Increased left margin to accommodate airline names
            right: 20,
            top: 30,
            bottom: 10,
            }}
        >
            <XAxis type="number" />
            <YAxis
            dataKey="airline"
            type="category"
            scale="band"
            tickLine={false}
            axisLine={false}
            width={100} // Set a fixed width for the Y-axis
            />
            <Tooltip />
            <Bar 
            dataKey="price" 
            fill={COLORS[4]}
            radius={[4, 4, 4, 4]} 
            />
        </BarChart>
        </ResponsiveContainer>
    </div>
    </CardContent>
    </Card>
    
    <CarouselMetric/>
    </div>

    <div className="grid gap-4 md:grid-cols-2 mt-4">
    <Card>
        <CardHeader>
        <CardTitle>Punctuality Analysis</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="flex items-center justify-center h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                >
                {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip />
            </PieChart>
            </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
            <div>
            <p className="text-sm font-medium">On-Time Performance</p>
            <p className="text-2xl font-bold">
                {analytics.totalFlights > 0
                ? ((analytics.status['OnTime'] || 0) / analytics.totalFlights * 100).toFixed(1)
                : '0.0'}%
            </p>
            </div>
            <div>
            <p className="text-sm font-medium">Delayed Flights</p>
            <p className="text-2xl font-bold">
                {analytics.totalFlights > 0
                ? ((analytics.status['Delayed'] || 0) / analytics.totalFlights * 100).toFixed(1)
                : '0.0'}%
            </p>
            </div>
        </div>
        </CardContent>
    </Card>

    <Card>
        <CardHeader>
        <CardTitle>Aircraft Type Analysis</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="flex items-center justify-center h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                data={aircraftData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                >
                {aircraftData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
                <Tooltip />
            </PieChart>
            </ResponsiveContainer>
        </div>
        <div className="mt-4">
            <p className="text-sm font-medium text-center">Aircraft Distribution</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
            {aircraftData.map((item, index) => (
                <div key={item.name} className="flex items-center">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                <span className="text-sm">
                    {item.name}: {analytics.totalFlights > 0 ? ((analytics.aircraftTypes[item.name] / analytics.totalFlights) * 100).toFixed(1) : '0.0'}%
                </span>
                </div>
            ))}
            </div>
        </div>
        </CardContent>
    </Card>
    </div>

    <div className="grid gap-4 mt-4">
    <Card>
    <CardHeader>
        <CardTitle>Flight Delay Trends</CardTitle>
        <CardDescription>Number of delayed flights per month</CardDescription>
    </CardHeader>
    <CardContent className="pt-6">
        <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
            <defs>
            <linearGradient id="colorfulGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8884d8" />
                <stop offset="50%" stopColor="#82ca9d" />
                <stop offset="100%" stopColor="#ffc658" />
            </linearGradient>
            </defs>
            <XAxis
            dataKey="month"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            />
            <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Bar
            dataKey="delayedFlights"
            fill="url(#colorfulGradient)"
            radius={[4, 4, 0, 0]}
            />
        </BarChart>
        </ResponsiveContainer>
    </CardContent>
    </Card>           
    </div>

        </>
    )
}