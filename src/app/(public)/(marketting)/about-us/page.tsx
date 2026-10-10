"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Users,
  Droplet,
  ShieldCheck,
  ArrowRight,
  HeartHandshake,
  Target,
  Globe,
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Compassion First",
    description:
      "We believe a small act of kindness can make a life-changing difference. Every blood donation is an opportunity to save a life.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Safety",
    description:
      "We aim to build a reliable platform where donors and requesters can connect with greater confidence and transparency.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "We bring people together to build a supportive community that responds when someone urgently needs blood.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create a Request",
    description:
      "Share the required blood group, hospital details, location, and urgency of the blood request.",
  },
  {
    number: "02",
    title: "Connect with Donors",
    description:
      "Help potential donors discover blood donation needs and find opportunities to support others.",
  },
  {
    number: "03",
    title: "Make a Difference",
    description:
      "Coordinate with suitable donors and take the next step toward meeting the patient's blood needs.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary/5">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background px-4 py-2 text-sm font-medium text-primary">
              <Heart className="h-4 w-4 fill-current" />
              Every Drop Matters
            </span>

            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Connecting Hearts,
              <span className="mt-2 block text-primary">Saving Lives.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
              LifeLink BD is a blood donation and emergency support platform
              designed to connect blood donors with people who need blood.
              Because when every second counts, the right connection matters.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                size="lg"
                render={<Link href="/apply" />}
                nativeButton={false}
              >
                Become a Donor
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                render={<Link href="/login" />}
                nativeButton={false}
              >
                Get Started
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute inset-8 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative rounded-3xl border bg-background p-8 shadow-xl md:p-12">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                <Droplet className="h-14 w-14 fill-primary text-primary" />
              </div>

              <h2 className="mt-6 text-center text-2xl font-bold">
                Be Someone&apos;s Lifeline
              </h2>

              <p className="mt-3 text-center leading-7 text-muted-foreground">
                Your willingness to donate blood could give another person more
                time, more hope, and another chance at life.
              </p>

              <div className="mt-8 flex items-center justify-center gap-3 rounded-2xl bg-primary/5 p-4">
                <HeartHandshake className="h-8 w-8 text-primary" />
                <p className="text-sm font-medium">
                  One community. One mission. Saving lives together.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="font-semibold text-primary">WHO WE ARE</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
            Driven by Humanity, Connected by Life
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            We want to make finding blood donors easier by bringing people
            together through technology and a shared commitment to helping
            others.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border p-8 transition-shadow hover:shadow-lg md:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <Target className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mt-6 text-2xl font-bold">Our Mission</h3>
            <p className="mt-4 leading-7 text-muted-foreground">
              To simplify blood donation coordination by connecting donors and
              requesters through an accessible, organized, and community-focused
              digital platform.
            </p>
          </div>

          <div className="rounded-2xl border p-8 transition-shadow hover:shadow-lg md:p-10">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
              <Globe className="h-7 w-7 text-primary" />
            </div>
            <h3 className="mt-6 text-2xl font-bold">Our Vision</h3>
            <p className="mt-4 leading-7 text-muted-foreground">
              To help build a future where people can find blood donation
              support more easily and where communities are better prepared to
              respond to urgent needs across Bangladesh.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/40">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="font-semibold text-primary">OUR VALUES</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              What We Stand For
            </h2>
            <p className="mt-4 text-muted-foreground">
              The principles behind every connection we help create.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-2xl border bg-background p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{value.title}</h3>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="font-semibold text-primary">HOW IT WORKS</p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Turning Connections Into Hope
          </h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            A straightforward way to help people coordinate blood donation
            requests.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="relative">
              <span className="text-5xl font-bold text-primary/20">
                {step.number}
              </span>
              <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-7xl rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground md:px-16 md:py-20">
          <Droplet className="mx-auto h-12 w-12 fill-current" />
          <h2 className="mt-5 text-3xl font-bold md:text-4xl">
            Be the Reason Someone Smiles Again
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 opacity-90">
            Join the LifeLink BD community. Become a donor, spread awareness,
            and help connect people with the support they need.
          </p>
          <Button
            className="mt-8 bg-background text-foreground hover:bg-background/90"
            size="lg"
            render={<Link href="/apply" />}
            nativeButton={false}
          >
            Join as a Donor
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </main>
  );
}
