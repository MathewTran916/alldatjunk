import { Navbar } from "@/components/navbar"
import { HeroForm } from "@/components/hero-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Building2, Truck, CheckCircle, Phone, Mail, Facebook, Instagram, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {/* Hero Section - Two Column Layout */}
        <section className="relative min-h-[85vh] flex items-center" id="contact">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/design-mode/trailer-with-truck-2.png"
              alt="All Dat Junk truck and trailer"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />
          </div>

          <div className="container relative z-10 mx-auto px-4 py-16">
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Left Column - Hero Text */}
              <div className="space-y-6">
                <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-lg">
                  Junk Removal & Trailer Rental
                </h1>
                <p className="text-pretty text-xl text-white md:text-2xl drop-shadow-lg">
                  Professional service across Northern California
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-white">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-accent drop-shadow-lg" />
                    <span className="text-lg drop-shadow-lg">Fast, reliable junk removal</span>
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-accent drop-shadow-lg" />
                    <span className="text-lg drop-shadow-lg">Affordable trailer rentals</span>
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-accent drop-shadow-lg" />
                    <span className="text-lg drop-shadow-lg">Licensed & insured</span>
                  </li>
                  <li className="flex items-center gap-3 text-white">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-accent drop-shadow-lg" />
                    <span className="text-lg drop-shadow-lg">Free estimates</span>
                  </li>
                </ul>
              </div>

              {/* Right Column - Form Card */}
              <div>
                <Card className="border-2 border-accent/20 bg-background shadow-2xl">
                  <CardHeader className="pb-2 space-y-1">
                    <CardTitle className="text-2xl">Get Your Free Estimate</CardTitle>
                    <CardDescription className="text-xs">
                      Upload photos of your junk and we'll respond quickly
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0 pb-4">
                    <HeroForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-secondary/30 py-16 md:py-24" id="services">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">What We Do</h2>
              <p className="mb-12 text-pretty text-lg leading-relaxed text-muted-foreground">
                Whether you need a quick curbside pickup or a full property clean-out, All Dat Junk has you covered.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative aspect-video">
                  <Image
                    src="/images/design-mode/before-1.png"
                    alt="Cluttered garage full of junk"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Trash2 className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Residential Junk Removal</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Furniture, appliances, garage clean-outs, yard waste, and more. We handle the heavy lifting so you
                    don't have to.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative aspect-video">
                  <Image
                    src="/images/design-mode/before-2.png"
                    alt="Construction debris and materials scattered"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Building2 className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Commercial Junk & Debris Removal</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Offices, retail spaces, construction sites, and rental turnovers. Fast, professional, and on
                    schedule.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative aspect-video">
                  <Image
                    src="/images/img-0743.jpg"
                    alt="Trailer with bed tilted for dumping"
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                    <Truck className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Trailer Rental</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Prefer to load it yourself? Rent a trailer, fill it at your own pace, and we'll haul it away.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-accent py-16 text-accent-foreground md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-12 text-balance text-3xl font-bold tracking-tight md:text-4xl">
                What Our Customers Say
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="grid grid-cols-2 gap-1">
                  <div className="relative aspect-video">
                    <Image src="/before-1.png" alt="Before - Cluttered garage" fill className="object-cover" />
                    <div className="absolute bottom-2 left-2 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      BEFORE
                    </div>
                  </div>
                  <div className="relative aspect-video">
                    <Image src="/after-1.png" alt="After - Clean garage" fill className="object-cover" />
                    <div className="absolute bottom-2 right-2 rounded bg-green-600 px-2 py-1 text-xs font-bold text-white">
                      AFTER
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <div className="mb-2 text-4xl text-accent">"</div>
                  <CardDescription className="text-base leading-relaxed text-foreground">
                    All Dat Junk made my garage cleanout so easy! They were professional, on time, and the pricing was
                    fair. Highly recommend!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">Jessica R.</p>
                  <p className="text-sm text-muted-foreground">Homeowner in Sacramento</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="grid grid-cols-2 gap-1">
                  <div className="relative aspect-video">
                    <Image
                      src="/images/design-mode/before-2.png"
                      alt="Before - Construction debris scattered everywhere"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-2 left-2 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      BEFORE
                    </div>
                  </div>
                  <div className="relative aspect-video">
                    <Image
                      src="/images/design-mode/after-2.png"
                      alt="After - Clean construction site"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-2 right-2 rounded bg-green-600 px-2 py-1 text-xs font-bold text-white">
                      AFTER
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <div className="mb-2 text-4xl text-accent">"</div>
                  <CardDescription className="text-base leading-relaxed text-foreground">
                    We use All Dat Junk for all our construction debris removal. Fast, reliable, and always
                    professional. Great service!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">Michael T.</p>
                  <p className="text-sm text-muted-foreground">Contractor in Roseville</p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden transition-shadow hover:shadow-lg">
                <div className="grid grid-cols-2 gap-1">
                  <div className="relative aspect-video">
                    <Image
                      src="/images/973c16fc-f7e5-4f11-beaf.jpeg"
                      alt="Before - Large pile of gravel in driveway"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-2 left-2 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      BEFORE
                    </div>
                  </div>
                  <div className="relative aspect-video">
                    <Image
                      src="/images/img-3020.jpg"
                      alt="After - Clean driveway with All Dat Junk trailer loaded with gravel"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-2 right-2 rounded bg-green-600 px-2 py-1 text-xs font-bold text-white">
                      AFTER
                    </div>
                  </div>
                </div>

                <CardHeader>
                  <div className="mb-2 text-4xl text-accent">"</div>
                  <CardDescription className="text-base leading-relaxed text-foreground">
                    The trailer rental option was perfect for our office move. We loaded at our own pace and they picked
                    it up on schedule.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold">Sarah L.</p>
                  <p className="text-sm text-muted-foreground">Business Owner in Elk Grove</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Service Area Section */}
        <section className="bg-secondary/30 py-16 md:py-24" id="service-area">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">Service Area</h2>
              <p className="mb-12 text-pretty text-lg leading-relaxed text-muted-foreground">
                Based in the Sacramento area, All Dat Junk serves homeowners, renters, contractors, and business owners
                across Northern California.
              </p>
            </div>

            <div className="mx-auto max-w-5xl">
              <div className="grid gap-8 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Areas We Serve</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid grid-cols-2 gap-3">
                      {[
                        "Sacramento",
                        "Elk Grove",
                        "Roseville",
                        "Citrus Heights",
                        "Rancho Cordova",
                        "Woodland",
                        "Davis",
                        "Fairfield",
                        "Folsom",
                        "Rocklin",
                        "Lincoln",
                        "Auburn",
                      ].map((city, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-accent" />
                          <span className="text-sm">{city}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-sm text-muted-foreground">And surrounding communities</p>
                  </CardContent>
                </Card>

                <Card className="flex flex-col justify-center bg-background text-foreground">
                  <CardContent className="py-8 text-center">
                    <h3 className="mb-3 text-xl font-bold">Ready for Your Free Estimate?</h3>
                    <p className="mb-6 leading-relaxed text-muted-foreground">
                      Upload your photos and we'll respond as quickly as possible with a no-obligation quote.
                    </p>
                    <Button asChild size="lg" className="mb-4 min-w-[240px]">
                      <a href="#contact">
                        Upload Photos & Get My Free Estimate
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </a>
                    </Button>
                    <p className="text-sm">
                      Prefer to talk to someone?{" "}
                      <a href="tel:2792829386" className="font-semibold underline">
                        Call us at (279) 282-9386
                      </a>
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-primary py-6 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {/* Company Info */}
            <div>
              <h3 className="mb-2 text-lg font-bold">All Dat Junk</h3>
              <p className="text-sm leading-relaxed opacity-90">
                Professional junk removal and trailer rental services across Northern California.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide">Quick Links</h3>
              <ul className="space-y-1">
                <li>
                  <a href="#services" className="text-sm opacity-90 transition-opacity hover:opacity-100">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-sm opacity-90 transition-opacity hover:opacity-100">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide">Contact</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4" />
                  <a href="tel:2792829386" className="opacity-90 hover:opacity-100">
                    (279) 282-9386
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:alldatjunk.916@gmail.com" className="opacity-90 hover:opacity-100">
                    alldatjunk.916@gmail.com
                  </a>
                </li>
              </ul>
              <div className="mt-3 flex gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-primary-foreground/10 pt-6 text-center">
            <p className="text-sm opacity-75">
              © {new Date().getFullYear()} All Dat Junk. All rights reserved. Licensed & Insured.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
