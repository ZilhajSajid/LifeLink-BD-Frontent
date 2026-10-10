import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Droplet, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-6 py-16">
      <div className="mx-auto w-full max-w-2xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <Droplet className="h-12 w-12 fill-primary text-primary" />
        </div>

        {/* Error Code */}
        <p className="text-8xl font-extrabold tracking-tight text-primary sm:text-9xl">
          404
        </p>

        {/* Heading */}
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
          Oops! Page Not Found
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted-foreground">
          The page you are looking for doesn't exist or may have been moved.
          Don't worry, let's get you back on the right track.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" render={<Link href="/" />} nativeButton={false}>
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>

          <Button
            size="lg"
            variant="outline"
            render={<Link href="/about-us" />}
            nativeButton={false}
          >
            <Search className="mr-2 h-4 w-4" />
            Explore LifeLink
          </Button>
        </div>

        {/* Footer Message */}
        <div className="mt-12 border-t pt-6">
          <p className="text-sm text-muted-foreground">
            Every drop matters. Every life counts.
          </p>
          <p className="mt-1 text-sm font-semibold text-primary">LifeLink BD</p>
        </div>
      </div>
    </main>
  );
}
