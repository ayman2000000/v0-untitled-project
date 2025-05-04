import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import LanguageSelector from "@/components/language-selector"

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/images/background.jpg" alt="Background" fill className="object-cover brightness-50" priority />
      </div>

      {/* Header with Language Selector */}
      <header className="absolute top-0 w-full flex justify-between items-center p-4 z-10">
        <div></div>
        <LanguageSelector />
      </header>

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center justify-center text-center px-4 space-y-8">
        {/* Logo */}
        <div className="mb-4">
          <Image src="/images/logo.png" alt="3rby Chat Logo" width={200} height={100} className="animate-pulse" />
        </div>

        {/* Site Title */}
        <h1 className="text-3xl font-bold mb-2"> شات بسكوته </h1>

        {/* Welcome Text */}
        <p className="text-lg mb-8 max-w-md">أهلاً وسهلاً بكم في شات بسكوته .. أفضل شات عربي</p>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-4 w-full max-w-xs">
          <Link href="/login" className="w-full">
            <Button className="w-full py-6 text-lg bg-green-500 hover:bg-green-600">
              <span className="flex items-center">
                <span className="mr-2">دخول الأعضاء</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-log-in"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" x2="3" y1="12" y2="12" />
                </svg>
              </span>
            </Button>
          </Link>

          <Link href="/visitor" className="w-full">
            <Button className="w-full py-6 text-lg bg-red-500 hover:bg-red-600">
              <span className="flex items-center">
                <span className="mr-2">دخول زوار</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-users"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
            </Button>
          </Link>

          <Link href="/register" className="w-full">
            <Button variant="outline" className="w-full py-6 text-lg border-white text-white hover:bg-white/10">
              <span className="flex items-center">
                <span className="mr-2">سجل الآن</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user-plus"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" x2="19" y1="8" y2="14" />
                  <line x1="22" x2="16" y1="11" y2="11" />
                </svg>
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
