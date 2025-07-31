document.addEventListener("DOMContentLoaded", () => {
  // Get project ID from URL
  const urlParams = new URLSearchParams(window.location.search)
  const projectId = urlParams.get("id")

  if (projectId === null) {
    window.location.href = "projects.html"
    return
  }

  // Fetch project data from database (using our mock database for now)
  fetchProjectDetails(projectId)
})

// Function to fetch project details
function fetchProjectDetails(projectId) {
  // In a real implementation, this would make an AJAX request to the server
  // For now, we'll use our mock database

  // Show loading state
  document.getElementById("projectContent").innerHTML = '<div class="loading">Loading project details...</div>'

  // Simulate API call delay
  setTimeout(() => {
    // This would be replaced with actual AJAX call in production
    const xhr = new XMLHttpRequest()
    xhr.open("GET", `database.php?action=getProject&id=${projectId}`, true)

    xhr.onload = function () {
      if (this.status === 200) {
        try {
          // In a real implementation, this would parse the JSON response from the server
          // For now, we'll use mock data
          displayProjectDetails(getMockProjectData(projectId))
        } catch (e) {
          showError("Error parsing project data")
        }
      } else {
        showError("Error loading project data")
      }
    }

    xhr.onerror = () => {
      showError("Network error occurred")
    }

    // In a real implementation, this would send the request
    // xhr.send();

    // For demo, we'll just call displayProjectDetails directly
    displayProjectDetails(getMockProjectData(projectId))
  }, 1000)
}

// Function to display project details
function displayProjectDetails(project) {
  if (!project) {
    showError("Project not found")
    return
  }

  // Update page title
  document.title = `${project.title} - Ray Onyango | Software Developer`

  // Generate project details HTML
  const projectHTML = `
    <div class="project-header">
      <h1 class="project-title">${project.title}</h1>
      <div class="project-tags">
        ${project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
      </div>
    </div>
    
    <div class="project-image-large">
      <img src="${project.image}" alt="${project.title}">
    </div>
    
    <div class="project-description-full">
      ${project.fullDescription}
    </div>
    
    <div class="project-links">
      <a href="${project.demoLink}" class="btn btn-primary" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
        Live Demo
      </a>
      <a href="${project.githubLink}" class="btn btn-secondary" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
          <path d="M9 18c-4.51 2-5-2-7-2"></path>
        </svg>
        View Code
      </a>
    </div>
    
    <div class="related-projects">
      <h2 class="section-title">Related Projects</h2>
      <div class="project-grid">
        ${getRelatedProjects(project.id, project.tags)
          .map(
            (relatedProject) => `
          <div class="project-card">
            <div class="project-image">
              <img src="${relatedProject.image}" alt="${relatedProject.title}">
              <div class="project-overlay">
                <a href="project-details.html?id=${relatedProject.id}" class="btn btn-small">View Details</a>
              </div>
            </div>
            <div class="project-content">
              <h3 class="project-title">${relatedProject.title}</h3>
              <p class="project-description">${relatedProject.description}</p>
              <div class="project-tags">
                ${relatedProject.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
              </div>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    </div>
  `

  // Update the DOM
  document.getElementById("projectContent").innerHTML = projectHTML
}

// Function to show error message
function showError(message) {
  document.getElementById("projectContent").innerHTML = `
    <div class="error-message">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <h3>Error</h3>
      <p>${message}</p>
      <a href="projects.html" class="btn btn-primary">Back to Projects</a>
    </div>
  `
}

// Mock database functions
function getMockProjectData(projectId) {
  const projects = getAllProjects()
  return projects.find((p) => p.id.toString() === projectId.toString())
}

function getRelatedProjects(projectId, tags) {
  const projects = getAllProjects()
  return projects
    .filter((p) => p.id.toString() !== projectId.toString()) // Exclude current project
    .filter((p) => p.tags.some((tag) => tags.includes(tag))) // Include projects with at least one matching tag
    .slice(0, 3) // Limit to 3 related projects
}

function getAllProjects() {
  return [
    {
      id: 0,
      title: "Password Cracker",
      description: "A powerful, extensible password hash cracker with CLI and GUI support",
      image: "public/password cracker.jpg",
      tags: ["python", "shell", "Markdown"],
      fullDescription: `
        <p>Password Cracker is a Python-based security tool designed to audit password strength by attempting to crack hashed passwords using both dictionary (wordlist) attacks and brute-force methods. Built with extensibility in mind, it supports a variety of hashing algorithms and includes both a command-line interface (CLI) and a graphical user interface (GUI) for ease of use.

This tool is intended strictly for ethical hacking, cybersecurity training, and controlled testing environments.</p>
        
        <h3>Key Features</h3>
        <ul>
          <li>Supports Multiple Hash Algorithms</li>
          <li>Wordlist + Brute-force Cracking</li>
          <li>Batch Mode</li>
          <li>Progress Tracking</li>
          <li>Fully Terminal Operable</li>
          <li>GUI (Tkinter + ttk)</li>
        </ul>
        
        <h3>Technical Details</h3>
        <p>Languages & Tools,Python 3 (Core logic),Shell (Bash) (Testing, GitOps),Tkinter + ttk (GUI),Markdown (Documentation).</p>
        
        <h3>Challenges and Solutions</h3>
        <p>Challanges:Different hashes (e.g., bcrypt vs SHA256) require different methods for checking.</p>
        <p>Solution:Created a modular algorithm dispatcher and fallback system to auto-detect or manually specify hash types.</p>
      `,
      demoLink: "https://github.com/goldin-king/password-cracker",
      githubLink: "https://github.com/goldin-king/password-cracker",
    },
    {
      id: 1,
      title: "Eco-crypto Genie",
      description: "EcoCryptoGenie is a simple yet powerful Python chatbot that helps users make eco-friendly and informed cryptocurrency investment decisions.",
      image: "public/eco crypto.jpg",
      tags: ["Python", "Machine Learning", "API"],
      fullDescription: `
        <p>EcoCryptoGenie is a simple yet powerful Python chatbot that helps users make eco-friendly and informed cryptocurrency investment decisions. It combines real-time crypto market data from the CoinGecko API with sustainability metrics to recommend coins based on trends, energy use, and long-term growth potential.</p>
        
        <h3>Key Features</h3>
        <ul>
          <li>Real-time crypto data</li>
          <li>Sustainability scores</li>
          <li>Natural language understanding</li>
          <li>Advice categories</li>
          <li>Friendly and engaging personality</li>
          <li>Disclaimer: Reminds users about the risks involved in crypto investing.</li>
        </ul>
        
        <h3>Technical Details</h3>
        <p>The chat is build using Python anad use CoinGecko API to get data and present real time data to users.</p>
        
        <h3>Challenges and Solutions</h3>
        <p>Not having realtime data but it was fixed by adding the api to the bot</p>
      `,
      demoLink: "https://github.com/goldin-king/EcoCryptoGenie",
      githubLink: "https://github.com/goldin-king/EcoCryptoGenie",
    },
    {
      id: 2,
     title: "Security Vulnerability Scanner",
  description:
    "Automated Python-based web vulnerability scanner with GUI, REST API, and PDF/CSV reporting. Built for local or Dockerized environments.",
  image: "public/vulnerability.jpg",
  tags: ["Python", "Flask", "Tkinter", "Docker", "REST API", "Security"],
  fullDescription: `
    <p>This Security Vulnerability Scanner is a complete tool for scanning websites for security flaws. Built in Python with a GUI frontend and REST API backend, it allows both technical and non-technical users to perform scans locally or through Docker containers.</p>

    <h3>Key Features</h3>
    <ul>
      <li>Scans for common vulnerabilities: SQL Injection, XSS, CSRF, insecure headers, and HTTP methods</li>
      <li>GUI built with Tkinter for local interaction</li>
      <li>RESTful API for integration with automation tools or CI/CD</li>
      <li>PDF and CSV export support for scan reports</li>
      <li>Batch scanning and real-time progress tracking</li>
      <li>Docker support for isolated and reproducible testing environments</li>
    </ul>

    <h3>Technical Details</h3>
    <p>The tool uses Python's standard and third-party libraries including <code>requests</code>, <code>Flask</code>, <code>tkinter</code>, <code>reportlab</code>, and <code>csv</code>. It features modular components for scanning, exporting, and API interaction. The web scanning engine uses form analysis, header/method inspection, and basic injection pattern testing.</p>
    
    <p>The GUI uses <code>ttk</code> for styled widgets, while Docker support allows quick setup via <code>docker-compose</code>. Reports are generated as downloadable PDFs or CSVs for audit purposes.</p>

    <h3>Challenges and Solutions</h3>
    <p>Integrating multiple components (CLI, GUI, API) without breaking flow required a modular design with shared logic. To reduce false positives in vulnerability detection, layered checks and HTTP response analysis were implemented. Docker networking and volume persistence were addressed with explicit service definitions in <code>docker-compose.yml</code>.</p>
  `
     ,
      demoLink: "https://github.com/goldin-king/security-vulnerability-scanner",
      githubLink: "https://github.com/goldin-king/security-vulnerability-scanner",
    },
    {
      id: 3,
      title: "Mobile Banking App",
      description: "Secure mobile banking application with biometric authentication and transaction history",
      image: "public/mobile banking.jpg",
      tags: ["JavaScript", "HTML/CSS", "Node.js", "OAuth"],
      fullDescription: `
        <p>The Mobile Banking App is a secure and user-friendly application that allows users to manage their finances on the go. It includes features such as account management, fund transfers, bill payments, and transaction history.</p>
        
        <h3>Key Features</h3>
        <ul>
          <li>Biometric authentication for enhanced security</li>
          <li>Real-time account balance and transaction history</li>
          <li>Secure fund transfers and bill payments</li>
          <li>QR code payments</li>
          <li>Budgeting tools and expense categorization</li>
          <li>Push notifications for account activities</li>
        </ul>
        
        <h3>Technical Details</h3>
        <p>The app is built using JavaScript, HTML, and CSS for the frontend, with Node.js powering the backend services. OAuth is implemented for secure authentication, along with additional security measures such as encryption and secure socket layers.</p>
        
        <h3>Challenges and Solutions</h3>
        <p>Security was the primary challenge for this project, addressed by implementing multiple layers of protection including biometric authentication, encryption, and secure communication protocols. Another challenge was ensuring a seamless user experience across different devices and operating systems, which was solved by adopting responsive design principles and extensive cross-platform testing.</p>
      `,
      demoLink: "#",
      githubLink: "#",
    },
    {
      id: 4,
      title: "AI Content Generator",
      description: "Web application that leverages AI to generate marketing content and social media posts",
      image: "public/ai.jpg",
      tags: ["Python", "Flask", "OpenAI API", "JavaScript"],
      fullDescription: `
        <p>The AI Content Generator is a web application that helps marketers and content creators generate high-quality content using artificial intelligence. It can create blog posts, social media content, product descriptions, and more with minimal input from the user.</p>
        
        <h3>Key Features</h3>
        <ul>
          <li>AI-powered content generation for various formats</li>
          <li>Content customization based on tone, style, and target audience</li>
          <li>SEO optimization suggestions</li>
          <li>Content scheduling and publishing integration</li>
          <li>Performance analytics for published content</li>
          <li>Collaborative editing and approval workflows</li>
        </ul>
        
        <h3>Technical Details</h3>
        <p>The application is built with Python and Flask for the backend, integrating with the OpenAI API for content generation. The frontend uses JavaScript to create an interactive and responsive user interface.</p>
        
        <h3>Challenges and Solutions</h3>
        <p>A major challenge was ensuring the generated content was relevant, accurate, and aligned with the user's brand voice. This was addressed by implementing fine-tuning capabilities and providing extensive customization options. Another challenge was managing API costs while providing value to users, which was solved by implementing intelligent caching and optimizing API calls.</p>
      `,
      demoLink: "#",
      githubLink: "#",
    },
    {
      id: 5,
      title: "DevOps Automation Tool",
      description: "CLI tool for automating deployment workflows and infrastructure management",
      image: "public/devops.jpg",
      tags: ["Go", "Docker", "AWS", "Terraform"],
      fullDescription: `
        <p>The DevOps Automation Tool is a command-line interface (CLI) application that simplifies and automates various DevOps tasks, including deployment workflows, infrastructure provisioning, and monitoring setup.</p>
        
        <h3>Key Features</h3>
        <ul>
          <li>Automated deployment pipelines</li>
          <li>Infrastructure as Code (IaC) management</li>
          <li>Environment configuration and synchronization</li>
          <li>Monitoring and alerting setup</li>
          <li>Backup and disaster recovery automation</li>
          <li>Comprehensive logging and audit trails</li>
        </ul>
        
        <h3>Technical Details</h3>
        <p>The tool is built with Go for performance and cross-platform compatibility. It integrates with Docker for containerization, AWS for cloud infrastructure, and Terraform for infrastructure provisioning.</p>
        
        <h3>Challenges and Solutions</h3>
        <p>One of the main challenges was supporting a wide range of infrastructure providers and deployment targets. This was addressed by implementing a plugin architecture that allows for easy extension and customization. Another challenge was ensuring idempotent operations to prevent unintended changes, which was solved by implementing thorough state checking and dry-run capabilities.</p>
      `,
      demoLink: "https://github.com/goldin-king/security-vulnerability-scanner",
      githubLink: "https://github.com/goldin-king/security-vulnerability-scanner",
    },
      {
  id: 6,
  title: "Security Vulnerability Scanner",
  description:
    "Automated Python-based web vulnerability scanner with GUI, REST API, and PDF/CSV reporting. Built for local or Dockerized environments.",
  image: "public/vulnerability.jpg",
  tags: ["Python", "Flask", "Tkinter", "Docker", "REST API", "Security"],
  fullDescription: `
    <p>This Security Vulnerability Scanner is a complete tool for scanning websites for security flaws. Built in Python with a GUI frontend and REST API backend, it allows both technical and non-technical users to perform scans locally or through Docker containers.</p>

    <h3>Key Features</h3>
    <ul>
      <li>Scans for common vulnerabilities: SQL Injection, XSS, CSRF, insecure headers, and HTTP methods</li>
      <li>GUI built with Tkinter for local interaction</li>
      <li>RESTful API for integration with automation tools or CI/CD</li>
      <li>PDF and CSV export support for scan reports</li>
      <li>Batch scanning and real-time progress tracking</li>
      <li>Docker support for isolated and reproducible testing environments</li>
    </ul>

    <h3>Technical Details</h3>
    <p>The tool uses Python's standard and third-party libraries including <code>requests</code>, <code>Flask</code>, <code>tkinter</code>, <code>reportlab</code>, and <code>csv</code>. It features modular components for scanning, exporting, and API interaction. The web scanning engine uses form analysis, header/method inspection, and basic injection pattern testing.</p>
    
    <p>The GUI uses <code>ttk</code> for styled widgets, while Docker support allows quick setup via <code>docker-compose</code>. Reports are generated as downloadable PDFs or CSVs for audit purposes.</p>

    <h3>Challenges and Solutions</h3>
    <p>Integrating multiple components (CLI, GUI, API) without breaking flow required a modular design with shared logic. To reduce false positives in vulnerability detection, layered checks and HTTP response analysis were implemented. Docker networking and volume persistence were addressed with explicit service definitions in <code>docker-compose.yml</code>.</p>
  `
     ,
      demoLink: "https://github.com/goldin-king/security-vulnerability-scanner",
      githubLink: "https://github.com/goldin-king/security-vulnerability-scanner",
    },
    {
      id: 7,
      title: "Secure Authentication System",
      description: "Multi-factor authentication system with biometric verification and advanced threat detection",
      image: "public/authentication.jpeg",
      tags: ["Node.js", "Security", "Biometrics", "JWT"],
      fullDescription: `
    <p>The Secure Authentication System is a comprehensive solution for implementing robust user authentication in web and mobile applications. It provides multi-factor authentication, biometric verification, and advanced threat detection to protect user accounts from unauthorized access.</p>
    
    <h3>Key Features</h3>
    <ul>
      <li>Multi-factor authentication with SMS, email, and authenticator app options</li>
      <li>Biometric verification support (fingerprint, facial recognition)</li>
      <li>Anomaly detection for suspicious login attempts</li>
      <li>Secure password storage with adaptive hashing</li>
      <li>Session management with secure JWT implementation</li>
      <li>Comprehensive audit logging for security events</li>
    </ul>
    
    <h3>Technical Details</h3>
    <p>The system is built with Node.js and implements industry best practices for secure authentication. It uses adaptive hashing algorithms for password storage, secure JWT implementation for session management, and integrates with various biometric verification services.</p>
    
    <h3>Challenges and Solutions</h3>
    <p>One of the main challenges was balancing security with user experience, ensuring robust protection without creating friction for legitimate users. This was addressed by implementing risk-based authentication that adjusts security requirements based on contextual factors. Another challenge was supporting various biometric verification methods across different devices, which was solved by creating a modular architecture with standardized interfaces for different biometric providers.</p>
  `,
      demoLink: "#",
      githubLink: "#",
    },
  ]
}

