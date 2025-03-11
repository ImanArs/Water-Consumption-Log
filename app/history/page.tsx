"use client"

import { useEffect, useState } from "react"
import Layout from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WaterLog } from "@/types/water-log"
import { formatDate } from "@/lib/utils"

export default function HistoryPage() {
  const [logs, setLogs] = useState<WaterLog[]>([])

  useEffect(() => {
    // Load logs from localStorage
    const storedLogs = localStorage.getItem("waterLogs")
    if (storedLogs) {
      const parsedLogs = JSON.parse(storedLogs) as WaterLog[]
      // Sort logs by date (newest first)
      parsedLogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      setLogs(parsedLogs)
    }
  }, [])

  return (
    <Layout>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold text-dark-brown fade-in">Care History</h1>

        <Card className="fade-in delay-100">
          <CardHeader>
            <CardTitle>All Water Consumption Records</CardTitle>
          </CardHeader>
          <CardContent>
            {logs.length > 0 ? (
              <div className="space-y-3">
                {logs.map((log, index) => (
                  <div
                    key={index}
                    className="p-4 bg-light-orange rounded-lg border border-beige"
                    style={{ animationDelay: `${100 + index * 50}ms` }}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-dark-brown">{formatDate(new Date(log.date))}</p>
                        <p className="text-sm text-muted-foreground">{log.chickenCount} chickens</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-bright-orange">{log.waterAmount} L</p>
                        <p className="text-sm text-muted-foreground">
                          {(log.waterAmount / log.chickenCount).toFixed(2)} L per chicken
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">No history records available</div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}

