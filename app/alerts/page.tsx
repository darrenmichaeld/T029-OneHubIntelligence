import { PrismaClient } from '@prisma/client'
import PriceAlertForm from '../component/price-alert-form'
import { checkPriceAlerts } from '../action'
import SideNav from '../component/dashComp/sideNav'

const prisma = new PrismaClient()

export default async function Home() {
  const flights = await prisma.flight.findMany()
  const alerts = await prisma.priceAlert.findMany()

  return (
    <div className="flex min-h-screen bg-gray-100">
    <SideNav/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Flight Price Alert System</h1>
      <PriceAlertForm />
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Current Flight Prices</h2>
        <ul className="list-disc pl-5">
          {flights.map((flight) => (
            <li key={flight.id} className="mb-2">
              {flight.flightNumber} - {flight.brand}: ${flight.pricePerKg.toFixed(2)} per kg
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Current Price Alerts</h2>
        <ul className="list-disc pl-5">
          {alerts.map((alert) => (
            <li key={alert.id} className="mb-2">
              Alert for {alert.userEmail}: Threshold ${alert.threshold.toFixed(2)} per kg
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <form action={checkPriceAlerts}>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Check Price Alerts
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}