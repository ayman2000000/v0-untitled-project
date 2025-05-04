document.addEventListener("DOMContentLoaded", () => {
  // Sample room data
  const rooms = [
    {
      id: 1,
      name: "غرفة الترحيب",
      image: "images/room1.jpg",
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
      image: "images/room2.jpg",
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
      image: "images/room3.jpg",
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
      image: "images/room4.jpg",
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
      image: "images/room5.jpg",
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
      image: "images/room6.jpg",
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

  // DOM Elements
  const roomsGrid = document.getElementById("rooms-grid")
  const searchInput = document.getElementById("search-input")
  const createRoomButton = document.getElementById("create-room-button")
  const createRoomModal = document.getElementById("create-room-modal")
  const closeModal = document.getElementById("close-modal")
  const tabButtons = document.querySelectorAll(".tab-button")
  const tabContents = document.querySelectorAll(".tab-content")
  const prevButton = document.getElementById("prev-button")
  const nextButton = document.getElementById("next-button")
  const createButton = document.getElementById("create-button")
  const deleteModal = document.getElementById("delete-modal")
  const closeDeleteModal = document.getElementById("close-delete-modal")
  const cancelDelete = document.getElementById("cancel-delete")
  const confirmDelete = document.getElementById("confirm-delete")
  const roomNameInput = document.getElementById("room-name")
  const roomImageInput = document.getElementById("room-image")
  const roomDescriptionInput = document.getElementById("room-description")
  const welcomeMessageInput = document.getElementById("welcome-message")
  const isPrivateCheckbox = document.getElementById("is-private")
  const themeRadios = document.querySelectorAll('input[name="theme"]')
  const maxUsersSelect = document.getElementById("max-users")
  const themePreview = document.getElementById("theme-preview")
  const allowImagesCheckbox = document.getElementById("allow-images")
  const allowVoiceCheckbox = document.getElementById("allow-voice")
  const allowVideoCheckbox = document.getElementById("allow-video")

  // Current tab index
  let currentTabIndex = 0
  const tabs = ["basic", "appearance", "permissions"]
  let roomToDelete = null

  // Initialize rooms
  function renderRooms(roomsToRender = rooms) {
    roomsGrid.innerHTML = ""

    roomsToRender.forEach((room) => {
      const roomElement = document.createElement("div")
      roomElement.className = `room-card ${room.theme}-theme`
      roomElement.innerHTML = `
                <div class="room-image-container">
                    <img src="${room.image}" alt="${room.name}" class="room-image">
                    <div class="room-users-count">${room.users} متواجد</div>
                    <div class="room-admin-actions">
                        <button class="room-admin-button edit-button" data-id="${room.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="room-admin-button delete-button" data-id="${room.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
                <div class="room-content">
                    <h3 class="room-name">${room.name}</h3>
                    <p class="room-description">${room.description}</p>
                    <div class="room-badges">
                        ${
                          room.isPrivate
                            ? `
                            <span class="room-badge private-badge">
                                <i class="fas fa-lock"></i>
                                خاصة
                            </span>
                        `
                            : ""
                        }
                        ${
                          room.allowImages
                            ? `
                            <span class="room-badge images-badge">
                                <i class="far fa-image"></i>
                                صور
                            </span>
                        `
                            : ""
                        }
                        ${
                          room.allowVoice
                            ? `
                            <span class="room-badge voice-badge">
                                <i class="fas fa-microphone"></i>
                                صوت
                            </span>
                        `
                            : ""
                        }
                        ${
                          room.allowVideo
                            ? `
                            <span class="room-badge video-badge">
                                <i class="fas fa-video"></i>
                                فيديو
                            </span>
                        `
                            : ""
                        }
                    </div>
                    <div class="room-actions">
                        <a href="chat-room.html?id=${room.id}" class="member-button">دخول الأعضاء</a>
                        <a href="chat-room.html?id=${room.id}&visitor=true" class="visitor-button">دخول زوار</a>
                    </div>
                </div>
            `
      roomsGrid.appendChild(roomElement)
    })

    // Add event listeners to edit and delete buttons
    document.querySelectorAll(".edit-button").forEach((button) => {
      button.addEventListener("click", function (e) {
        e.stopPropagation()
        const roomId = Number.parseInt(this.getAttribute("data-id"))
        editRoom(roomId)
      })
    })

    document.querySelectorAll(".delete-button").forEach((button) => {
      button.addEventListener("click", function (e) {
        e.stopPropagation()
        const roomId = Number.parseInt(this.getAttribute("data-id"))
        showDeleteConfirmation(roomId)
      })
    })
  }

  // Search rooms
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.trim().toLowerCase()
    if (searchTerm === "") {
      renderRooms()
    } else {
      const filteredRooms = rooms.filter(
        (room) => room.name.toLowerCase().includes(searchTerm) || room.description.toLowerCase().includes(searchTerm),
      )
      renderRooms(filteredRooms)
    }
  })

  // Create Room Modal
  createRoomButton.addEventListener("click", () => {
    resetForm()
    currentTabIndex = 0
    updateTabDisplay()
    createRoomModal.classList.add("active")
  })

  closeModal.addEventListener("click", () => {
    createRoomModal.classList.remove("active")
  })

  // Tab switching
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab")
      currentTabIndex = tabs.indexOf(tabId)
      updateTabDisplay()
    })
  })

  function updateTabDisplay() {
    // Update tab buttons
    tabButtons.forEach((btn) => btn.classList.remove("active"))
    tabButtons[currentTabIndex].classList.add("active")

    // Update tab contents
    tabContents.forEach((content) => content.classList.remove("active"))
    document.getElementById(`${tabs[currentTabIndex]}-tab`).classList.add("active")

    // Update navigation buttons
    prevButton.style.display = currentTabIndex > 0 ? "block" : "none"
    nextButton.style.display = currentTabIndex < tabs.length - 1 ? "block" : "none"
    createButton.style.display = currentTabIndex === tabs.length - 1 ? "block" : "none"
  }

  prevButton.addEventListener("click", () => {
    if (currentTabIndex > 0) {
      currentTabIndex--
      updateTabDisplay()
    }
  })

  nextButton.addEventListener("click", () => {
    if (currentTabIndex < tabs.length - 1) {
      currentTabIndex++
      updateTabDisplay()
    }
  })

  // Theme preview
  themeRadios.forEach((radio) => {
    radio.addEventListener("change", function () {
      const theme = this.value
      themePreview.className = `theme-preview ${theme}-theme`
    })
  })

  // Room name and description preview
  roomNameInput.addEventListener("input", function () {
    document.querySelector(".preview-title").textContent = this.value || "اسم الغرفة"
  })

  roomDescriptionInput.addEventListener("input", function () {
    document.querySelector(".preview-description").textContent = this.value || "وصف الغرفة"
  })

  // Create room
  createButton.addEventListener("click", () => {
    const newRoom = {
      id: rooms.length + 1,
      name: roomNameInput.value,
      image: roomImageInput.value || "images/default-room.jpg",
      users: 0,
      description: roomDescriptionInput.value,
      isPrivate: isPrivateCheckbox.checked,
      maxUsers: Number.parseInt(maxUsersSelect.value),
      theme: document.querySelector('input[name="theme"]:checked').value,
      welcomeMessage: welcomeMessageInput.value,
      allowImages: allowImagesCheckbox.checked,
      allowVoice: allowVoiceCheckbox.checked,
      allowVideo: allowVideoCheckbox.checked,
    }

    if (newRoom.name.trim() === "") {
      alert("يرجى إدخال اسم الغرفة")
      return
    }

    rooms.push(newRoom)
    renderRooms()
    createRoomModal.classList.remove("active")
    showToast("تم إنشاء الغرفة بنجاح")
  })

  // Edit room
  function editRoom(roomId) {
    const room = rooms.find((r) => r.id === roomId)
    if (!room) return

    roomNameInput.value = room.name
    roomImageInput.value = room.image
    roomDescriptionInput.value = room.description
    welcomeMessageInput.value = room.welcomeMessage
    isPrivateCheckbox.checked = room.isPrivate
    document.querySelector(`input[name="theme"][value="${room.theme}"]`).checked = true
    maxUsersSelect.value = room.maxUsers
    allowImagesCheckbox.checked = room.allowImages
    allowVoiceCheckbox.checked = room.allowVoice
    allowVideoCheckbox.checked = room.allowVideo

    // Update preview
    document.querySelector(".preview-title").textContent = room.name
    document.querySelector(".preview-description").textContent = room.description
    themePreview.className = `theme-preview ${room.theme}-theme`

    currentTabIndex = 0
    updateTabDisplay()
    createRoomModal.classList.add("active")
    createButton.textContent = "حفظ التغييرات"
    createButton.removeEventListener("click", createRoom)
    createButton.addEventListener("click", function updateRoomHandler() {
      updateRoom(roomId)
      createButton.removeEventListener("click", updateRoomHandler)
      createButton.addEventListener("click", createRoom)
    })
  }

  function updateRoom(roomId) {
    const roomIndex = rooms.findIndex((r) => r.id === roomId)
    if (roomIndex === -1) return

    rooms[roomIndex] = {
      ...rooms[roomIndex],
      name: roomNameInput.value,
      image: roomImageInput.value,
      description: roomDescriptionInput.value,
      welcomeMessage: welcomeMessageInput.value,
      isPrivate: isPrivateCheckbox.checked,
      theme: document.querySelector('input[name="theme"]:checked').value,
      maxUsers: Number.parseInt(maxUsersSelect.value),
      allowImages: allowImagesCheckbox.checked,
      allowVoice: allowVoiceCheckbox.checked,
      allowVideo: allowVideoCheckbox.checked,
    }

    renderRooms()
    createRoomModal.classList.remove("active")
    showToast("تم تحديث الغرفة بنجاح")
    createButton.textContent = "إنشاء الغرفة"
  }

  // Delete room
  function showDeleteConfirmation(roomId) {
    roomToDelete = roomId
    deleteModal.classList.add("active")
  }

  closeDeleteModal.addEventListener("click", () => {
    deleteModal.classList.remove("active")
    roomToDelete = null
  })

  cancelDelete.addEventListener("click", () => {
    deleteModal.classList.remove("active")
    roomToDelete = null
  })

  confirmDelete.addEventListener("click", () => {
    if (roomToDelete !== null) {
      const roomIndex = rooms.findIndex((r) => r.id === roomToDelete)
      if (roomIndex !== -1) {
        rooms.splice(roomIndex, 1)
        renderRooms()
        showToast("تم حذف الغرفة بنجاح")
      }
      deleteModal.classList.remove("active")
      roomToDelete = null
    }
  })

  // Reset form
  function resetForm() {
    roomNameInput.value = ""
    roomImageInput.value = ""
    roomDescriptionInput.value = ""
    welcomeMessageInput.value = ""
    isPrivateCheckbox.checked = false
    document.querySelector('input[name="theme"][value="default"]').checked = true
    maxUsersSelect.value = "50"
    allowImagesCheckbox.checked = true
    allowVoiceCheckbox.checked = true
    allowVideoCheckbox.checked = true
    document.querySelector(".preview-title").textContent = "اسم الغرفة"
    document.querySelector(".preview-description").textContent = "وصف الغرفة"
    themePreview.className = "theme-preview default-theme"
    createButton.textContent = "إنشاء الغرفة"
  }

  // Toast notification
  function showToast(message) {
    const toast = document.createElement("div")
    toast.className = "toast"
    toast.textContent = message
    document.body.appendChild(toast)

    setTimeout(() => {
      toast.classList.add("show")
    }, 100)

    setTimeout(() => {
      toast.classList.remove("show")
      setTimeout(() => {
        document.body.removeChild(toast)
      }, 300)
    }, 3000)
  }

  // Add toast styles
  const style = document.createElement("style")
  style.textContent = `
        .toast {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(100px);
            background-color: #1e40af;
            color: white;
            padding: 12px 24px;
            border-radius: 4px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1001;
            opacity: 0;
            transition: transform 0.3s, opacity 0.3s;
        }
        .toast.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    `
  document.head.appendChild(style)

  // Create room function reference
  function createRoom() {
    const newRoom = {
      id: rooms.length + 1,
      name: roomNameInput.value,
      image: roomImageInput.value || "images/default-room.jpg",
      users: 0,
      description: roomDescriptionInput.value,
      isPrivate: isPrivateCheckbox.checked,
      maxUsers: Number.parseInt(maxUsersSelect.value),
      theme: document.querySelector('input[name="theme"]:checked').value,
      welcomeMessage: welcomeMessageInput.value,
      allowImages: allowImagesCheckbox.checked,
      allowVoice: allowVoiceCheckbox.checked,
      allowVideo: allowVideoCheckbox.checked,
    }

    if (newRoom.name.trim() === "") {
      alert("يرجى إدخال اسم الغرفة")
      return
    }

    rooms.push(newRoom)
    renderRooms()
    createRoomModal.classList.remove("active")
    showToast("تم إنشاء الغرفة بنجاح")
  }

  // Initialize
  renderRooms()
  createButton.addEventListener("click", createRoom)

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === createRoomModal) {
      createRoomModal.classList.remove("active")
    }
    if (e.target === deleteModal) {
      deleteModal.classList.remove("active")
      roomToDelete = null
    }
  })
})
