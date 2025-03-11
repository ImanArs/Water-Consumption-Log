"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { WaterLog } from "@/types/water-log"
import { Droplet } from "lucide-react"

export default function WaterLogPage() {
  const router = useRouter()
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [chickenCount, setChickenCount] = useState("")
  const [waterAmount, setWaterAmount] = useState("")
  const [showAnimation, setShowAnimation] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!date || !chickenCount || !waterAmount) {
      return
    }

    const newLog: WaterLog = {
      date: new Date(date).toISOString(),
      chickenCount: Number.parseInt(chickenCount),
      waterAmount: Number.parseFloat(waterAmount),
    }

    // Get existing logs
    const existingLogsJson = localStorage.getItem("waterLogs")
    const existingLogs: WaterLog[] = existingLogsJson ? JSON.parse(existingLogsJson) : []

    // Add new log
    const updatedLogs = [...existingLogs, newLog]

    // Save to localStorage
    localStorage.setItem("waterLogs", JSON.stringify(updatedLogs))

    // Show water drop animation
    setShowAnimation(true)

    // Navigate back to dashboard after animation
    setTimeout(() => {
      router.push("/")
    }, 1500)
  }

  return (
    <Layout>
      <div className="p-4 relative">
        <h1 className="text-2xl font-bold text-dark-brown mb-4 fade-in">Water Log</h1>

        <Card className="fade-in delay-100">
          <CardHeader>
            <CardTitle>Add Water Measurement</CardTitle>
            <CardDescription>Record today's water consumption for your chickens</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-light-orange border-beige"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="chickenCount">Number of Chickens</Label>
                <Input
                  id="chickenCount"
                  type="number"
                  min="1"
                  placeholder="Enter number of chickens"
                  value={chickenCount}
                  onChange={(e) => setChickenCount(e.target.value)}
                  className="bg-light-orange border-beige"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="waterAmount">Water Amount (Liters)</Label>
                <Input
                  id="waterAmount"
                  type="number"
                  min="0.1"
                  step="0.1"
                  placeholder="Enter water amount in liters"
                  value={waterAmount}
                  onChange={(e) => setWaterAmount(e.target.value)}
                  className="bg-light-orange border-beige"
                />
              </div>

              <Button type="submit" className="w-full bg-bright-orange hover:bg-bright-orange/90">
                Save Measurement
              </Button>
            </form>
          </CardContent>
        </Card>

        {showAnimation && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <div className="relative">
              <Droplet className="water-drop text-blue-500 h-16 w-16" />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-blue-200 rounded-full opacity-70" />
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

