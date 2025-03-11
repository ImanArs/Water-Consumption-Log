"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Home, Droplet, ClipboardList, Settings } from "lucide-react"

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-light-orange">{children}</div>
  }

  const navigation = [
    {
      name: "Dashboard",
      href: "/",
      icon: Home,
      current: pathname === "/",
    },
    {
      name: "Water Log",
      href: "/log",
      icon: Droplet,
      current: pathname === "/log",
    },
    {
      name: "History",
      href: "/history",
      icon: ClipboardList,
      current: pathname === "/history",
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      current: pathname === "/settings",
    },
  ]

  const handleNavigation = (href: string) => {
    router.push(href)
  }

  return (
    <div className="min-h-screen bg-light-orange flex flex-col">
      <main className="flex-1 pb-16">{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-beige">
        <div className="relative">
          {/* Spring animation indicator */}
          <div
            className="absolute bottom-0 h-1 bg-bright-orange spring-nav-indicator"
            style={{
              width: `${100 / navigation.length}%`,
              transform: `translateX(${navigation.findIndex((item) => item.current) * 100}%)`,
            }}
          />
        </div>

        <div className="flex justify-around">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.href)}
              className={`flex flex-col items-center py-2 px-4 ${item.current ? "text-bright-orange" : "text-beige"}`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
}

