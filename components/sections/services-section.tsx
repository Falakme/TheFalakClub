"use client"

import { useReveal } from "@/hooks/use-reveal"

export function ServicesSection({
  isActive,
  enterFrom,
}: {
  isActive?: boolean
  enterFrom?: "left" | "right" | null
}) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="section-swipe flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
      data-active={isActive}
      data-enter={enterFrom ?? undefined}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-12 transition-all duration-700 md:mb-16 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Mission
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Our Mission</p>
        </div>

        <p
          className={`mb-10 max-w-3xl text-sm leading-relaxed text-foreground/85 transition-all duration-700 md:text-lg ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          }`}
          style={{ transitionDelay: "120ms" }}
        >
          To create an inclusive space where coding enthusiasts can explore new technologies, work on meaningful
          projects, and build lifelong connections. We're committed to fostering innovation, encouraging collaboration,
          and preparing our members for successful careers in technology.
        </p>

        <div className="grid gap-8 md:grid-cols-3 md:gap-x-10">
          {[
            {
              title: "LEARN",
              description: "Continuous learning through workshops, mentorship, and hands-on projects",
              direction: "top",
            },
            {
              title: "BUILD",
              description: "Creating real-world applications that solve problems and make an impact",
              direction: "right",
            },
            {
              title: "CONNECT",
              description: "Networking with industry professionals and like-minded developers",
              direction: "left",
            },
          ].map((service, i) => (
            <ServiceCard key={i} service={service} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: { title: string; description: string; direction: string }
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (service.direction) {
        case "left":
          return "-translate-x-16 opacity-0"
        case "right":
          return "translate-x-16 opacity-0"
        case "top":
          return "-translate-y-16 opacity-0"
        case "bottom":
          return "translate-y-16 opacity-0"
        default:
          return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-foreground/30 transition-all duration-300 group-hover:w-12 group-hover:bg-foreground/50" />
        <span className="font-mono text-xs text-foreground/60">0{index + 1}</span>
      </div>
      <h3 className="mb-2 font-sans text-2xl font-light text-foreground md:text-3xl">{service.title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-foreground/80 md:text-base">{service.description}</p>
    </div>
  )
}
