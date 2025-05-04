document.addEventListener("DOMContentLoaded", () => {
  // Sample data
  const messages = [
    { id: 1, user: "أحمد", avatar: "images/avatar1.jpg", text: "مرحباً بالجميع!", time: "10:30", isAdmin: true },
    {
      id: 2,
      user: "سارة",
      avatar: "images/avatar2.jpg",
      text: "أهلاً أحمد، كيف حالك؟",
      time: "10:31",
      isAdmin: false,
      gender: "female",
    },
    { id: 3, user: "محمد", avatar: "images/avatar3.jpg", text: "مرحباً بكم جميعاً", time: "10:32", isAdmin: false },
    {
      id: 4,
      user: "فاطمة",
      avatar: "images/avatar4.jpg",
      text: "أنا سعيدة بالانضمام إليكم",
      time: "10:33",
      isAdmin: false,
      gender: "female",
    },
    {
      id: 5,
      user: "خالد",
      avatar: "images/avatar5.jpg",
      text: "هل يمكننا بدء المحادثة؟",
      time: "10:35",
      isAdmin: false,
    },
  ]

  const users = [
    { id: 1, name: "أحمد", avatar: "images/avatar1.jpg", status: "admin", gender: "male", country: "🇯🇴" },
    { id: 2, name: "سارة", avatar: "images/avatar2.jpg", status: "online", gender: "female", country: "🇸🇦" },
    { id: 3, name: "محمد", avatar: "images/avatar3.jpg", status: "online", gender: "male", country: "🇪🇬" },
    { id: 4, name: "فاطمة", avatar: "images/avatar4.jpg", status: "online", gender: "female", country: "🇦🇪" },
    { id: 5, name: "خالد", avatar: "images/avatar5.jpg", status: "online", gender: "male", country: "🇰🇼" },
    { id: 6, name: "نورا", avatar: "images/avatar6.jpg", status: "online", gender: "female", country: "🇶🇦" },
    { id: 7, name: "عمر", avatar: "images/avatar7.jpg", status: "online", gender: "male", country: "🇧🇭" },
  ]

  const emojis = ["😀", "😂", "😍", "😎", "🥰", "😊", "👍", "❤️", "🎉", "🔥", "💯", "🤔", "😢", "😡", "👋", "🙏"]
  const flags = ["🇸🇦", "🇪🇬", "🇯🇴", "🇦🇪", "🇰🇼", "🇶🇦", "🇧🇭", "🇴🇲", "🇱🇧", "🇵🇸", "🇸🇾", "🇮🇶"]

  // DOM Elements
  const messagesContainer = document.getElementById("messages-container")
  const messageInput = document.getElementById("message-input")
  const sendButton = document.getElementById("send-button")
  const soundToggle = document.getElementById("sound-toggle")
  const fullscreenToggle = document.getElementById("fullscreen-toggle")
  const settingsToggle = document.getElementById("settings-toggle")
  const settingsPanel = document.getElementById("settings-panel")
  const closeSettings = document.getElementById("close-settings")
  const sidebarToggle = document.getElementById("sidebar-toggle")
  const usersSidebar = document.getElementById("users-sidebar")
  const allUsersContainer = document.getElementById("all-users")
  const maleUsersContainer = document.getElementById("male-users")
  const femaleUsersContainer = document.getElementById("female-users")
  const tabButtons = document.querySelectorAll(".tab-button")
  const tabContents = document.querySelectorAll(".tab-content")
  const fontFamilySelect = document.getElementById("font-family")
  const fontSizeSlider = document.getElementById("font-size")
  const fontSizeValue = document.getElementById("font-size-value")
  const colorPickerButton = document.getElementById("color-picker-button")
  const colorPickerPopup = document.getElementById("color-picker-popup")
  const colorPicker = document.getElementById("color-picker")
  const colorHex = document.getElementById("color-hex")
  const colorPreview = document.getElementById("color-preview")
  const textPreview = document.getElementById("text-preview")
  const emojiButton = document.getElementById("emoji-button")
  const emojiPopup = document.getElementById("emoji-popup")
  const imageButton = document.getElementById("image-button")
  const imagePopup = document.getElementById("image-popup")
  const flagButton = document.getElementById("flag-button")
  const flagPopup = document.getElementById("flag-popup")

  // Initialize messages
  function renderMessages() {
    messagesContainer.innerHTML = `
            <div class="welcome-message">
                <div class="welcome-text">
                    مرحباً بكم في شات الأردن! نتمنى لكم وقتاً ممتعاً
                </div>
            </div>
        `

    messages.forEach((message) => {
      const messageElement = document.createElement("div")
      messageElement.className = "message"
      messageElement.innerHTML = `
                <div class="message-avatar">
                    <img src="${message.avatar}" alt="${message.user}">
                </div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-username ${message.isAdmin ? "admin-username" : message.gender === "female" ? "female-name" : ""}">${message.user}</span>
                        <span class="message-time">${message.time}</span>
                    </div>
                    <div class="message-text">${message.text}</div>
                </div>
                <div class="message-actions">
                    <button class="message-action-button">
                        <i class="fas fa-comment"></i>
                    </button>
                    <button class="message-action-button">
                        <i class="fas fa-user-plus"></i>
                    </button>
                    ${
                      message.user !== "أنت"
                        ? `
                        <button class="message-action-button ban-button">
                            <i class="fas fa-ban"></i>
                        </button>
                    `
                        : ""
                    }
                </div>
            `
      messagesContainer.appendChild(messageElement)
    })

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  }

  // Initialize users
  function renderUsers() {
    // Clear containers
    allUsersContainer.innerHTML = ""
    maleUsersContainer.innerHTML = ""
    femaleUsersContainer.innerHTML = ""

    users.forEach((user) => {
      const userElement = createUserElement(user)
      allUsersContainer.appendChild(userElement)

      if (user.gender === "male") {
        const maleUserElement = createUserElement(user)
        maleUsersContainer.appendChild(maleUserElement)
      } else if (user.gender === "female") {
        const femaleUserElement = createUserElement(user)
        femaleUsersContainer.appendChild(femaleUserElement)
      }
    })
  }

  function createUserElement(user) {
    const userElement = document.createElement("div")
    userElement.className = "user-item"
    userElement.innerHTML = `
            <div class="user-avatar">
                <img src="${user.avatar}" alt="${user.name}">
            </div>
            <div class="user-info">
                <div class="user-name-container">
                    <span class="user-name ${user.status === "admin" ? "admin-name" : user.gender === "female" ? "female-name" : "male-name"}">${user.name}</span>
                    <span class="user-country">${user.country}</span>
                </div>
            </div>
            <div class="user-status">
                ${
                  user.status === "admin"
                    ? `
                    <div class="admin-badge">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                `
                    : ""
                }
                <div class="online-indicator"></div>
            </div>
        `
    return userElement
  }

  // Initialize emojis
  function renderEmojis() {
    const emojiGrid = emojiPopup.querySelector(".emoji-grid")
    emojiGrid.innerHTML = ""

    emojis.forEach((emoji) => {
      const emojiElement = document.createElement("div")
      emojiElement.className = "emoji-item"
      emojiElement.textContent = emoji
      emojiElement.addEventListener("click", () => {
        messageInput.value += emoji
        emojiPopup.classList.remove("active")
      })
      emojiGrid.appendChild(emojiElement)
    })
  }

  // Initialize flags
  function renderFlags() {
    const flagGrid = flagPopup.querySelector(".flag-grid")
    flagGrid.innerHTML = ""

    flags.forEach((flag) => {
      const flagElement = document.createElement("div")
      flagElement.className = "flag-item"
      flagElement.textContent = flag
      flagElement.addEventListener("click", () => {
        messageInput.value += flag
        flagPopup.classList.remove("active")
      })
      flagGrid.appendChild(flagElement)
    })
  }

  // Send message
  function sendMessage() {
    const messageText = messageInput.value.trim()
    if (messageText) {
      const newMessage = {
        id: messages.length + 1,
        user: "أنت",
        avatar: "images/your-avatar.jpg",
        text: messageText,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isAdmin: false,
      }
      messages.push(newMessage)
      renderMessages()
      messageInput.value = ""
    }
  }

  // Event Listeners
  sendButton.addEventListener("click", sendMessage)

  messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  })

  soundToggle.addEventListener("click", function () {
    const icon = this.querySelector("i")
    if (icon.classList.contains("fa-volume-up")) {
      icon.classList.remove("fa-volume-up")
      icon.classList.add("fa-volume-mute")
      this.title = "تشغيل الصوت"
    } else {
      icon.classList.remove("fa-volume-mute")
      icon.classList.add("fa-volume-up")
      this.title = "كتم الصوت"
    }
  })

  fullscreenToggle.addEventListener("click", function () {
    const icon = this.querySelector("i")
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      icon.classList.remove("fa-expand")
      icon.classList.add("fa-compress")
      this.title = "إلغاء ملء الشاشة"
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        icon.classList.remove("fa-compress")
        icon.classList.add("fa-expand")
        this.title = "ملء الشاشة"
      }
    }
  })

  settingsToggle.addEventListener("click", () => {
    settingsPanel.classList.toggle("active")
  })

  closeSettings.addEventListener("click", () => {
    settingsPanel.classList.remove("active")
  })

  sidebarToggle.addEventListener("click", () => {
    usersSidebar.classList.toggle("active")
  })

  // Tab switching
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab")

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabContents.forEach((content) => content.classList.remove("active"))

      // Add active class to current button and content
      this.classList.add("active")
      document.getElementById(`${tabId}-tab`).classList.add("active")
    })
  })

  // Font settings
  fontFamilySelect.addEventListener("change", function () {
    const fontFamily = this.value
    textPreview.style.fontFamily = fontFamily
    messageInput.style.fontFamily = fontFamily
  })

  fontSizeSlider.addEventListener("input", function () {
    const fontSize = this.value
    fontSizeValue.textContent = `${fontSize}px`
    textPreview.style.fontSize = `${fontSize}px`
    messageInput.style.fontSize = `${fontSize}px`
  })

  colorPickerButton.addEventListener("click", () => {
    colorPickerPopup.classList.toggle("active")
  })

  colorPicker.addEventListener("input", function () {
    const color = this.value
    colorHex.textContent = color
    colorPreview.style.backgroundColor = color
    textPreview.style.color = color
    messageInput.style.color = color
  })

  // Close color picker when clicking outside
  document.addEventListener("click", (e) => {
    if (!colorPickerButton.contains(e.target) && !colorPickerPopup.contains(e.target)) {
      colorPickerPopup.classList.remove("active")
    }
  })

  // Emoji popup
  emojiButton.addEventListener("click", (e) => {
    e.stopPropagation()
    emojiPopup.classList.toggle("active")
    imagePopup.classList.remove("active")
    flagPopup.classList.remove("active")
  })

  // Image popup
  imageButton.addEventListener("click", (e) => {
    e.stopPropagation()
    imagePopup.classList.toggle("active")
    emojiPopup.classList.remove("active")
    flagPopup.classList.remove("active")
  })

  // Flag popup
  flagButton.addEventListener("click", (e) => {
    e.stopPropagation()
    flagPopup.classList.toggle("active")
    emojiPopup.classList.remove("active")
    imagePopup.classList.remove("active")
  })

  // Close popups when clicking outside
  document.addEventListener("click", (e) => {
    if (!emojiButton.contains(e.target) && !emojiPopup.contains(e.target)) {
      emojiPopup.classList.remove("active")
    }
    if (!imageButton.contains(e.target) && !imagePopup.contains(e.target)) {
      imagePopup.classList.remove("active")
    }
    if (!flagButton.contains(e.target) && !flagPopup.contains(e.target)) {
      flagPopup.classList.remove("active")
    }
  })

  // Initialize
  renderMessages()
  renderUsers()
  renderEmojis()
  renderFlags()
})
