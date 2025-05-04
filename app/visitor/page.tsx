"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function VisitorEntry() {
  const router = useRouter()
  const [nickname, setNickname] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would process the visitor entry here
    router.push("/rooms")
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/background.jpg" alt="Background" fill className="object-cover brightness-50" />
      </div>

      <div className="z-10 w-full max-w-md px-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/">
            <Image src="/images/logo.png" alt="3rby Chat Logo" width={150} height={75} />
          </Link>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-2xl">دخول زوار</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nickname">اسم المستعار</Label>
                <Input
                  id="nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="أدخل اسمك المستعار"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-red-500 hover:bg-red-600">
                دخول كزائر
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              تريد مميزات أكثر؟{" "}
              <Link href="/register" className="text-red-600 hover:underline">
                سجل الآن
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
