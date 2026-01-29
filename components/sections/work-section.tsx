"use client"

import { useReveal } from "@/hooks/use-reveal"

export function WorkSection({
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
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-2 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Projects
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ Latest projects</p>
        </div>

        <div
          className={`max-w-3xl rounded-2xl border border-foreground/10 bg-foreground/5 p-6 transition-all duration-700 md:p-8 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <div className="mb-3 font-mono text-xs text-foreground/60">ERROR</div>
          <h3 className="mb-2 font-sans text-2xl font-light text-foreground md:text-3xl">An Error has Occured</h3>
          <p className="mb-6 text-sm leading-relaxed text-foreground/80 md:text-base">
           An unexpected error has occurred while fetching the projects. Please try again later. 
          </p>
          <div className="font-mono text-sm text-foreground/60">Error ID: 647B</div>
        </div>
      </div>
    </section>
  )
}
