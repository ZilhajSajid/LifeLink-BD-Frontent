"use client";

import Link from "next/link";
import { ArrowRight, Heart, Droplet, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  {
    label: "Blood Requests",
    value: "1,250+",
    icon: Droplet,
  },
  {
    label: "Registered Donors",
    value: "2,800+",
    icon: Users,
  },
  {
    label: "Hospital Network",
    value: "120+",
    icon: Building2,
  },
  {
    label: "Lives Saved",
    value: "500+",
    icon: Heart,
  },
];

export default function Hero() {
  return (
    <section className="overflow-hidden bg-gradient-to-br from-red-50 via-white to-rose-50">
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-16 md:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Hero content */}
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
              <Heart className="size-4 fill-red-600" />
              Donate Blood <span>·</span> Save Lives
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Every Drop Counts
              <span className="mt-2 block text-red-600">
                Save Lives Together
              </span>
            </h1>

            <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              LifeLink BD connects generous blood donors with people in need.
              Join our community and become part of something bigger—because
              together, we can save lives.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="rounded-full bg-red-600 px-6 hover:bg-red-700"
              >
                <Link href="/apply">
                  Become a Donor
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-slate-300 px-6"
              >
                <Link href="/requester/create-request">
                  Request Blood
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-3">
                {["A", "B", "O", "AB"].map((group) => (
                  <div
                    key={group}
                    className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-red-100 text-xs font-bold text-red-700"
                  >
                    {group}
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-600">
                Every blood group matters. <br />
                <span className="font-semibold text-slate-900">
                  Every donor makes a difference.
                </span>
              </p>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto flex min-h-[320px] w-full max-w-lg items-center justify-center sm:min-h-[440px]">
            <div className="absolute inset-8 rounded-full bg-red-100/70 blur-2xl" />

            <div className="relative flex size-64 items-center justify-center rounded-full border border-red-100 bg-white/80 shadow-xl shadow-red-100/60 sm:size-80">
              <div className="flex size-44 items-center justify-center rounded-full bg-red-50 sm:size-56">
                <Droplet className="size-32 fill-red-600 text-red-600 sm:size-40" />
                <Heart className="absolute size-12 fill-white text-white sm:size-14" />
              </div>
            </div>

            <div className="absolute right-0 top-10 rounded-2xl border border-red-100 bg-white p-4 shadow-lg sm:right-2">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-red-100 p-2 text-red-600">
                  <Heart className="size-5 fill-red-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Be a Lifesaver</p>
                  <p className="text-xs text-slate-500">
                    Your donation matters
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-0 rounded-2xl border border-red-100 bg-white p-4 shadow-lg sm:left-0">
              <p className="text-sm text-slate-500">One donation can help</p>
              <p className="text-xl font-bold text-red-600">
                Save up to 3 lives
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 gap-4 rounded-3xl border border-red-100 bg-white p-6 shadow-sm md:grid-cols-4 md:gap-6 md:p-8">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
                <Icon className="size-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-slate-900">{value}</p>
                <p className="text-xs text-slate-500 sm:text-sm">{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
