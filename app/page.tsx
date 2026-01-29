"use client"

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { WorkSection } from "@/components/sections/work-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { EventsSection } from "@/components/sections/events-section"
import { ContactSection } from "@/components/sections/contact-section"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"
import { Instagram } from "lucide-react"

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [enterFrom, setEnterFrom] = useState<"left" | "right" | null>(null)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number>()
  const scrollSnapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const previousSectionRef = useRef<number | null>(null)
  const wheelAccumulatorRef = useRef(0)
  const wheelLockRef = useRef(false)

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * index,
        behavior: "smooth",
      })
      setCurrentSection(index)
    }
  }

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX
      const deltaY = touchStartY.current - touchEndY
      const deltaX = touchStartX.current - touchEndX

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < 5) {
          scrollToSection(currentSection + 1)
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchmove", handleTouchMove, { passive: false })
      container.addEventListener("touchend", handleTouchEnd, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()

        if (!scrollContainerRef.current) return

        if (wheelLockRef.current) return

        wheelAccumulatorRef.current += e.deltaY
        const threshold = 140

        if (Math.abs(wheelAccumulatorRef.current) >= threshold) {
          const direction = wheelAccumulatorRef.current > 0 ? 1 : -1
          const nextSection = Math.min(5, Math.max(0, currentSection + direction))

          if (nextSection !== currentSection) {
            wheelLockRef.current = true
            scrollToSection(nextSection)
            setTimeout(() => {
              wheelLockRef.current = false
            }, 450)
          }

          wheelAccumulatorRef.current = 0
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [currentSection])

  useEffect(() => {
    if (previousSectionRef.current !== null && previousSectionRef.current !== currentSection) {
      setEnterFrom(currentSection > previousSectionRef.current ? "right" : "left")
    }
    previousSectionRef.current = currentSection
  }, [currentSection])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = undefined
          return
        }

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const newSection = Math.round(scrollLeft / sectionWidth)

        if (newSection !== currentSection && newSection >= 0 && newSection <= 5) {
          setCurrentSection(newSection)
        }

        scrollThrottleRef.current = undefined
      })

      if (scrollSnapTimeoutRef.current) {
        clearTimeout(scrollSnapTimeoutRef.current)
      }

      scrollSnapTimeoutRef.current = setTimeout(() => {
        if (!scrollContainerRef.current) return
        const sectionWidth = scrollContainerRef.current.offsetWidth
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const targetSection = Math.round(scrollLeft / sectionWidth)
        scrollToSection(targetSection)
      }, 120)
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current)
      }
      if (scrollSnapTimeoutRef.current) {
        clearTimeout(scrollSnapTimeoutRef.current)
      }
    }
  }, [currentSection])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#1d4ed8"
            colorB="#e11d48"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#338eda"
            upColor="#338eda"
            downColor="#0f172a"
            leftColor="#ec3750"
            rightColor="#ec3750"
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-opacity duration-700 md:px-12 ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
      >
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/25">
            <span className="font-sans text-xl font-bold text-foreground"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 100 100" fill="none">
              <rect width="15" height="15" fill="" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M46.4232 36.3189H74.04C74.376 36.3189 74.544 36.3189 74.6724 36.2535C74.7853 36.196 74.8771 36.1042 74.9346 35.9913C75 35.8629 75 35.6949 75 35.3589V25.96C75 25.624 75 25.456 74.9346 25.3276C74.8771 25.2147 74.7853 25.1229 74.6724 25.0654C74.544 25 74.376 25 74.04 25H47.3832C47.0472 25 46.8792 25 46.7508 25.0654C46.6379 25.1229 46.5462 25.2147 46.4886 25.3276C46.4232 25.456 46.4232 25.624 46.4232 25.96V36.3189L37.351 27.2325C36.8368 26.7175 36.5798 26.46 36.359 26.4426C36.1675 26.4274 35.9803 26.5048 35.8555 26.6509C35.7116 26.8192 35.7116 27.1831 35.7116 27.9108V38.7303L26.6394 29.6439C26.1252 29.1289 25.8681 28.8715 25.6474 28.854C25.4559 28.8388 25.2687 28.9163 25.1438 29.0623C25 29.2307 25 29.5945 25 30.3222V40.7445C25 40.8911 25 40.9644 25.0165 41.0334C25.0312 41.0946 25.0554 41.1531 25.0882 41.2067C25.1253 41.2672 25.1771 41.3191 25.2806 41.4228L35.7116 51.8701V74.04C35.7116 74.376 35.7116 74.544 35.777 74.6724C35.8345 74.7853 35.9263 74.8771 36.0392 74.9346C36.1676 75 36.3356 75 36.6716 75H46.1312C46.4672 75 46.6352 75 46.7636 74.9346C46.8765 74.8771 46.9683 74.7853 47.0258 74.6724C47.0912 74.544 47.0912 74.376 47.0912 74.04V64.149C47.0912 63.8129 47.0912 63.6449 47.1566 63.5166C47.2141 63.4037 47.3059 63.3119 47.4188 63.2544C47.5471 63.189 47.7151 63.189 48.0512 63.189H74.04C74.376 63.189 74.544 63.189 74.6724 63.1236C74.7853 63.0661 74.8771 62.9743 74.9346 62.8614C75 62.733 75 62.565 75 62.229V52.8301C75 52.4941 75 52.326 74.9346 52.1977C74.8771 52.0848 74.7853 51.993 74.6724 51.9355C74.544 51.8701 74.376 51.8701 74.04 51.8701H35.7116L35.7116 38.7303L44.7839 47.8168C45.298 48.3317 45.5551 48.5892 45.7758 48.6067C45.9674 48.6218 46.1546 48.5444 46.2794 48.3983C46.4232 48.23 46.4232 47.8661 46.4232 47.1385V36.3189Z" fill="white" />

            </svg></span>
          </div>
          <span className="hidden font-sans text-xl font-semibold tracking-tight text-foreground sm:inline">
            The Falak Club
          </span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {["Home", "About", "Mission", "Projects", "Events", "Contact"].map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-sm font-medium transition-colors ${currentSection === index ? "text-foreground" : "text-foreground/80 hover:text-foreground"
                }`}
            >
              {item}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${currentSection === index ? "w-full" : "w-0 group-hover:w-full"
                  }`}
              />
            </button>
          ))}
        </div>

        <MagneticButton variant="secondary" onClick={() => scrollToSection(5)}>
          Join the Club
        </MagneticButton>
      </nav>

      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 flex h-screen snap-x snap-mandatory overflow-x-auto overflow-y-hidden transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"
          }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollBehavior: "smooth" }}
      >
        {/* Hero Section */}
        <section
          className="section-swipe flex min-h-screen w-screen shrink-0 snap-start flex-col justify-end px-6 pb-16 pt-24 md:px-12 md:pb-24"
          data-active={currentSection === 0}
          data-enter={enterFrom ?? undefined}
        >
          <div className="max-w-3xl">
            <div className="mb-4 inline-block animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/15 px-4 py-1.5 backdrop-blur-md duration-700">
              <p className="font-mono text-xs text-foreground/90">THE FALAK CLUB</p>
            </div>
            <h1 className="mb-6 animate-in fade-in slide-in-from-bottom-8 font-sans text-4xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-7xl lg:text-8xl">
              <span className="text-balance">CODE. <br /> COLLABORATE. <br />CREATE.</span>
            </h1>
            <p className="mb-6 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-lg leading-relaxed text-foreground/90 duration-1000 delay-200 md:text-xl">
              <span className="text-pretty">
                The Falak Club is more than just a coding community—it's a launchpad for ambitious developers who
                believe in collaboration and continuous learning.
              </span>
            </p>
            <a
              href="https://instagram.com/falakuae"
              target="_blank"
              rel="noreferrer"
              className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              <Instagram className="h-4 w-4" />
              @falakuae
            </a>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
              <MagneticButton
                size="lg"
                variant="primary"
                onClick={() => scrollToSection(5)}
              >
                Join the Club →
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(1)}>
                Learn More
              </MagneticButton>
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-500">
            <div className="flex items-center gap-2">
              <p className="font-mono text-xs text-foreground/80">Scroll to explore</p>
              <div className="flex h-6 w-12 items-center justify-center rounded-full border border-foreground/20 bg-foreground/15 backdrop-blur-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-foreground/80" />
              </div>
            </div>
          </div>
        </section>

        <AboutSection scrollToSection={scrollToSection} isActive={currentSection === 1} enterFrom={enterFrom} />
        <ServicesSection isActive={currentSection === 2} enterFrom={enterFrom} />
        <WorkSection isActive={currentSection === 3} enterFrom={enterFrom} />
        <EventsSection isActive={currentSection === 4} enterFrom={enterFrom} />
        <ContactSection isActive={currentSection === 5} enterFrom={enterFrom} />
      </div>

      <style jsx global>{`
        div::-webkit-scrollbar {
          display: none;
        }

        .section-swipe {
          will-change: transform, opacity;
        }

        .section-swipe[data-active="true"][data-enter="right"] {
          animation: swipe-in-right 520ms ease;
        }

        .section-swipe[data-active="true"][data-enter="left"] {
          animation: swipe-in-left 520ms ease;
        }

        @keyframes swipe-in-right {
          from {
            transform: translateX(6%);
            opacity: 0.55;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes swipe-in-left {
          from {
            transform: translateX(-6%);
            opacity: 0.55;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </main>
  )
}
