import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb"
import { useState, useEffect } from "react"

const client = new DynamoDBClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!
  }
})

const docClient = DynamoDBDocumentClient.from(client)

export interface CleanFlightData {
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

function cleanFlightData(rawData: Record<string, any>): CleanFlightData {
  return {
    flight_number: String(rawData.flight_number || ''),
    brand: String(rawData.brand || ''),
    month: String(rawData.month || ''),
    estimated_departure: String(rawData.estimated_departure || ''),
    estimated_arrival: String(rawData.estimated_arrival || ''),
    actual_departure: String(rawData.actual_departure || ''),
    actual_arrival: String(rawData.actual_arrival || ''),
    aircraft_type: String(rawData.aircraft_type || ''),
    aircraft_capacity: Number(rawData.aircraft_capacity || 0),
    status: String(rawData.status || ''),
    price_per_kg: Number(rawData.price_per_kg || 0),
    departure_origin: String(rawData.departure_origin || ''),
    arrival_place: String(rawData.arrival_place || '')
  }
}

export async function fetchFlightData(): Promise<CleanFlightData[]> {
  try {
    const command = new ScanCommand({
      TableName: "FlightData",
    })

    const response = await docClient.send(command)
    
    if (!response.Items) {
      throw new Error("No flight data found")
    }

    const cleanedData = response.Items.map(cleanFlightData)
    return cleanedData
  } catch (error) {
    console.error("Error fetching flight data:", error)
    throw error
  }
}

export function useRealTimeFlightData(updateInterval: number = 30000) {
  const [flightData, setFlightData] = useState<CleanFlightData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        const data = await fetchFlightData()
        if (isMounted) {
          setFlightData(data)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch flight data')
          setLoading(false)
        }
      }
    }

    fetchData()

    const intervalId = setInterval(fetchData, updateInterval)

    return () => {
      isMounted = false
      clearInterval(intervalId)
    }
  }, [updateInterval])

  return { flightData, loading, error }
}