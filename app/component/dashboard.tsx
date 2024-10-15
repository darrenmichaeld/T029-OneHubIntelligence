"use client"

import { useState, useMemo } from 'react'
import { BarChart, LineChart, Plane, ArrowRight, ChevronDown, Home, TrendingUp, Users, Settings, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Checkbox } from "./ui/checkbox"
import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import Link from 'next/link'

// Sample data for charts and cards
const allData = {
  passengerData: [
    { month: 'Jan', passengers: 120000, year: 2023 },
    { month: 'Feb', passengers: 130000, year: 2023 },
    { month: 'Mar', passengers: 140000, year: 2023 },
    { month: 'Apr', passengers: 135000, year: 2023 },
    { month: 'May', passengers: 150000, year: 2023 },
    { month: 'Jun', passengers: 160000, year: 2023 },
    { month: 'Jan', passengers: 125000, year: 2024 },
    { month: 'Feb', passengers: 135000, year: 2024 },
    { month: 'Mar', passengers: 145000, year: 2024 },
    { month: 'Apr', passengers: 140000, year: 2024 },
    { month: 'May', passengers: 155000, year: 2024 },
    { month: 'Jun', passengers: 165000, year: 2024 },
  ],
  fuelEfficiencyData: [
    { month: 'Jan', efficiency: 3.2, year: 2023 },
    { month: 'Feb', efficiency: 3.3, year: 2023 },
    { month: 'Mar', efficiency: 3.4, year: 2023 },
    { month: 'Apr', efficiency: 3.5, year: 2023 },
    { month: 'May', efficiency: 3.6, year: 2023 },
    { month: 'Jun', efficiency: 3.7, year: 2023 },
    { month: 'Jan', efficiency: 3.3, year: 2024 },
    { month: 'Feb', efficiency: 3.4, year: 2024 },
    { month: 'Mar', efficiency: 3.5, year: 2024 },
    { month: 'Apr', efficiency: 3.6, year: 2024 },
    { month: 'May', efficiency: 3.7, year: 2024 },
    { month: 'Jun', efficiency: 3.8, year: 2024 },
  ],
  customerSatisfactionData: [
    { category: 'Check-in', score: 4.2, year: 2023 },
    { category: 'Boarding', score: 4.0, year: 2023 },
    { category: 'In-flight Service', score: 4.5, year: 2023 },
    { category: 'Comfort', score: 4.3, year: 2023 },
    { category: 'Food', score: 3.8, year: 2023 },
    { category: 'Check-in', score: 4.3, year: 2024 },
    { category: 'Boarding', score: 4.1, year: 2024 },
    { category: 'In-flight Service', score: 4.6, year: 2024 },
    { category: 'Comfort', score: 4.4, year: 2024 },
    { category: 'Food', score: 3.9, year: 2024 },
  ],
  revenueData: [
    { month: 'Jan', revenue: 50, year: 2023 },
    { month: 'Feb', revenue: 55, year: 2023 },
    { month: 'Mar', revenue: 60, year: 2023 },
    { month: 'Apr', revenue: 58, year: 2023 },
    { month: 'May', revenue: 65, year: 2023 },
    { month: 'Jun', revenue: 70, year: 2023 },
    { month: 'Jan', revenue: 52, year: 2024 },
    { month: 'Feb', revenue: 57, year: 2024 },
    { month: 'Mar', revenue: 62, year: 2024 },
    { month: 'Apr', revenue: 60, year: 2024 },
    { month: 'May', revenue: 67, year: 2024 },
    { month: 'Jun', revenue: 72, year: 2024 },
  ],
  marketShareData: [
    { competitor: 'Our Airline', share: 35, year: 2023 },
    { competitor: 'Competitor A', share: 25, year: 2023 },
    { competitor: 'Competitor B', share: 20, year: 2023 },
    { competitor: 'Competitor C', share: 15, year: 2023 },
    { competitor: 'Others', share: 5, year: 2023 },
    { competitor: 'Our Airline', share: 36, year: 2024 },
    { competitor: 'Competitor A', share: 24, year: 2024 },
    { competitor: 'Competitor B', share: 21, year: 2024 },
    { competitor: 'Competitor C', share: 14, year: 2024 },
    { competitor: 'Others', share: 5, year: 2024 },
  ],
  flightsOperatedData: [
    { flights: 95, year: 2023 },
    { flights: 101, year: 2024 },
  ],
  averageDelayData: [
    { delay: 62, year: 2023 },
    { delay: 59, year: 2024 },
  ],
  onTimePerformanceData: [
    { performance: 74, year: 2023 },
    { performance: 76, year: 2024 },
  ],
}

export default function DarkThemeDashboard() {
  const [timeRange, setTimeRange] = useState('month')
  const [activePage, setActivePage] = useState('dashboard')
  const [filterYear, setFilterYear] = useState('2024')
  const [selectedMetrics, setSelectedMetrics] = useState({
    flightsOperated: true,
    averageDelay: true,
    onTimePerformance: true,
    passengerTraffic: true,
    fuelEfficiency: true,
    customerSatisfaction: true,
    revenue: true,
    marketShare: true,
  })

  const navigation = [
    { name: 'Dashboard', icon: Home, id: 'dashboard' },
    { name: 'Insights', icon: TrendingUp, id: 'insights' },
    { name: 'Crew Management', icon: Users, id: 'crew' },
    { name: 'Settings', icon: Settings, id: 'settings' },
  ]

  const filteredData = useMemo(() => {
    const year = parseInt(filterYear)
    return {
      passengerData: allData.passengerData.filter(d => d.year === year),
      fuelEfficiencyData: allData.fuelEfficiencyData.filter(d => d.year === year),
      customerSatisfactionData: allData.customerSatisfactionData.filter(d => d.year === year),
      revenueData: allData.revenueData.filter(d => d.year === year),
      marketShareData: allData.marketShareData.filter(d => d.year === year),
      flightsOperated: allData.flightsOperatedData.find(d => d.year === year)?.flights || 0,
      averageDelay: allData.averageDelayData.find(d => d.year === year)?.delay || 0,
      onTimePerformance: allData.onTimePerformanceData.find(d => d.year === year)?.performance || 0,
    }
  }, [filterYear])

  const getChangePercentage = (currentValue: number, previousValue: number) => {
    const change = ((currentValue - previousValue) / previousValue) * 100
    return change.toFixed(1)
  }

  const toggleMetric = (metric) => {
    setSelectedMetrics(prev => ({ ...prev, [metric]: !prev[metric] }))
  }

  return (
    <div className="flex min-h-screen bg-gray-900 text-gray-100">
      {/* Navigation Sidebar */}
      <nav className="w-64 bg-gray-800 p-6 hidden md:block">
        <div className="flex items-center justify-center mb-8">
          <Plane className="h-8 w-8 text-blue-400 mr-2" />
          <span className="text-xl font-bold">AirlineDash</span>
        </div>
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.id}>
              <Link href={`/${item.id}`}>
              <Button
                variant={activePage === item.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActivePage(item.id)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-100">Airline Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="w-[120px] bg-gray-800 text-gray-100 border-gray-700">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 text-gray-100 border-gray-700">
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Metric Selection */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Select Metrics to Display</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(selectedMetrics).map(([metric, isSelected]) => (
                  <div key={metric} className="flex items-center space-x-2 text-gray-100">
                    <Checkbox
                      id={metric}
                      checked={isSelected}
                      onCheckedChange={() => toggleMetric(metric)}
                    />
                    <label
                      htmlFor={metric}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {metric.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {selectedMetrics.flightsOperated && (
              <Card className="bg-gray-800 border-gray-700 transition-all duration-300 ease-in-out hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Flights Operated</CardTitle>
                  <Plane className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-100">{filteredData.flightsOperated}</div>
                  <p className="text-sm text-green-400">
                    {getChangePercentage(
                      filteredData.flightsOperated,
                      allData.flightsOperatedData.find(d => d.year === parseInt(filterYear) - 1)?.flights || 0
                    )}% from last year
                  </p>
                  <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {selectedMetrics.averageDelay && (
              <Card className="bg-gray-800 border-gray-700 transition-all duration-300 ease-in-out hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">Average Delay</CardTitle>
                  <LineChart className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-100">{filteredData.averageDelay} min</div>
                  <p className="text-sm text-green-400">
                    {getChangePercentage(
                      filteredData.averageDelay,
                      allData.averageDelayData.find(d => d.year === parseInt(filterYear) - 1)?.delay || 0
                    )}% from  last year
                  </p>
                  <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {selectedMetrics.onTimePerformance && (
              <Card className="bg-gray-800 border-gray-700 transition-all duration-300 ease-in-out hover:scale-105">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300">On-time Performance</CardTitle>
                  <BarChart className="h-4 w-4 text-green-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-100">{filteredData.onTimePerformance}%</div>
                  <p className="text-sm text-green-400">
                    {getChangePercentage(
                      filteredData.onTimePerformance,
                      allData.onTimePerformanceData.find(d => d.year === parseInt(filterYear) - 1)?.performance || 0
                    )}% from last year
                  </p>
                  <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: '76%' }}></div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedMetrics.passengerTraffic && (
              <Card className="bg-gray-800 border-gray-700 transition-all duration-300 ease-in-out hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-gray-100">Passenger Traffic</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{
                    passengers: {
                      label: "Passengers",
                      color: "hsl(var(--chart-1))",
                    },
                  }} className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={filteredData.passengerData}>
                        <XAxis dataKey="month" stroke="#888888" />
                        <YAxis stroke="#888888" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="passengers" stroke="var(--color-passengers)" strokeWidth={2} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            )}

            {selectedMetrics.fuelEfficiency && (
              <Card className="bg-gray-800 border-gray-700 transition-all duration-300 ease-in-out hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-gray-100">Fuel Efficiency (miles per gallon)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{
                    efficiency: {
                      label: "Efficiency",
                      color: "hsl(var(--chart-2))",
                    },
                  }} className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={filteredData.fuelEfficiencyData}>
                        <XAxis dataKey="month" stroke="#888888" />
                        <YAxis stroke="#888888" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="efficiency" stroke="var(--color-efficiency)" strokeWidth={2} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            )}

            {selectedMetrics.customerSatisfaction && (
              <Card className="bg-gray-800 border-gray-700 transition-all duration-300 ease-in-out hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-gray-100">Customer Satisfaction Scores</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{
                    score: {
                      label: "Score",
                      color: "hsl(var(--chart-3))",
                    },
                  }} className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={filteredData.customerSatisfactionData}>
                        <XAxis dataKey="category" stroke="#888888" />
                        <YAxis stroke="#888888" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="score" fill="var(--color-score)" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            )}

            {selectedMetrics.revenue && (
              <Card className="bg-gray-800 border-gray-700 transition-all duration-300 ease-in-out hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-gray-100">Revenue (in millions USD)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{
                    revenue: {
                      label: "Revenue",
                      color: "hsl(var(--chart-4))",
                    },
                  }} className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={filteredData.revenueData}>
                        <XAxis dataKey="month" stroke="#888888" />
                        <YAxis stroke="#888888" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            )}

            {selectedMetrics.marketShare && (
              <Card className="bg-gray-800 border-gray-700 transition-all duration-300 ease-in-out hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-gray-100">Market Share (%)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{
                    share: {
                      label: "Market Share",
                      color: "hsl(var(--chart-5))",
                    },
                  }} className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={filteredData.marketShareData}>
                        <XAxis dataKey="competitor" stroke="#888888" />
                        <YAxis stroke="#888888" />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="share" fill="var(--color-share)" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="text-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              View Detailed Report
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}