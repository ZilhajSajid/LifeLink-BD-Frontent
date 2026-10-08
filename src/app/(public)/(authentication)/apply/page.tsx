import Logo from "@/assets/svg/Logo";
import DonorApplyForm from "@/components/form/donor-apply-form";

import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-3">
      <div className="flex flex-col col-span-2 gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
          <Link href="/" className="flex items-center gap-2 font-medium">
            <span className="text-2xl font-bold tracking-tight">
              <span className="text-primary">Life</span>
              <span className="text-foreground">Link</span>
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xl">
            <DonorApplyForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/beADonor.png"
          alt="loginImg"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
