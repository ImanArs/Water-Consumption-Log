"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import type { WaterLog } from "@/types/water-log";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { formatDate } from "@/lib/utils";

export default function Dashboard() {
  const router = useRouter();
  const [logs, setLogs] = useState<WaterLog[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [hasWarning, setHasWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [hasToday, setHasToday] = useState(false);

  useEffect(() => {
    // Check if onboarding has been completed
    const onboardingCompleted = localStorage.getItem("onboardingCompleted");
    if (onboardingCompleted === "true") {
      setShowOnboarding(false);
    } else {
      router.push("/onboarding");
    }

    // Load logs from localStorage
    const storedLogs = localStorage.getItem("waterLogs");
    if (storedLogs) {
      const parsedLogs = JSON.parse(storedLogs) as WaterLog[];
      setLogs(parsedLogs);

      // Check if there's a log for today
      const today = new Date().toISOString().split("T")[0];
      const hasTodayLog = parsedLogs.some(
        (log) => log.date.split("T")[0] === today
      );
      setHasToday(hasTodayLog);

      // Check for deviations
      if (parsedLogs.length >= 3) {
        const recentLogs = parsedLogs.slice(-3);
        const avgConsumption =
          recentLogs.reduce(
            (sum, log) => sum + log.waterAmount / log.chickenCount,
            0
          ) / recentLogs.length;
        const latestLog = parsedLogs[parsedLogs.length - 1];
        const latestConsumption =
          latestLog.waterAmount / latestLog.chickenCount;

        // If latest consumption is 20% less than average
        if (latestConsumption < avgConsumption * 0.8) {
          setHasWarning(true);
          setWarningMessage(
            "Chickens are drinking less than usual - check water temperature and quality"
          );
        }
        // If latest consumption is 20% more than average
        else if (latestConsumption > avgConsumption * 1.2) {
          setHasWarning(true);
          setWarningMessage(
            "Chickens are drinking more than usual - check for heat stress or illness"
          );
        }
      }
    }
  }, [router]);

  const chartData = logs.slice(-14).map((log) => ({
    date: formatDate(new Date(log.date)),
    waterPerChicken: log.waterAmount / log.chickenCount,
  }));

  const handleAddLog = () => {
    router.push("/log");
  };

  return (
    <Layout>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-bold text-dark-brown fade-in">
          Dashboard
        </h1>

        {hasWarning && (
          <Alert className="bg-destructive/20 border-destructive fade-in delay-100">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>{warningMessage}</AlertDescription>
          </Alert>
        )}

        <Card className="fade-in delay-200">
          <CardHeader>
            <CardTitle>Water Consumption</CardTitle>
          </CardHeader>
          <CardContent>
            {logs.length > 0 ? (
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E8C7A1" />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "#4D2C1D" }}
                      tickMargin={10}
                      tickFormatter={(value) => value.slice(0, 5)}
                    />
                    <YAxis
                      tick={{ fill: "#4D2C1D" }}
                      tickMargin={10}
                      label={{
                        value: "Liters per chicken",
                        angle: -90,
                        position: "insideLeft",
                        fill: "#4D2C1D",
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#FCE3C9",
                        border: "1px solid #F5A962",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="waterPerChicken"
                      stroke="#FF7F11"
                      strokeWidth={2}
                      dot={{ fill: "#FF7F11", r: 4 }}
                      activeDot={{ r: 6, fill: "#FF7F11" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No data available. Add your first water consumption log.
              </div>
            )}
          </CardContent>
        </Card>

        {!hasToday && (
          <div className="flex justify-center fade-in delay-300">
            <Button
              onClick={handleAddLog}
              className="bg-bright-orange hover:bg-bright-orange/90"
            >
              Add Today's Measurement
            </Button>
          </div>
        )}

        <Card className="fade-in delay-400">
          <CardHeader>
            <CardTitle>Recent Logs</CardTitle>
          </CardHeader>
          <CardContent>
            {logs.length > 0 ? (
              <div className="space-y-2">
                {logs
                  .slice(-3)
                  .reverse()
                  .map((log, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-light-orange rounded-md"
                    >
                      <div>
                        <p className="font-medium">
                          {formatDate(new Date(log.date))}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {log.chickenCount} chickens
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-bright-orange">
                          {log.waterAmount} L
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {(log.waterAmount / log.chickenCount).toFixed(2)} L
                          per chicken
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                No logs available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
