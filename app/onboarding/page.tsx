"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Droplet, BarChart2, CheckCircle } from "lucide-react"

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)

  const onboardingSteps = [
    {
      title: "Track Water Consumption",
      description: "Monitoring how much water your chickens drink is essential for their health and well-being.",
      icon: <Droplet className="h-16 w-16 text-bright-orange" />,
    },
    {
      title: "Analyze Patterns",
      description: "Our app analyzes consumption patterns to detect unusual changes that might indicate health issues.",
      icon: <BarChart2 className="h-16 w-16 text-bright-orange" />,
    },
    {
      title: "Get Recommendations",
      description: "Receive personalized recommendations to maintain optimal water consumption for your chickens.",
      icon: <CheckCircle className="h-16 w-16 text-bright-orange" />,
    },
  ]

  const handleNext = () => {
    if (step < onboardingSteps.length - 1) {
      setStep(step + 1)
    } else {
      // Mark onboarding as completed
      localStorage.setItem("onboardingCompleted", "true")
      router.push("/")
    }
  }

  const handleSkip = () => {
    // Mark onboarding as completed
    localStorage.setItem("onboardingCompleted", "true")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-light-orange flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center space-y-6">
            {onboardingSteps[step].icon}

            <h1 className="text-2xl font-bold text-dark-brown">{onboardingSteps[step].title}</h1>

            <p className="text-muted-foreground">{onboardingSteps[step].description}</p>

            <div className="flex space-x-2 mt-4">
              {onboardingSteps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${index === step ? "bg-bright-orange" : "bg-beige"}`}
                />
              ))}
            </div>

            <div className="flex w-full space-x-4 mt-6">
              <Button variant="outline" className="flex-1 border-beige text-dark-brown" onClick={handleSkip}>
                Skip
              </Button>

              <Button className="flex-1 bg-bright-orange hover:bg-bright-orange/90 text-white" onClick={handleNext}>
                {step === onboardingSteps.length - 1 ? "Get Started" : "Next"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

