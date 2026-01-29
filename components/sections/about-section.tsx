"use client"

import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"

export function AboutSection({
  scrollToSection,
  isActive,
  enterFrom,
}: {
  scrollToSection?: (index: number) => void
  isActive?: boolean
  enterFrom?: "left" | "right" | null
}) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="section-swipe flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
      data-active={isActive}
      data-enter={enterFrom ?? undefined}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Left side - Story */}
          <div>
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
              }`}
            >
              <h2 className="mb-3 font-sans text-3xl font-light leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-6xl lg:text-7xl">
                ABOUT
                <br />
                <span className="text-foreground/40">The Falak Club</span>
              </h2>
            </div>

            <div
              className={`space-y-3 transition-all duration-700 md:space-y-4 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="max-w-md text-sm leading-relaxed text-foreground/90 md:text-lg">
                The Falak Club is more than just a coding community—it's a launchpad for ambitious developers. We bring
                together passionate individuals who believe in the power of collaboration and continuous learning.
              </p>
            </div>

            
          </div>

          {/* Right side - Stats with creative layout */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-12">
            {[
              { value: "150+", label: "Active Members", sublabel: "Community builders", direction: "right" },
              { value: "35+", label: "Contributors", sublabel: "Collaborating together", direction: "left" },
              { value: "5+", label: "Completed Projects", sublabel: "Shipped by members", direction: "right" },
              { value: "15+", label: "Awards Won", sublabel: "Across our work", direction: "left" },
            ].map((stat, i) => {
              const getRevealClass = () => {
                if (!isVisible) {
                  return stat.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
                }
                return "translate-x-0 opacity-100"
              }

              return (
                <div
                  key={i}
                  className={`flex items-baseline gap-4 border-l border-foreground/30 pl-4 transition-all duration-700 md:gap-8 md:pl-8 ${getRevealClass()}`}
                  style={{
                    transitionDelay: `${300 + i * 150}ms`,
                    marginLeft: i % 2 === 0 ? "0" : "auto",
                    maxWidth: i % 2 === 0 ? "100%" : "85%",
                  }}
                >
                  <div className="text-3xl font-light text-foreground md:text-6xl lg:text-7xl">{stat.value}</div>
                  <div>
                    <div className="font-sans text-base font-light text-foreground md:text-xl">{stat.label}</div>
                    <div className="font-mono text-xs text-foreground/60">{stat.sublabel}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className={`flex flex-wrap gap-3 transition-all duration-700 md:gap-4 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "750ms" }}
        >
          <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection?.(5)}>
            Join the Club →
          </MagneticButton>
          <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection?.(3)}>
            View Projects
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
