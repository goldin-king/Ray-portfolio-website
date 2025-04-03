// Common functionality for all pages
document.addEventListener("DOMContentLoaded", () => {
  // Initialize dot background
  initDotBackground()

  // Initialize theme toggle
  initThemeToggle()

  // Set current year in footer
  document.getElementById("currentYear").textContent = new Date().getFullYear()

  // Generate page content based on page type
  generatePageContent()
})

// Initialize the interactive dot background
function initDotBackground() {
  const canvas = document.getElementById("dotBackground")
  if (!canvas) return

  const ctx = canvas.getContext("2d")

  let dots = []
  let mousePosition = { x: 0, y: 0 }
  let isDarkMode = document.body.classList.contains("dark")

  // Initialize canvas and dots
  function initializeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create dots
    dots = []
    const spacing = 20
    const dotSize = 1

    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height; y += spacing) {
        dots.push({
          x: x,
          y: y,
          baseX: x,
          baseY: y,
          size: dotSize,
          speed: 0.08 + Math.random() * 0.04, // Slightly randomized speed
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

  // Animation loop
  function animate() {
    if (!ctx || !canvas) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dot color based on theme
    ctx.fillStyle = isDarkMode ? "#333333" : "#e5e5e5"

    // Update and draw dots
    dots.forEach((dot) => {
      // Calculate distance from mouse
      const dx = mousePosition.x - dot.baseX
      const dy = mousePosition.y - dot.baseY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const maxDistance = 100

      // Move dots away from mouse with a smooth falloff
      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance

        // Calculate new position with easing
        dot.x = dot.baseX - dx * force * 0.5
        dot.y = dot.baseY - dy * force * 0.5
      } else {
        // Return to original position with easing
        dot.x += (dot.baseX - dot.x) * dot.speed
        dot.y += (dot.baseY - dot.y) * dot.speed
      }

      // Draw the dot
      ctx.beginPath()
      ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
      ctx.fill()
    })

    requestAnimationFrame(animate)
  }

  // Set up event listeners and start animation
  window.addEventListener("mousemove", handleMouseMove)
  window.addEventListener("resize", initializeCanvas)

  initializeCanvas()
  animate()

  // Update isDarkMode when theme changes
  document.addEventListener("themeChanged", (e) => {
    isDarkMode = e.detail.isDarkMode
  })
}

// Initialize theme toggle functionality
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle")
  if (!themeToggle) return

  const moonIcon = document.getElementById("moonIcon")
  const sunIcon = document.getElementById("sunIcon")

  // Check if dark mode is saved in localStorage
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark") {
    document.body.classList.add("dark")
    moonIcon.classList.add("hidden")
    sunIcon.classList.remove("hidden")
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark")
    const isDarkMode = document.body.classList.contains("dark")

    if (isDarkMode) {
      moonIcon.classList.add("hidden")
      sunIcon.classList.remove("hidden")
      localStorage.setItem("theme", "dark")
    } else {
      moonIcon.classList.remove("hidden")
      sunIcon.classList.add("hidden")
      localStorage.setItem("theme", "light")
    }

    // Dispatch custom event for other components to react to theme change
    document.dispatchEvent(
      new CustomEvent("themeChanged", {
        detail: { isDarkMode: isDarkMode },
      }),
    )
  })
}

// Generate content based on page type
function generatePageContent() {
  const pageType = document.body.getAttribute("data-page-type")
  if (!pageType) return

  const contentContainer = document.getElementById("dynamicContent")
  if (!contentContainer) return

  switch (pageType) {
    case "about":
      generateAboutContent(contentContainer)
      break
    case "projects":
      generateProjectsContent(contentContainer)
      break
    case "skills":
      generateSkillsContent(contentContainer)
      break
    case "contact":
      initContactForm()
      break
    case "resume":
      generateResumeContent(contentContainer)
      break
    default:
      break
  }
}

// Generate about page content
function generateAboutContent(container) {
  const aboutContent = `
  <div class="about-content">
    <h2 class="section-title">ABOUT ME</h2>
    
    <div class="about-grid">
      <div class="about-image">
        <img src="public/pip.jpg" alt="Ray Onyango" class="rounded-image">
      </div>
      
      <div class="about-text">
        <h3 class="about-subtitle">Who I Am</h3>
        <p>I'm Ray Onyango, a passionate software developer and cybersecurity specialist with expertise in building secure web and mobile applications. With a strong foundation in computer science and years of industry experience, I specialize in creating efficient, scalable, and secure digital solutions.</p>
        
        <h3 class="about-subtitle">My Journey</h3>
        <p>My journey in software development began during my university years where I discovered my passion for coding. I later expanded into cybersecurity after recognizing the critical importance of building secure applications from the ground up. I've earned my ICS2 certification and continue to develop my expertise in both software development and cybersecurity.</p>
        
        <h3 class="about-subtitle">My Approach</h3>
        <p>I believe in writing clean, maintainable, and secure code following industry best practices. My approach to development is user-centered, focusing on creating intuitive interfaces and seamless experiences while ensuring robust security measures are implemented. I'm committed to continuous learning and improvement, always seeking new challenges and opportunities to grow.</p>
        
        <div class="about-stats">
          <div class="stat">
            <span class="stat-number">5+</span>
            <span class="stat-label">Years Experience</span>
          </div>
          <div class="stat">
            <span class="stat-number">50+</span>
            <span class="stat-label">Projects Completed</span>
          </div>
          <div class="stat">
            <span class="stat-number">20+</span>
            <span class="stat-label">Happy Clients</span>
          </div>
        </div>
      </div>
    </div>
  </div>
`

  container.innerHTML = aboutContent
}

// Generate projects page content
function generateProjectsContent(container) {
  // Fetch projects from mock database
  const projects = [
    {
      title: "E-Commerce API",
      description: "RESTful API for e-commerce with authentication, payment processing, and order management",
      image: "public/e commerce.jpg",
      tags: ["Node.js", "Express", "MongoDB", "JWT"],
    },
    {
      title: "Health Tracking Dashboard",
      description: "Real-time dashboard for monitoring health metrics with data visualization",
      image: "public/health tracking.jpg",
      tags: ["React", "D3.js", "Firebase", "Tailwind CSS"],
    },
    {
      title: "Inventory Management System",
      description: "Full-stack inventory system with barcode scanning and automated reporting",
      image: "public/inventory-management.jpg",
      tags: ["JavaScript", "PostgreSQL", "Express", "TypeScript"],
    },
    {
      title: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication and transaction history",
      image: "public/mobile banking.jpg",
      tags: ["JavaScript", "HTML/CSS", "Node.js", "OAuth"],
    },
    {
      title: "AI Content Generator",
      description: "Web application that leverages AI to generate marketing content and social media posts",
      image: "public/ai.jpg",
      tags: ["Python", "Flask", "OpenAI API", "JavaScript"],
    },
    {
      title: "DevOps Automation Tool",
      description: "CLI tool for automating deployment workflows and infrastructure management",
      image: "public/devops.jpg",
      tags: ["Go", "Docker", "AWS", "Terraform"],
    },
    {
      title: "Social Media Analytics Platform",
      description: "Platform for tracking and analyzing social media performance across multiple channels",
      image: "public/social media.jpg",
      tags: ["Python", "Django", "React", "PostgreSQL"],
    },
    {
      title: "Real Estate Listing App",
      description: "Mobile application for browsing and searching real estate listings with map integration",
      image: "public/real estate.jpg",
      tags: ["JavaScript", "React Native", "Firebase", "Google Maps API"],
    },
  ]

  let projectsHTML = `
    <div class="projects-content">
      <h2 class="section-title">MY PROJECTS</h2>
      <p class="section-description">Here are some of the projects I've worked on. Each project represents a unique challenge and solution.</p>
      
      <div class="filter-controls">
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="JavaScript">JavaScript</button>
        <button class="filter-btn" data-filter="Python">Python</button>
        <button class="filter-btn" data-filter="API">API</button>
      </div>
      
      <div class="project-grid">
  `

  projects.forEach((project, index) => {
    projectsHTML += `
      <div class="project-card" data-tags="${project.tags.join(",")}">
        <div class="project-image">
          <img src="${project.image}" alt="${project.title}">
          <div class="project-overlay">
            <a href="project-details.html?id=${index}" class="btn btn-small">View Details</a>
          </div>
        </div>
        <div class="project-content">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="project-tags">
            ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
          </div>
        </div>
      </div>
    `
  })

  projectsHTML += `
      </div>
    </div>
  `

  container.innerHTML = projectsHTML

  // Initialize filter functionality
  initProjectFilters()
}

// Initialize project filters
function initProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))

      // Add active class to clicked button
      button.classList.add("active")

      const filter = button.getAttribute("data-filter")

      // Show/hide projects based on filter
      projectCards.forEach((card) => {
        if (filter === "all") {
          card.style.display = "block"
        } else {
          const tags = card.getAttribute("data-tags").split(",")
          if (tags.includes(filter)) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        }
      })
    })
  })
}

// Generate skills page content
function generateSkillsContent(container) {
  const skillCategories = [
    {
      category: "Programming Languages",
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Python", level: 80 },
        { name: "Java", level: 75 },
        { name: "HTML/CSS", level: 95 },
        { name: "SQL", level: 85 },
        { name: "PHP", level: 70 },
      ],
    },
    {
      category: "Frameworks & Libraries",
      skills: [
        { name: "React", level: 90 },
        { name: "Node.js", level: 85 },
        { name: "Express", level: 80 },
        { name: "Django", level: 75 },
        { name: "jQuery", level: 85 },
        { name: "Angular", level: 70 },
        { name: "Vue.js", level: 65 },
      ],
    },
    {
      category: "Tools & Technologies",
      skills: [
        { name: "Git", level: 90 },
        { name: "Docker", level: 80 },
        { name: "AWS", level: 75 },
        { name: "MongoDB", level: 85 },
        { name: "PostgreSQL", level: 80 },
        { name: "RESTful APIs", level: 90 },
        { name: "GraphQL", level: 70 },
      ],
    },
    {
      category: "Cybersecurity",
      skills: [
        { name: "Vulnerability Assessment", level: 85 },
        { name: "Penetration Testing", level: 80 },
        { name: "Network Security", level: 85 },
        { name: "Security Compliance", level: 90 },
        { name: "Threat Analysis", level: 80 },
        { name: "Incident Response", level: 75 },
        { name: "Secure Coding Practices", level: 85 },
      ],
    },
    {
      category: "Soft Skills",
      skills: [
        { name: "Problem Solving", level: 95 },
        { name: "Communication", level: 90 },
        { name: "Team Collaboration", level: 85 },
        { name: "Project Management", level: 80 },
        { name: "Adaptability", level: 90 },
        { name: "Time Management", level: 85 },
      ],
    },
  ]

  let skillsHTML = `
    <div class="skills-content">
      <h2 class="section-title">MY SKILLS</h2>
      <p class="section-description">Here's an overview of my technical skills and expertise. I'm constantly learning and expanding my skillset.</p>
      
      <div class="skills-tabs">
        <div class="tabs-header">
  `

  // Generate tab headers
  skillCategories.forEach((category, index) => {
    skillsHTML += `
      <button class="tab-btn ${index === 0 ? "active" : ""}" data-tab="${index}">${category.category}</button>
    `
  })

  skillsHTML += `
        </div>
        <div class="tabs-content">
  `

  // Generate tab content
  skillCategories.forEach((category, index) => {
    skillsHTML += `
      <div class="tab-pane ${index === 0 ? "active" : ""}" data-tab="${index}">
        <div class="skills-list">
    `

    category.skills.forEach((skill) => {
      skillsHTML += `
        <div class="skill-item">
          <div class="skill-info">
            <span class="skill-name">${skill.name}</span>
            <span class="skill-percentage">${skill.level}%</span>
          </div>
          <div class="skill-bar">
            <div class="skill-progress" style="width: ${skill.level}%"></div>
          </div>
        </div>
      `
    })

    skillsHTML += `
        </div>
      </div>
    `
  })

  skillsHTML += `
        </div>
      </div>
    </div>
  `

  container.innerHTML = skillsHTML

  // Initialize tabs functionality
  initSkillTabs()
}

// Initialize skills tabs
function initSkillTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn")
  const tabPanes = document.querySelectorAll(".tab-pane")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons and panes
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      tabPanes.forEach((pane) => pane.classList.remove("active"))

      // Add active class to clicked button and corresponding pane
      button.classList.add("active")
      const tabIndex = button.getAttribute("data-tab")
      document.querySelector(`.tab-pane[data-tab="${tabIndex}"]`).classList.add("active")
    })
  })

  // Animate skill bars on tab change
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tabIndex = btn.getAttribute("data-tab")
      const activePane = document.querySelector(`.tab-pane[data-tab="${tabIndex}"]`)

      // Reset progress bars
      activePane.querySelectorAll(".skill-progress").forEach((bar) => {
        bar.style.width = "0"
      })

      // Animate progress bars
      setTimeout(() => {
        activePane.querySelectorAll(".skill-progress").forEach((bar) => {
          const width = bar.parentElement.previousElementSibling.querySelector(".skill-percentage").textContent
          bar.style.width = width
        })
      }, 50)
    })
  })

  // Trigger animation for initial tab
  setTimeout(() => {
    document.querySelectorAll(".tab-pane.active .skill-progress").forEach((bar) => {
      const width = bar.parentElement.previousElementSibling.querySelector(".skill-percentage").textContent
      bar.style.width = width
    })
  }, 500)
}

// Generate resume content
function generateResumeContent(container) {
  const resumeContent = `
    <div class="resume-content">
      <h2 class="section-title">MY RESUME</h2>
      
      <div class="resume-download">
        <p>Download my complete resume as a PDF file:</p>
        <a href="assets/resume.pdf" download class="btn btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" x2="12" y1="15" y2="3"></line>
          </svg>
          Download Resume
        </a>
      </div>
      
      <div class="resume-sections">
        <div class="resume-section">
          <h3 class="resume-section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
              <line x1="16" x2="16" y1="2" y2="6"></line>
              <line x1="8" x2="8" y1="2" y2="6"></line>
              <line x1="3" x2="21" y1="10" y2="10"></line>
            </svg>
            Work Experience
          </h3>
          
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h4 class="timeline-title">Senior Software Developer</h4>
                <h5 class="timeline-subtitle">Tech Innovations Inc.</h5>
                <p class="timeline-date">2020 - Present</p>
                <p class="timeline-description">
                  Lead development of enterprise web applications using React, Node.js, and PostgreSQL.
                  Implemented CI/CD pipelines and improved code quality through automated testing.
                  Mentored junior developers and conducted code reviews.
                </p>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h4 class="timeline-title">Full Stack Developer</h4>
                <h5 class="timeline-subtitle">Digital Solutions Ltd.</h5>
                <p class="timeline-date">2018 - 2020</p>
                <p class="timeline-description">
                  Developed and maintained multiple client websites and web applications.
                  Worked with JavaScript, Python, and various databases.
                  Collaborated with design team to implement responsive UI/UX designs.
                </p>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h4 class="timeline-title">Junior Web Developer</h4>
                <h5 class="timeline-subtitle">Kenya Industrial Estates</h5>
                <p class="timeline-date">2024 - 2024/5</p>
                <p class="timeline-description">
                  Built and maintained client websites using HTML, CSS, JavaScript, and PHP.
                  Assisted in database design and implementation.
                  Provided technical support and troubleshooting for existing websites.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="resume-section">
          <h3 class="resume-section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
            Education
          </h3>
          
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h4 class="timeline-title">Software Development</h4>
                <h5 class="timeline-subtitle">Power Learn Project Africa</h5>
                <p class="timeline-date">2025 - To Date</p>
                <p class="timeline-description">
                  Specialized in Software Engineering and Artificial Intelligence.
                  Thesis: "Optimizing Machine Learning Algorithms for Web Applications"
                </p>
              </div>
            </div>
            
            <div class="timeline-item">
              <div class="timeline-marker"></div>
              <div class="timeline-content">
                <h4 class="timeline-title">Bachelor of Science in Computer Science And Engineering</h4>
                <h5 class="timeline-subtitle">Technical University Of Mombasa</h5>
                <p class="timeline-date">2022 - 2025</p>
                <p class="timeline-description">
                  Graduated with honors. Coursework included Data Structures, Algorithms, Database Systems, and Web Development.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="resume-section">
          <h3 class="resume-section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"></path>
            </svg>
            Certifications
          </h3>
          
          <div class="certifications-grid">
            <div class="certification-item">
              <h4 class="certification-title">AWS Certified Solutions Architect</h4>
              <p class="certification-issuer">Amazon Web Services</p>
              <p class="certification-date">2024</p>
            </div>
            
            <div class="certification-item">
              <h4 class="certification-title">Professional Scrum Master I</h4>
              <p class="certification-issuer">Scrum.org</p>
              <p class="certification-date">2024</p>
            </div>
            
            <div class="certification-item">
              <h4 class="certification-title">Africa Hackon CyberSecurity </h4>
              <p class="certification-issuer">Africa Hackon</p>
              <p class="certification-date">2024</p>
            </div>
            
            <div class="certification-item">
              <h4 class="certification-title">Google Cloud Professional Developer</h4>
              <p class="certification-issuer">Google Cloud</p>
              <p class="certification-date">2024</p>
            </div>
            <div class="certification-item">
              <h4 class="certification-title">ICS2 Certification</h4>
              <p class="certification-issuer">International Information System Security Certification Consortium</p>
              <p class="certification-date">2025</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `

  container.innerHTML = resumeContent
}

// Initialize contact form
function initContactForm() {
  const contactForm = document.getElementById("contactForm")
  if (!contactForm) return

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    }

    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]')
    const originalText = submitButton.textContent

    submitButton.disabled = true
    submitButton.textContent = "Sending..."

    // Simulate API call
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
        <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
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

