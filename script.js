// Interactive Dot Background
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("dotBackground");
  const ctx = canvas.getContext("2d");

  let dots = [];
  let mousePosition = { x: 0, y: 0 };
  let isDarkMode = document.body.classList.contains("dark");
  const animationSpeed = 0.08;
  const dotDensity = 20; // Lower number means more dots

  function initializeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    dots = [];
    const spacing = dotDensity;
    const dotSize = 1;

    for (let x = 0; x < canvas.width; x += spacing) {
      for (let y = 0; y < canvas.height; y += spacing) {
        const randomOffsetX = Math.random() * 5 - 2.5;
        const randomOffsetY = Math.random() * 5 - 2.5;

        dots.push({
          x: x + randomOffsetX,
          y: y + randomOffsetY,
          baseX: x + randomOffsetX,
          baseY: y + randomOffsetY,
          size: dotSize,
          speed: animationSpeed + Math.random() * 0.04,
          vx: Math.random() * 0.2 - 0.1,
          vy: Math.random() * 0.2 - 0.1,
          color: isDarkMode
            ? `rgba(${50 + Math.random() * 30}, ${50 + Math.random() * 30}, ${70 + Math.random() * 30}, 0.8)`
            : `rgba(${220 + Math.random() * 30}, ${220 + Math.random() * 30}, ${220 + Math.random() * 30}, 0.8)`,
        });
      }
    }
  }

  function handleMouseMove(e) {
    mousePosition = {
      x: e.clientX,
      y: e.clientY,
    };
  }

  function handleTouchMove(e) {
    if (e.touches.length > 0) {
      const touchTarget = e.target;
      if (touchTarget === canvas) {
        e.preventDefault();
      }

      mousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  }

  function animate() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    dots.forEach((dot) => {
      const dx = mousePosition.x - dot.x;
      const dy = mousePosition.y - dot.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 150;

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        const repelForce = 0.8;
        dot.x = dot.x - dx * force * repelForce;
        dot.y = dot.y - dy * force * repelForce;
      } else {
        dot.x += dot.vx;
        dot.y += dot.vy;

        const homeX = dot.baseX - dot.x;
        const homeY = dot.baseY - dot.y;
        dot.x += homeX * dot.speed * 0.1;
        dot.y += homeY * dot.speed * 0.1;

        const homeDist = Math.sqrt(homeX * homeX + homeY * homeY);
        if (homeDist > 50) {
          dot.vx = -dot.vx;
          dot.vy = -dot.vy;
        }
      }

      ctx.beginPath();
      ctx.fillStyle = dot.color;
      ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  const themeToggle = document.getElementById("themeToggle");
  const moonIcon = document.getElementById("moonIcon");
  const sunIcon = document.getElementById("sunIcon");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    isDarkMode = true;
    moonIcon.classList.add("hidden");
    sunIcon.classList.remove("hidden");
    updateDotColors();
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    isDarkMode = document.body.classList.contains("dark");

    if (isDarkMode) {
      moonIcon.classList.add("hidden");
      sunIcon.classList.remove("hidden");
      localStorage.setItem("theme", "dark");
    } else {
      moonIcon.classList.remove("hidden");
      sunIcon.classList.add("hidden");
      localStorage.setItem("theme", "light");
    }

    updateDotColors();
  });

  function updateDotColors() {
    dots.forEach((dot) => {
      dot.color = isDarkMode
        ? `rgba(${50 + Math.random() * 30}, ${50 + Math.random() * 30}, ${70 + Math.random() * 30}, 0.8)`
        : `rgba(${220 + Math.random() * 30}, ${220 + Math.random() * 30}, ${220 + Math.random() * 30}, 0.8)`;
    });
  }

  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
      };

      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Sending...
      `;

      setTimeout(() => {
        console.log("Form submission:", formData);

        const formContainer = contactForm.parentElement;
        const successMessage = document.createElement("div");
        successMessage.className = "form-success-message";
        successMessage.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <h3>Message Sent Successfully!</h3>
          <p>Thank you for reaching out. I will get back to you soon.</p>
          <button class="btn btn-primary" id="resetFormBtn">Send Another Message</button>
        `;

        formContainer.appendChild(successMessage);
        contactForm.style.display = "none";

        document.getElementById("resetFormBtn").addEventListener("click", () => {
          contactForm.reset();
          contactForm.style.display = "block";
          successMessage.remove();
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        });
      }, 2000);
    });
  }

  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      document.body.classList.toggle("menu-open");
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
          document.body.classList.remove("menu-open");
        }

        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  document.getElementById("currentYear").textContent = new Date().getFullYear();

  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("touchmove", handleTouchMove);
  window.addEventListener("resize", initializeCanvas);

  initializeCanvas();
  animate();
});

// Database Integration Mock
const databaseMock = {
  storeContactSubmission: (data) => {
    console.log("Storing in database:", data);
    return Promise.resolve({ success: true, id: Date.now() });
  },
  getProjects: () => {
    return Promise.resolve([
      {
        id: 1,
        title: "E-Commerce API",
        description: "RESTful API for e-commerce with authentication, payment processing, and order management",
        tags: ["Node.js", "Express", "MongoDB", "JWT"],
      },
    ]);
  },
};
