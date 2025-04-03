import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, Download } from "lucide-react"
import DotBackground from "@/components/dot-background"
import ThemeToggle from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <DotBackground />

      <div className="relative z-10">
        {/* Header */}
        <header className="container mx-auto flex items-center justify-between py-6 px-4">
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <div className="flex items-center gap-4">
              <Link href="https://github.com" className="text-foreground hover:text-foreground/80">
                <Github size={20} />
              </Link>
              <Link href="https://linkedin.com" className="text-foreground hover:text-foreground/80">
                <Linkedin size={20} />
              </Link>
              <Link href="https://twitter.com" className="text-foreground hover:text-foreground/80">
                <Twitter size={20} />
              </Link>
              <Link href="mailto:hello@example.com" className="text-foreground hover:text-foreground/80">
                <Mail size={20} />
              </Link>
            </div>
          </div>

          <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <span className="font-bold text-xl text-primary">RAY ONYANGO</span>
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#about" className="text-sm font-medium hover:text-foreground/80">
                About
              </Link>
              <Link href="#projects" className="text-sm font-medium hover:text-foreground/80">
                Projects
              </Link>
              <Link href="#skills" className="text-sm font-medium hover:text-foreground/80">
                Skills
              </Link>
              <Link href="#contact" className="text-sm font-medium hover:text-foreground/80">
                Contact
              </Link>
            </nav>
            <Link href="/resume.pdf" className="text-foreground hover:text-foreground/80">
              <Download size={20} />
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section
          id="about"
          className="container mx-auto flex flex-col items-center justify-center py-24 px-4 text-center"
        >
          <div className="mb-8">
            <Image
              src="/placeholder.svg?height=150&width=150&text=Ray"
              alt="Ray Onyango"
              width={150}
              height={150}
              className="rounded-full border-4 border-primary"
            />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">SOFTWARE DEVELOPER</h1>
          <p className="text-xl max-w-2xl mb-12 text-muted-foreground">
            Hi, I'm Ray Onyango. I build exceptional digital experiences with clean, efficient code. Specializing in
            full-stack development with a focus on scalable web applications.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="#projects"
              className="inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-white hover:bg-primary/90"
            >
              VIEW MY WORK
            </Link>
            <Link
              href="#contact"
              className="inline-flex h-12 items-center justify-center rounded-md bg-zinc-900 px-6 text-sm font-medium text-white hover:bg-zinc-800"
            >
              GET IN TOUCH
            </Link>
            <Link
              href="/resume.pdf"
              className="inline-flex h-12 items-center justify-center rounded-md bg-zinc-900 px-6 text-sm font-medium text-white hover:bg-zinc-800"
            >
              <Download size={18} className="mr-2" /> RESUME
            </Link>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">FEATURED PROJECTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-Commerce API",
                description: "RESTful API for e-commerce with authentication, payment processing, and order management",
                tags: ["Node.js", "Express", "MongoDB", "JWT"],
              },
              {
                title: "Health Tracking Dashboard",
                description: "Real-time dashboard for monitoring health metrics with data visualization",
                tags: ["React", "D3.js", "Firebase", "Tailwind CSS"],
              },
              {
                title: "Inventory Management System",
                description: "Full-stack inventory system with barcode scanning and automated reporting",
                tags: ["Next.js", "PostgreSQL", "Prisma", "TypeScript"],
              },
              {
                title: "Mobile Banking App",
                description: "Secure mobile banking application with biometric authentication and transaction history",
                tags: ["React Native", "Redux", "Node.js", "OAuth"],
              },
              {
                title: "AI Content Generator",
                description: "Web application that leverages AI to generate marketing content and social media posts",
                tags: ["Python", "Flask", "OpenAI API", "React"],
              },
              {
                title: "DevOps Automation Tool",
                description: "CLI tool for automating deployment workflows and infrastructure management",
                tags: ["Go", "Docker", "AWS", "Terraform"],
              },
            ].map((project, index) => (
              <div
                key={index}
                className="bg-background rounded-lg shadow-lg overflow-hidden border border-border hover:border-primary transition-colors"
              >
                <div className="aspect-video bg-muted relative">
                  <Image
                    src={`/placeholder.svg?height=300&width=500&text=Project+${index + 1}`}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="container mx-auto py-16 px-4 bg-secondary/30 rounded-lg my-16">
          <h2 className="text-3xl font-bold mb-12 text-center">SKILLS & EXPERTISE</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">Programming Languages</h3>
              <ul className="space-y-2">
                {/* Replace these with Ray's actual programming languages from LinkedIn */}
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>JavaScript</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>TypeScript</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Python</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Java</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>HTML/CSS</span>
                </li>
                {/* Add more skills from LinkedIn */}
              </ul>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">Frameworks & Libraries</h3>
              <ul className="space-y-2">
                {/* Replace these with Ray's actual frameworks from LinkedIn */}
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>React</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Next.js</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Node.js</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Express</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Django</span>
                </li>
                {/* Add more skills from LinkedIn */}
              </ul>
            </div>

            <div className="bg-background p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">Tools & Technologies</h3>
              <ul className="space-y-2">
                {/* Replace these with Ray's actual tools from LinkedIn */}
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Git</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>Docker</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>AWS</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>MongoDB</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span>PostgreSQL</span>
                </li>
                {/* Add more skills from LinkedIn */}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="container mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">GET IN TOUCH</h2>

          <div className="max-w-md mx-auto bg-background p-8 rounded-lg shadow-lg border border-border">
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full p-2 rounded-md border border-input bg-background"
                  placeholder="Your name"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full p-2 rounded-md border border-input bg-background"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full p-2 rounded-md border border-input bg-background"
                  placeholder="Your message..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
              >
                Send Message
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex justify-center space-x-6">
                <Link href="https://github.com" className="text-foreground hover:text-primary">
                  <Github size={24} />
                </Link>
                <Link href="https://linkedin.com" className="text-foreground hover:text-primary">
                  <Linkedin size={24} />
                </Link>
                <Link href="https://twitter.com" className="text-foreground hover:text-primary">
                  <Twitter size={24} />
                </Link>
                <Link href="mailto:hello@example.com" className="text-foreground hover:text-primary">
                  <Mail size={24} />
                </Link>
              </div>
              <p className="text-center mt-4 text-muted-foreground">rayopiyo1@gmail.com</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="container mx-auto py-8 px-4 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">© {new Date().getFullYear()} Ray Onyango. All rights reserved.</p>
            <p className="text-muted-foreground mt-2 md:mt-0">Built with Next.js and Tailwind CSS</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

