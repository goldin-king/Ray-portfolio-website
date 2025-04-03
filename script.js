// Interactive Dot Background
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("dotBackground")
  const ctx = canvas.getContext("2d")

  let dots = []
  let mousePosition = { x: 0, y: 0 }
  let isDarkMode = document.body.classList.contains("dark")
  const animationSpeed = 0.08
  const dotDensity = 20 // Lower number means more dots

  // Initialize canvas and dots
  function initializeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create dots
    dots = []
    const spacing = dotDensity
    const dotSize = 1

    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height; y += spacing) {
        // Add some randomness to dot positions for a more natural look
        const randomOffsetX = Math.random() * 5 - 2.5
        const randomOffsetY = Math.random() * 5 - 2.5

        dots.push({
          x: x + randomOffsetX,
          y: y + randomOffsetY,
          baseX: x + randomOffsetX,
          baseY: y + randomOffsetY,
          size: dotSize,
          speed: animationSpeed + Math.random() * 0.04, // Slightly randomized speed
          // Add velocity for autonomous movement
          vx: Math.random() * 0.2 - 0.1,
          vy: Math.random() * 0.2 - 0.1,
          // Add color variation for dark mode
          color: isDarkMode
            ? `rgba(${50 + Math.random() * 30}, ${50 + Math.random() * 30}, ${70 + Math.random() * 30}, 0.8)`
            : `rgba(${220 + Math.random() * 30}, ${220 + Math.random() * 30}, ${220 + Math.random() * 30}, 0.8)`,
        })
      }
    }
  }

  // Handle mouse movement
  function handleMouseMove(e) {
    mousePosition = {
      x: e.clientX,
      y: e.clientY,
    }
  }

  // Handle touch movement for mobile
  function handleTouchMove(e) {
    if (e.touches.length > 0) {
      mousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      }
      // Prevent scrolling when interacting with dots
      e.preventDefault()
    }
  }

  // Animation loop
  function animate() {
    if (!ctx || !canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Update and draw dots
    dots.forEach((dot) => {
      // Calculate distance from mouse
      const dx = mousePosition.x - dot.x
      const dy = mousePosition.y - dot.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      const maxDistance = 150 // Increased interaction radius

      // Move dots away from mouse with a smooth falloff
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance
        const repelForce = 0.8 // Increased repel force

        // Calculate new position with easing
        dot.x = dot.x - dx * force * repelForce
        dot.y = dot.y - dy * force * repelForce
      } else {
        // Autonomous movement when not influenced by mouse
        dot.x += dot.vx
        dot.y += dot.vy

        // Gradually return to original position
        const homeX = dot.baseX - dot.x
        const homeY = dot.baseY - dot.y
        dot.x += homeX * dot.speed * 0.1
        dot.y += homeY * dot.speed * 0.1

        // Reverse direction if too far from base position
        const homeDist = Math.sqrt(homeX * homeX + homeY * homeY)
        if (homeDist > 50) {
          dot.vx = -dot.vx
          dot.vy = -dot.vy
        }
      }

      // Draw the dot
      ctx.beginPath()
      ctx.fillStyle = dot.color
      ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
      ctx.fill()
    })

    requestAnimationFrame(animate)
  }

  // Theme toggle functionality
  const themeToggle = document.getElementById("themeToggle")
  const moonIcon = document.getElementById("moonIcon")
  const sunIcon = document.getElementById("sunIcon")

  // Check if dark mode is saved in localStorage
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark")
    isDarkMode = true
    moonIcon.classList.add("hidden")
    sunIcon.classList.remove("hidden")
    updateDotColors()
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark")
    isDarkMode = document.body.classList.contains("dark")

    if (isDarkMode) {
      moonIcon.classList.add("hidden")
      sunIcon.classList.remove("hidden")
      localStorage.setItem("theme", "dark")
    } else {
      moonIcon.classList.remove("hidden")
      sunIcon.classList.add("hidden")
      localStorage.setItem("theme", "light")
    }

    // Update dot colors when theme changes
    updateDotColors()
  })

  function updateDotColors() {
    dots.forEach((dot) => {
      dot.color = isDarkMode
        ? `rgba(${50 + Math.random() * 30}, ${50 + Math.random() * 30}, ${70 + Math.random() * 30}, 0.8)`
        : `rgba(${220 + Math.random() * 30}, ${220 + Math.random() * 30}, ${220 + Math.random() * 30}, 0.8)`
    })
  }

  // Contact form submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
      }

      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]')
      const originalText = submitButton.textContent
      submitButton.disabled = true
      submitButton.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending...
      `

      // In a real implementation, this would send data to a server
      // For demonstration, we'll just simulate an API call
      setTimeout(() => {
        console.log("Form submission:", formData)

        // Show success message
        const formContainer = contactForm.parentElement
        const successMessage = document.createElement("div")
        successMessage.className = "form-success-message"
        successMessage.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h3>Message Sent Successfully!</h3>
          <p>Thank you for reaching out. I will get back to you soon.</p>
          <button class="btn btn-primary" id="resetFormBtn">Send Another Message</button>
        `

        formContainer.appendChild(successMessage)
        contactForm.style.display = "none"

        // Add event listener to reset form button
        document.getElementById("resetFormBtn").addEventListener("click", () => {
          contactForm.reset()
          contactForm.style.display = "block"
          successMessage.remove()
          submitButton.disabled = false
          submitButton.textContent = originalText
        })
      }, 2000)
    })
  }

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobileMenuButton")
  const mobileMenu = document.getElementById("mobileMenu")

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden")
      document.body.classList.toggle("menu-open") // Prevent scrolling when menu is open
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden")
          document.body.classList.remove("menu-open")
        }

        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear()

  // Set up event listeners and start animation
  window.addEventListener("mousemove", handleMouseMove)
  window.addEventListener("touchmove", handleTouchMove, { passive: false })
  window.addEventListener("resize", initializeCanvas)

  initializeCanvas()
  animate()
})

// Database Integration
// This is a placeholder for database functionality
// In a real implementation, you would connect to a database using server-side code
// For demonstration purposes, we'll create a simple client-side mock
const databaseMock = {
  // Mock function to store contact form submissions
  storeContactSubmission: (data) => {
    // In a real implementation, this would send data to a server
    // which would then store it in a database
    console.log("Storing in database:", data)
    return Promise.resolve({ success: true, id: Date.now() })
  },

  // Mock function to retrieve projects
  getProjects: () => {
    // In a real implementation, this would fetch data from a server
    // which would retrieve it from a database
    return Promise.resolve([
      {
        id: 1,
        title: "E-Commerce API",
        description: "RESTful API for e-commerce with authentication, payment processing, and order management",
        tags: ["Node.js", "Express", "MongoDB", "JWT"],
      },
      // Additional projects would be here
    ])
  },
}

