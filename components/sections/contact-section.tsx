"use client"

import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useState } from "react"
import { Instagram } from "lucide-react"

export function ContactSection({
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
      className="section-swipe flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
      data-active={isActive}
      data-enter={enterFrom ?? undefined}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">
          <div className="flex flex-col justify-center">
            <div
              className={`mb-6 transition-all duration-700 md:mb-12 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <h2 className="mb-2 font-sans text-4xl font-light leading-[1.05] tracking-tight text-foreground md:mb-3 md:text-7xl lg:text-8xl">
                CONTACT
              </h2>
              <p className="font-mono text-xs text-foreground/60 md:text-base">/ Join The Falak Club</p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <p
                className={`max-w-xl text-sm leading-relaxed text-foreground/90 transition-all duration-700 md:text-lg ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                Whether you're a beginner or experienced developer, The Falak Club welcomes you. Join our community and
                let's build amazing things together.
              </p>
              <a
                href="https://instagram.com/falakuae"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 font-mono text-sm text-foreground/70 transition-all duration-700 hover:text-foreground ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                <Instagram className="h-4 w-4" />
                @falakuae
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div
              className={`rounded-2xl border border-foreground/10 bg-foreground/5 p-6 transition-all duration-700 md:p-8 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="mb-3 font-mono text-xs text-foreground/60">JOIN THE CLUB</div>
              <p className="mb-6 text-sm leading-relaxed text-foreground/85 md:text-base">
                Ready to collaborate, learn, and build with other ambitious developers? We'd love to have you.
              </p>
              <MagneticButton variant="primary" size="lg" className="w-full" onClick={() => setIsModalOpen(true)}>
                Join The Falak Club Today →
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="border-white/10 bg-white/10 text-foreground shadow-2xl backdrop-blur-xl p-15 w-200 h-75">
          <DialogHeader className="items-center text-center mt-10">
            <DialogTitle className="text-2xl font-light">Registrations Closed</DialogTitle>
            <DialogDescription className="text-center text-foreground/80">
              We currently aren&apos;t accepting registrations. Please check back soon.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </section>
  )
}
