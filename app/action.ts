'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Mock email sending function
async function sendEmail(to: string, subject: string, body: string) {
  console.log(`Sending email to ${to}`)
  console.log(`Subject: ${subject}`)
  console.log(`Body: ${body}`)
  // In a real application, you would integrate with an email service here
}

export async function createPriceAlert({ threshold, userEmail }: { threshold: number, userEmail: string }) {
  try {
    const alert = await prisma.priceAlert.create({
      data: {
        threshold,
        userEmail,
      },
    })
    return alert
  } catch (error) {
    console.error('Error creating price alert:', error)
    throw new Error('Failed to create price alert')
  }
}

export async function checkPriceAlerts() {
  try {
    const alerts = await prisma.priceAlert.findMany()
    const flights = await prisma.flight.findMany()

    for (const flight of flights) {
      const triggeredAlerts = alerts.filter(alert => flight.pricePerKg > alert.threshold)
      
      for (const alert of triggeredAlerts) {
        // Send email
        await sendEmail(
          alert.userEmail,
          `Price Alert for Flight ${flight.flightNumber}`,
          `The price for flight ${flight.flightNumber} (${flight.pricePerKg} per kg) has exceeded your threshold of ${alert.threshold}`
        )

        // Remove the triggered alert from the database
        await prisma.priceAlert.delete({
          where: { id: alert.id }
        })

        console.log(`Alert sent and removed for ${alert.userEmail}: Flight ${flight.flightNumber} (${flight.pricePerKg} per kg) exceeded threshold of ${alert.threshold}`)
      }
    }
  } catch (error) {
    console.error('Error checking price alerts:', error)
  }
}

export async function updateFlightPrice(flightNumber: string, newPrice: number) {
  try {
    await prisma.flight.update({
      where: { flightNumber },
      data: { pricePerKg: newPrice },
    })
    console.log(`Updated price for flight ${flightNumber} to ${newPrice}`)
    await checkPriceAlerts()
  } catch (error) {
    console.error('Error updating flight price:', error)
  }
}

export async function seedDatabase(flightData: any[]) {
  try {
    for (const flight of flightData) {
      await prisma.flight.create({
        data: {
          flightNumber: flight.flight_number,
          brand: flight.brand,
          pricePerKg: flight.price_per_kg,
        },
      })
    }
    console.log('Database seeded successfully')
  } catch (error) {
    console.error('Error seeding database:', error)
  }
}