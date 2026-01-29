"use client"

import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"

export function EventsSection({
  isActive,
  enterFrom,
}: {
  isActive?: boolean
  enterFrom?: "left" | "right" | null
}) {
  const { ref, isVisible } = useReveal(0.3)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
            Events
          </h2>
          <p className="font-mono text-sm text-foreground/60 md:text-base">/ What's happening</p>
        </div>

        <div
          className={`max-w-3xl rounded-2xl border border-foreground/10 bg-foreground/5 p-6 transition-all duration-700 md:p-8 ${
            isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
          }`}
          style={{ transitionDelay: "150ms" }}
        >
          <div className="mb-3 font-mono text-xs text-foreground/60">EVENTS</div>
          <h3 className="mb-2 font-sans text-2xl font-light text-foreground md:text-3xl">Open-Source Workshop</h3>
          <p className="mb-6 text-sm leading-relaxed text-foreground/80 md:text-base">
            A hands-on intro to open-source collaboration: Git workflows, issue triage, meaningful PRs, and respectful
            code reviews. Bring a laptop and a GitHub account—everything else is guided.
          </p>
          <div className="mb-6 grid gap-3 text-sm text-foreground/80">
            
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">Focus: first PR, docs fixes, and small bugs.</div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">Includes: repo setup, branching, and clean commit history.</div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-3">Ideal for beginners and first-time contributors.</div>
          </div>
          <div className="space-y-2 text-xs text-foreground/50">
            <div>March 25, 2025 • 1:00 PM</div>
            <div>Multipurpose Hall, GEMS Our Own Indian School, Al Quoz, Dubai</div>
            <div>Ages 14+</div>
          </div>
          <button disabled className="mt-4 rounded-lg border border-foreground/20 bg-foreground/5 px-4 py-2 text-sm text-foreground/60 cursor-not-allowed opacity-50">
            Registrations opening soon
          </button>
        </div>
          </div>
    </section>
  )
}
