"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { HexColorPicker } from "react-colorful"
import {
  Send,
  Smile,
  Settings,
  LogOut,
  Volume2,
  VolumeX,
  Gift,
  Heart,
  Flag,
  Type,
  PaintBucket,
  ImageIcon as ImageLucide,
  Music,
  Mic,
  Video,
  UserPlus,
  MessageSquare,
  Bell,
  Info,
  Shield,
  Ban,
  Coffee,
  Zap,
  Sparkles,
  Maximize,
  Minimize,
  X,
  Menu,
  Home,
} from "lucide-react"

// Sample messages
const initialMessages = [
  { id: 1, user: "أحمد", avatar: "/images/avatar1.jpg", text: "مرحباً بالجميع!", time: "10:30", isAdmin: true },
  { id: 2, user: "سارة", avatar: "/images/avatar2.jpg", text: "أهلاً أحمد، كيف حالك؟", time: "10:31", isAdmin: false },
  { id: 3, user: "محمد", avatar: "/images/avatar3.jpg", text: "مرحباً بكم جميعاً", time: "10:32", isAdmin: false },
  {
    id: 4,
    user: "فاطمة",
    avatar: "/images/avatar4.jpg",
    text: "أنا سعيدة بالانضمام إليكم",
    time: "10:33",
    isAdmin: false,
  },
  {
    id: 5,
    user: "خالد",
    avatar: "/images/avatar5.jpg",
    text: "هل يمكننا بدء المحادثة؟",
    time: "10:35",
    isAdmin: false,
  },
]

// Sample users
const onlineUsers = [
  { id: 1, name: "أحمد", avatar: "/images/avatar1.jpg", status: "admin", gender: "male", country: "🇯🇴" },
  { id: 2, name: "سارة", avatar: "/images/avatar2.jpg", status: "online", gender: "female", country: "🇸🇦" },
  { id: 3, name: "محمد", avatar: "/images/avatar3.jpg", status: "online", gender: "male", country: "🇪🇬" },
  { id: 4, name: "فاطمة", avatar: "/images/avatar4.jpg", status: "online", gender: "female", country: "🇦🇪" },
  { id: 5, name: "خالد", avatar: "/images/avatar5.jpg", status: "online", gender: "male", country: "🇰🇼" },
  { id: 6, name: "نورا", avatar: "/images/avatar6.jpg", status: "online", gender: "female", country: "🇶🇦" },
  { id: 7, name: "عمر", avatar: "/images/avatar7.jpg", status: "online", gender: "male", country: "🇧🇭" },
]

// Room information
const roomInfo = {
  id: 1,
  name: "شات الأردن",
  description: "غرفة للدردشة العامة والتعارف",
  welcomeMessage: "مرحباً بكم في شات الأردن! نتمنى لكم وقتاً ممتعاً",
  rules: [
    "احترام جميع المستخدمين",
    "عدم استخدام ألفاظ غير لائقة",
    "عدم مشاركة معلومات شخصية",
    "الالتزام بموضوع الغرفة",
  ],
  theme: "blue",
  maxUsers: 100,
  isPrivate: false,
  allowImages: true,
  allowVoice: true,
  allowVideo: true,
}

export default function ChatRoom() {
  const params = useParams()
  const searchParams = useSearchParams()
  const isVisitor = searchParams.get("visitor") === "true"
  const roomId = params.id

  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [showSettings, setShowSettings] = useState(false)
  const [fontFamily, setFontFamily] = useState("Arial")
  const [fontSize, setFontSize] = useState(16)
  const [textColor, setTextColor] = useState("#000000")
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [activeUserTab, setActiveUserTab] = useState("all")
  const [isAdmin, setIsAdmin] = useState(true) // For demo purposes

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        user: "أنت",
        avatar: "/images/your-avatar.jpg",
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isAdmin: false,
      }
      setMessages([...messages, newMsg])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  const filteredUsers =
    activeUserTab === "all"
      ? onlineUsers
      : activeUserTab === "males"
        ? onlineUsers.filter((user) => user.gender === "male")
        : onlineUsers.filter((user) => user.gender === "female")

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link href="/rooms" className="flex items-center">
                <Home className="h-5 w-5 mr-1" />
                <span className="font-bold">الرئيسية</span>
              </Link>
              <span className="text-sm hidden md:inline">|</span>
              <h1 className="text-lg font-bold hidden md:block">{roomInfo.name}</h1>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white"
                      onClick={() => setSoundEnabled(!soundEnabled)}
                    >
                      {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{soundEnabled ? "كتم الصوت" : "تشغيل الصوت"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-white" onClick={toggleFullscreen}>
                      {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isFullscreen ? "إلغاء ملء الشاشة" : "ملء الشاشة"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white"
                      onClick={() => setShowSettings(!showSettings)}
                    >
                      <Settings className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>الإعدادات</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white md:hidden"
                      onClick={() => setShowSidebar(!showSidebar)}
                    >
                      <Menu className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>قائمة المستخدمين</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Link href="/rooms">
                <Button variant="ghost" size="sm" className="text-white">
                  <LogOut className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">خروج</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Room Info Bar */}
      <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 text-sm">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <div className="flex items-center space-x-2 space-x-reverse">
            <span className="font-semibold">{roomInfo.name}</span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">{onlineUsers.length} متواجد</span>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-100 p-1 h-auto">
              <Info className="h-4 w-4 mr-1" />
              <span className="text-xs">معلومات الغرفة</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-100 p-1 h-auto">
              <Bell className="h-4 w-4 mr-1" />
              <span className="text-xs">إشعارات</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Settings Panel */}
          {showSettings && (
            <div className="bg-white p-4 border-b">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">إعدادات المظهر</h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowSettings(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="font-medium flex items-center">
                    <Type className="h-4 w-4 mr-2" />
                    نوع الخط
                  </label>
                  <select
                    value={fontFamily}
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="font-medium flex items-center">
                    <Type className="h-4 w-4 mr-2" />
                    حجم الخط
                  </label>
                  <div className="pt-2">
                    <Slider
                      value={[fontSize]}
                      min={12}
                      max={24}
                      step={1}
                      onValueChange={(value) => setFontSize(value[0])}
                    />
                    <div className="text-center mt-1">{fontSize}px</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-medium flex items-center">
                    <PaintBucket className="h-4 w-4 mr-2" />
                    لون الخط
                  </label>
                  <Popover open={showColorPicker} onOpenChange={setShowColorPicker}>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-between" style={{ color: textColor }}>
                        {textColor}
                        <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: textColor }} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <HexColorPicker color={textColor} onChange={setTextColor} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">معاينة</h4>
                <div
                  className="p-3 border rounded-md"
                  style={{
                    fontFamily,
                    fontSize: `${fontSize}px`,
                    color: textColor,
                  }}
                >
                  هذا هو شكل النص الخاص بك في المحادثة
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 bg-white">
            {/* Welcome Message */}
            <div className="mb-6 text-center">
              <div className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-lg border border-blue-200">
                {roomInfo.welcomeMessage}
              </div>
            </div>

            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start space-x-2 space-x-reverse">
                  <Avatar>
                    <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.user} />
                    <AvatarFallback>{message.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className={`font-bold ${message.isAdmin ? "text-red-500" : ""}`}>{message.user}</span>
                      <span className="text-xs text-gray-500 mr-2">{message.time}</span>
                    </div>
                    <div
                      className="bg-gray-50 p-3 rounded-lg shadow-sm mt-1"
                      style={message.user === "أنت" ? { fontFamily, fontSize: `${fontSize}px`, color: textColor } : {}}
                    >
                      {message.text}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-gray-600">
                      <MessageSquare className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-gray-400 hover:text-gray-600">
                      <UserPlus className="h-3 w-3" />
                    </Button>
                    {isAdmin && (
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-red-400 hover:text-red-600">
                        <Ban className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="bg-white p-4 border-t">
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="flex space-x-1 space-x-reverse">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-gray-500">
                      <Smile className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid grid-cols-8 gap-2">
                      {[
                        "😀",
                        "😂",
                        "😍",
                        "😎",
                        "🥰",
                        "😊",
                        "👍",
                        "❤️",
                        "🎉",
                        "🔥",
                        "💯",
                        "🤔",
                        "😢",
                        "😡",
                        "👋",
                        "🙏",
                      ].map((emoji) => (
                        <Button
                          key={emoji}
                          variant="ghost"
                          className="h-8 w-8 p-0 text-lg"
                          onClick={() => setNewMessage((prev) => prev + emoji)}
                        >
                          {emoji}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-gray-500">
                      <ImageLucide className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium">إدراج صورة</h4>
                      <Input type="file" accept="image/*" />
                      <p className="text-xs text-gray-500">أو أدخل رابط الصورة</p>
                      <Input placeholder="https://example.com/image.jpg" />
                      <Button className="w-full">إدراج</Button>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-gray-500">
                      <Flag className="h-5 w-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid grid-cols-4 gap-2">
                      {["🇸🇦", "🇪🇬", "🇯🇴", "🇦🇪", "🇰🇼", "🇶🇦", "🇧🇭", "🇴🇲", "🇱🇧", "🇵🇸", "🇸🇾", "🇮🇶"].map((flag) => (
                        <Button
                          key={flag}
                          variant="outline"
                          className="h-10 text-lg"
                          onClick={() => setNewMessage((prev) => prev + flag)}
                        >
                          {flag}
                        </Button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Gift className="h-5 w-5" />
                </Button>

                <Button variant="ghost" size="icon" className="text-gray-500">
                  <Music className="h-5 w-5" />
                </Button>
              </div>

              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 resize-none min-h-[40px] max-h-[120px]"
                rows={1}
                style={{ fontFamily, fontSize: `${fontSize}px`, color: textColor }}
              />

              <div className="flex space-x-1 space-x-reverse">
                <Button variant="ghost" size="icon" className="text-green-500">
                  <Mic className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-blue-500">
                  <Video className="h-5 w-5" />
                </Button>
                <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex justify-center mt-2 space-x-1 space-x-reverse">
              <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-600">
                <Zap className="h-3 w-3 mr-1" />
                إرسال سريع
              </Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-600">
                <Coffee className="h-3 w-3 mr-1" />
                دعوة قهوة
              </Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-600">
                <Heart className="h-3 w-3 mr-1" />
                إعجاب
              </Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-gray-600">
                <Sparkles className="h-3 w-3 mr-1" />
                تأثيرات
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar - Users */}
        <div className={`w-64 bg-white border-r border-gray-200 ${showSidebar ? "block" : "hidden"} md:block`}>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all" onClick={() => setActiveUserTab("all")}>
                الكل ({onlineUsers.length})
              </TabsTrigger>
              <TabsTrigger value="males" onClick={() => setActiveUserTab("males")}>
                <span className="text-blue-500 mr-1">♂</span> شباب
              </TabsTrigger>
              <TabsTrigger value="females" onClick={() => setActiveUserTab("females")}>
                <span className="text-pink-500 mr-1">♀</span> بنات
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="p-0 m-0">
              <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="p-2 space-y-1">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center space-x-2 space-x-reverse p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <span
                            className={`font-medium truncate ${user.status === "admin" ? "text-red-500" : user.gender === "female" ? "text-pink-500" : "text-blue-500"}`}
                          >
                            {user.name}
                          </span>
                          <span className="mr-1 text-xs">{user.country}</span>
                        </div>
                      </div>
                      <div className="flex space-x-1 space-x-reverse">
                        {user.status === "admin" && (
                          <Badge variant="outline" className="h-5 px-1 bg-red-50 text-red-500 border-red-200">
                            <Shield className="h-3 w-3" />
                          </Badge>
                        )}
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="males" className="p-0 m-0">
              <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="p-2 space-y-1">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center space-x-2 space-x-reverse p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <span
                            className={`font-medium truncate ${user.status === "admin" ? "text-red-500" : "text-blue-500"}`}
                          >
                            {user.name}
                          </span>
                          <span className="mr-1 text-xs">{user.country}</span>
                        </div>
                      </div>
                      <div className="flex space-x-1 space-x-reverse">
                        {user.status === "admin" && (
                          <Badge variant="outline" className="h-5 px-1 bg-red-50 text-red-500 border-red-200">
                            <Shield className="h-3 w-3" />
                          </Badge>
                        )}
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="females" className="p-0 m-0">
              <ScrollArea className="h-[calc(100vh-180px)]">
                <div className="p-2 space-y-1">
                  {filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="flex items-center space-x-2 space-x-reverse p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <span
                            className={`font-medium truncate ${user.status === "admin" ? "text-red-500" : "text-pink-500"}`}
                          >
                            {user.name}
                          </span>
                          <span className="mr-1 text-xs">{user.country}</span>
                        </div>
                      </div>
                      <div className="flex space-x-1 space-x-reverse">
                        {user.status === "admin" && (
                          <Badge variant="outline" className="h-5 px-1 bg-red-50 text-red-500 border-red-200">
                            <Shield className="h-3 w-3" />
                          </Badge>
                        )}
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>

          {/* User Actions */}
          <div className="border-t border-gray-200 p-2">
            <div className="grid grid-cols-4 gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-full p-1 text-xs flex flex-col items-center justify-center"
              >
                <MessageSquare className="h-4 w-4 mb-1" />
                <span>رسالة</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-full p-1 text-xs flex flex-col items-center justify-center"
              >
                <UserPlus className="h-4 w-4 mb-1" />
                <span>إضافة</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-full p-1 text-xs flex flex-col items-center justify-center"
              >
                <Gift className="h-4 w-4 mb-1" />
                <span>هدية</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-full p-1 text-xs flex flex-col items-center justify-center"
              >
                <Bell className="h-4 w-4 mb-1" />
                <span>تنبيه</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <footer className="bg-gray-100 border-t border-gray-200 py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex space-x-4 space-x-reverse">
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              الدعم الفني
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              قوانين الموقع
            </Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">
              اتصل بنا
            </Link>
          </div>
          <div className="text-gray-500">© 2025 شات الأردن - جميع الحقوق محفوظة</div>
        </div>
      </footer>
    </div>
  )
}
