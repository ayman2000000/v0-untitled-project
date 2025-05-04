"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search, Edit, LogOut, Shield, Lock, Trash2, ImageIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

// Sample room data
const initialRooms = [
  {
    id: 1,
    name: "غرفة الترحيب",
    image: "/images/room1.jpg",
    users: 42,
    description: "غرفة للترحيب بالأعضاء الجدد",
    isPrivate: false,
    maxUsers: 100,
    theme: "default",
    welcomeMessage: "مرحباً بكم في غرفة الترحيب!",
    allowImages: true,
    allowVoice: true,
    allowVideo: true,
  },
  {
    id: 2,
    name: "شات عام",
    image: "/images/room2.jpg",
    users: 28,
    description: "غرفة للمحادثات العامة",
    isPrivate: false,
    maxUsers: 150,
    theme: "blue",
    welcomeMessage: "مرحباً بكم في الشات العام!",
    allowImages: true,
    allowVoice: true,
    allowVideo: false,
  },
  {
    id: 3,
    name: "غرفة الشباب",
    image: "/images/room3.jpg",
    users: 15,
    description: "غرفة خاصة للشباب",
    isPrivate: false,
    maxUsers: 50,
    theme: "green",
    welcomeMessage: "مرحباً بكم في غرفة الشباب!",
    allowImages: true,
    allowVoice: true,
    allowVideo: true,
  },
  {
    id: 4,
    name: "غرفة البنات",
    image: "/images/room4.jpg",
    users: 23,
    description: "غرفة خاصة للبنات",
    isPrivate: false,
    maxUsers: 50,
    theme: "pink",
    welcomeMessage: "مرحباً بكم في غرفة البنات!",
    allowImages: true,
    allowVoice: true,
    allowVideo: true,
  },
  {
    id: 5,
    name: "غرفة الألعاب",
    image: "/images/room5.jpg",
    users: 10,
    description: "غرفة لمناقشة الألعاب",
    isPrivate: false,
    maxUsers: 30,
    theme: "dark",
    welcomeMessage: "مرحباً بكم في غرفة الألعاب!",
    allowImages: true,
    allowVoice: true,
    allowVideo: false,
  },
  {
    id: 6,
    name: "غرفة الأفلام",
    image: "/images/room6.jpg",
    users: 8,
    description: "غرفة لمناقشة الأفلام والمسلسلات",
    isPrivate: false,
    maxUsers: 30,
    theme: "purple",
    welcomeMessage: "مرحباً بكم في غرفة الأفلام!",
    allowImages: true,
    allowVoice: false,
    allowVideo: false,
  },
]

// Available themes
const roomThemes = [
  { id: "default", name: "افتراضي", color: "bg-gray-100" },
  { id: "blue", name: "أزرق", color: "bg-blue-100" },
  { id: "green", name: "أخضر", color: "bg-green-100" },
  { id: "red", name: "أحمر", color: "bg-red-100" },
  { id: "purple", name: "بنفسجي", color: "bg-purple-100" },
  { id: "pink", name: "وردي", color: "bg-pink-100" },
  { id: "yellow", name: "أصفر", color: "bg-yellow-100" },
  { id: "dark", name: "داكن", color: "bg-gray-800 text-white" },
]

export default function Rooms() {
  const [rooms, setRooms] = useState(initialRooms)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAdmin, setIsAdmin] = useState(true) // For demo purposes, set to true
  const [newRoom, setNewRoom] = useState({
    name: "",
    image: "",
    description: "",
    isPrivate: false,
    maxUsers: 50,
    theme: "default",
    welcomeMessage: "",
    allowImages: true,
    allowVoice: true,
    allowVideo: true,
  })
  const [editingRoom, setEditingRoom] = useState<null | any>(null)
  const [activeTab, setActiveTab] = useState("basic")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [roomToDelete, setRoomToDelete] = useState<number | null>(null)

  const filteredRooms = rooms.filter((room) => room.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleAddRoom = () => {
    if (newRoom.name.trim()) {
      const createdRoom = {
        id: rooms.length + 1,
        name: newRoom.name,
        image: newRoom.image || "/images/default-room.jpg",
        users: 0,
        description: newRoom.description,
        isPrivate: newRoom.isPrivate,
        maxUsers: newRoom.maxUsers,
        theme: newRoom.theme,
        welcomeMessage: newRoom.welcomeMessage,
        allowImages: newRoom.allowImages,
        allowVoice: newRoom.allowVoice,
        allowVideo: newRoom.allowVideo,
      }
      setRooms([...rooms, createdRoom])
      setNewRoom({
        name: "",
        image: "",
        description: "",
        isPrivate: false,
        maxUsers: 50,
        theme: "default",
        welcomeMessage: "",
        allowImages: true,
        allowVoice: true,
        allowVideo: true,
      })
      toast({
        title: "تم إنشاء الغرفة",
        description: `تم إنشاء غرفة "${createdRoom.name}" بنجاح`,
      })
    }
  }

  const handleEditRoom = () => {
    if (editingRoom && editingRoom.name.trim()) {
      setRooms(rooms.map((room) => (room.id === editingRoom.id ? { ...editingRoom } : room)))
      setEditingRoom(null)
      toast({
        title: "تم تحديث الغرفة",
        description: `تم تحديث غرفة "${editingRoom.name}" بنجاح`,
      })
    }
  }

  const handleDeleteRoom = (id: number) => {
    setRooms(rooms.filter((room) => room.id !== id))
    setRoomToDelete(null)
    setShowDeleteConfirm(false)
    toast({
      title: "تم حذف الغرفة",
      description: "تم حذف الغرفة بنجاح",
      variant: "destructive",
    })
  }

  const confirmDelete = (id: number) => {
    setRoomToDelete(id)
    setShowDeleteConfirm(true)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/">
            <Image src="/images/logo.png" alt="3rby Chat Logo" width={120} height={60} />
          </Link>
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Badge variant="outline" className="mr-2 bg-red-50 text-red-500 border-red-200">
                <Shield className="h-3 w-3 mr-1" />
                مشرف
              </Badge>
            )}
            <span className="text-sm text-gray-600">مرحباً، {isAdmin ? "المشرف" : "زائر"}</span>
            <Button variant="ghost" size="sm" className="text-red-500">
              <LogOut className="h-4 w-4 mr-2" />
              خروج
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">غرف الدردشة</h1>

          {isAdmin && (
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  إنشاء غرفة جديدة
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>إنشاء غرفة جديدة</DialogTitle>
                </DialogHeader>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">معلومات أساسية</TabsTrigger>
                    <TabsTrigger value="appearance">المظهر والتصميم</TabsTrigger>
                    <TabsTrigger value="permissions">الإعدادات والصلاحيات</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4 py-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="roomName">اسم الغرفة</Label>
                        <Input
                          id="roomName"
                          value={newRoom.name}
                          onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
                          placeholder="أدخل اسم الغرفة"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="roomImage">صورة الغرفة (رابط)</Label>
                        <Input
                          id="roomImage"
                          value={newRoom.image}
                          onChange={(e) => setNewRoom({ ...newRoom, image: e.target.value })}
                          placeholder="أدخل رابط الصورة"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="roomDescription">وصف الغرفة</Label>
                      <Textarea
                        id="roomDescription"
                        value={newRoom.description}
                        onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                        placeholder="أدخل وصفاً للغرفة"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="welcomeMessage">رسالة الترحيب</Label>
                      <Textarea
                        id="welcomeMessage"
                        value={newRoom.welcomeMessage}
                        onChange={(e) => setNewRoom({ ...newRoom, welcomeMessage: e.target.value })}
                        placeholder="رسالة ترحيب تظهر للمستخدمين عند دخول الغرفة"
                        rows={2}
                      />
                    </div>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Switch
                        id="isPrivate"
                        checked={newRoom.isPrivate}
                        onCheckedChange={(checked) => setNewRoom({ ...newRoom, isPrivate: checked })}
                      />
                      <Label htmlFor="isPrivate" className="flex items-center">
                        <Lock className="h-4 w-4 mr-2" />
                        غرفة خاصة
                      </Label>
                    </div>
                  </TabsContent>

                  <TabsContent value="appearance" className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>سمة الغرفة</Label>
                      <RadioGroup
                        value={newRoom.theme}
                        onValueChange={(value) => setNewRoom({ ...newRoom, theme: value })}
                        className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2"
                      >
                        {roomThemes.map((theme) => (
                          <div key={theme.id} className="flex items-center space-x-2 space-x-reverse">
                            <RadioGroupItem value={theme.id} id={`theme-${theme.id}`} />
                            <Label htmlFor={`theme-${theme.id}`} className="flex items-center">
                              <div className={`w-4 h-4 rounded-full mr-2 ${theme.color}`}></div>
                              {theme.name}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxUsers">الحد الأقصى للمستخدمين</Label>
                      <Select
                        value={newRoom.maxUsers.toString()}
                        onValueChange={(value) => setNewRoom({ ...newRoom, maxUsers: Number.parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الحد الأقصى" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="20">20 مستخدم</SelectItem>
                          <SelectItem value="50">50 مستخدم</SelectItem>
                          <SelectItem value="100">100 مستخدم</SelectItem>
                          <SelectItem value="150">150 مستخدم</SelectItem>
                          <SelectItem value="200">200 مستخدم</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>معاينة</Label>
                      <div className={`p-4 rounded-lg border ${roomThemes.find((t) => t.id === newRoom.theme)?.color}`}>
                        <h3 className="font-bold text-lg">{newRoom.name || "اسم الغرفة"}</h3>
                        <p className="text-sm">{newRoom.description || "وصف الغرفة"}</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="permissions" className="space-y-4 py-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="allowImages" className="flex items-center">
                          <ImageIcon className="h-4 w-4 mr-2" />
                          السماح بمشاركة الصور
                        </Label>
                        <Switch
                          id="allowImages"
                          checked={newRoom.allowImages}
                          onCheckedChange={(checked) => setNewRoom({ ...newRoom, allowImages: checked })}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <Label htmlFor="allowVoice" className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-mic mr-2"
                          >
                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                            <line x1="12" x2="12" y1="19" y2="22" />
                          </svg>
                          السماح بالمكالمات الصوتية
                        </Label>
                        <Switch
                          id="allowVoice"
                          checked={newRoom.allowVoice}
                          onCheckedChange={(checked) => setNewRoom({ ...newRoom, allowVoice: checked })}
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <Label htmlFor="allowVideo" className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-video mr-2"
                          >
                            <path d="m22 8-6 4 6 4V8Z" />
                            <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                          </svg>
                          السماح بمكالمات الفيديو
                        </Label>
                        <Switch
                          id="allowVideo"
                          checked={newRoom.allowVideo}
                          onCheckedChange={(checked) => setNewRoom({ ...newRoom, allowVideo: checked })}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
                <div className="flex justify-end space-x-2 space-x-reverse pt-4">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setActiveTab(
                        activeTab === "basic" ? "basic" : activeTab === "appearance" ? "basic" : "appearance",
                      )
                    }
                  >
                    السابق
                  </Button>
                  {activeTab !== "permissions" ? (
                    <Button onClick={() => setActiveTab(activeTab === "basic" ? "appearance" : "permissions")}>
                      التالي
                    </Button>
                  ) : (
                    <Button onClick={handleAddRoom}>إنشاء الغرفة</Button>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            className="pl-10 pr-4"
            placeholder="ابحث عن غرفة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredRooms.map((room) => (
            <Card key={room.id} className={`overflow-hidden ${roomThemes.find((t) => t.id === room.theme)?.color}`}>
              <div className="relative h-40">
                <Image src={room.image || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
                <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-full text-xs">
                  {room.users} متواجد
                </div>
                {isAdmin && (
                  <div className="absolute top-2 left-2 flex space-x-1 space-x-reverse">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-black/60 text-white hover:bg-black/80"
                          onClick={() => setEditingRoom({ ...room })}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl">
                        <DialogHeader>
                          <DialogTitle>تعديل الغرفة</DialogTitle>
                        </DialogHeader>
                        {editingRoom && (
                          <Tabs defaultValue="basic">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="basic">معلومات أساسية</TabsTrigger>
                              <TabsTrigger value="appearance">المظهر والتصميم</TabsTrigger>
                              <TabsTrigger value="permissions">الإعدادات والصلاحيات</TabsTrigger>
                            </TabsList>

                            <TabsContent value="basic" className="space-y-4 py-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="editRoomName">اسم الغرفة</Label>
                                  <Input
                                    id="editRoomName"
                                    value={editingRoom.name}
                                    onChange={(e) => setEditingRoom({ ...editingRoom, name: e.target.value })}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="editRoomImage">صورة الغرفة (رابط)</Label>
                                  <Input
                                    id="editRoomImage"
                                    value={editingRoom.image}
                                    onChange={(e) => setEditingRoom({ ...editingRoom, image: e.target.value })}
                                  />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="editRoomDescription">وصف الغرفة</Label>
                                <Textarea
                                  id="editRoomDescription"
                                  value={editingRoom.description}
                                  onChange={(e) => setEditingRoom({ ...editingRoom, description: e.target.value })}
                                  rows={3}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="editWelcomeMessage">رسالة الترحيب</Label>
                                <Textarea
                                  id="editWelcomeMessage"
                                  value={editingRoom.welcomeMessage}
                                  onChange={(e) => setEditingRoom({ ...editingRoom, welcomeMessage: e.target.value })}
                                  rows={2}
                                />
                              </div>
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <Switch
                                  id="editIsPrivate"
                                  checked={editingRoom.isPrivate}
                                  onCheckedChange={(checked) => setEditingRoom({ ...editingRoom, isPrivate: checked })}
                                />
                                <Label htmlFor="editIsPrivate" className="flex items-center">
                                  <Lock className="h-4 w-4 mr-2" />
                                  غرفة خاصة
                                </Label>
                              </div>
                            </TabsContent>

                            <TabsContent value="appearance" className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>سمة الغرفة</Label>
                                <RadioGroup
                                  value={editingRoom.theme}
                                  onValueChange={(value) => setEditingRoom({ ...editingRoom, theme: value })}
                                  className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2"
                                >
                                  {roomThemes.map((theme) => (
                                    <div key={theme.id} className="flex items-center space-x-2 space-x-reverse">
                                      <RadioGroupItem value={theme.id} id={`edit-theme-${theme.id}`} />
                                      <Label htmlFor={`edit-theme-${theme.id}`} className="flex items-center">
                                        <div className={`w-4 h-4 rounded-full mr-2 ${theme.color}`}></div>
                                        {theme.name}
                                      </Label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="editMaxUsers">الحد الأقصى للمستخدمين</Label>
                                <Select
                                  value={editingRoom.maxUsers.toString()}
                                  onValueChange={(value) =>
                                    setEditingRoom({ ...editingRoom, maxUsers: Number.parseInt(value) })
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="اختر الحد الأقصى" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="20">20 مستخدم</SelectItem>
                                    <SelectItem value="50">50 مستخدم</SelectItem>
                                    <SelectItem value="100">100 مستخدم</SelectItem>
                                    <SelectItem value="150">150 مستخدم</SelectItem>
                                    <SelectItem value="200">200 مستخدم</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="space-y-2">
                                <Label>معاينة</Label>
                                <div
                                  className={`p-4 rounded-lg border ${roomThemes.find((t) => t.id === editingRoom.theme)?.color}`}
                                >
                                  <h3 className="font-bold text-lg">{editingRoom.name}</h3>
                                  <p className="text-sm">{editingRoom.description}</p>
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="permissions" className="space-y-4 py-4">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <Label htmlFor="editAllowImages" className="flex items-center">
                                    <ImageIcon className="h-4 w-4 mr-2" />
                                    السماح بمشاركة الصور
                                  </Label>
                                  <Switch
                                    id="editAllowImages"
                                    checked={editingRoom.allowImages}
                                    onCheckedChange={(checked) =>
                                      setEditingRoom({ ...editingRoom, allowImages: checked })
                                    }
                                  />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                  <Label htmlFor="editAllowVoice" className="flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="lucide lucide-mic mr-2"
                                    >
                                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                      <line x1="12" x2="12" y1="19" y2="22" />
                                    </svg>
                                    السماح بالمكالمات الصوتية
                                  </Label>
                                  <Switch
                                    id="editAllowVoice"
                                    checked={editingRoom.allowVoice}
                                    onCheckedChange={(checked) =>
                                      setEditingRoom({ ...editingRoom, allowVoice: checked })
                                    }
                                  />
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between">
                                  <Label htmlFor="editAllowVideo" className="flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="lucide lucide-video mr-2"
                                    >
                                      <path d="m22 8-6 4 6 4V8Z" />
                                      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                                    </svg>
                                    السماح بمكالمات الفيديو
                                  </Label>
                                  <Switch
                                    id="editAllowVideo"
                                    checked={editingRoom.allowVideo}
                                    onCheckedChange={(checked) =>
                                      setEditingRoom({ ...editingRoom, allowVideo: checked })
                                    }
                                  />
                                </div>
                              </div>
                            </TabsContent>
                          </Tabs>
                        )}
                        <div className="flex justify-end space-x-2 space-x-reverse pt-4">
                          <Button variant="outline" onClick={() => setEditingRoom(null)}>
                            إلغاء
                          </Button>
                          <Button onClick={handleEditRoom}>حفظ التغييرات</Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-black/60 text-red-400 hover:bg-black/80 hover:text-red-500"
                      onClick={() => confirmDelete(room.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">{room.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{room.description}</p>
                <div className="flex flex-wrap gap-1">
                  {room.isPrivate && (
                    <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
                      <Lock className="h-3 w-3 mr-1" />
                      خاصة
                    </Badge>
                  )}
                  {room.allowImages && (
                    <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                      <ImageIcon className="h-3 w-3 mr-1" />
                      صور
                    </Badge>
                  )}
                  {room.allowVoice && (
                    <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-mic mr-1"
                      >
                        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                        <line x1="12" x2="12" y1="19" y2="22" />
                      </svg>
                      صوت
                    </Badge>
                  )}
                  {room.allowVideo && (
                    <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-video mr-1"
                      >
                        <path d="m22 8-6 4 6 4V8Z" />
                        <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
                      </svg>
                      فيديو
                    </Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Link href={`/chat/${room.id}`} className="w-full">
                  <Button className="w-full bg-green-500 hover:bg-green-600">دخول الأعضاء</Button>
                </Link>
              </CardFooter>
              <CardFooter className="p-4 pt-0 pb-4">
                <Link href={`/chat/${room.id}?visitor=true`} className="w-full">
                  <Button variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-50">
                    دخول زوار
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-red-500">تأكيد حذف الغرفة</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p>هل أنت متأكد من رغبتك في حذف هذه الغرفة؟ هذا الإجراء لا يمكن التراجع عنه.</p>
            </div>
            <div className="flex justify-end space-x-2 space-x-reverse">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                إلغاء
              </Button>
              <Button variant="destructive" onClick={() => roomToDelete && handleDeleteRoom(roomToDelete)}>
                حذف
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
