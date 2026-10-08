"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useVerifyAccount, useVerifyDonor } from "@/hooks";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";

export default function VerifyAccountForm({
  mode = "requester",
}: {
  mode: "donor" | "requester";
}) {
  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const router = useRouter();

  const { mutate: verifyRequester, isPending: verifyPending } =
    useVerifyAccount();
  const { mutate: verifyDonor, isPending: verifyDonorPending } =
    useVerifyDonor();
  const verify = mode === "donor" ? verifyDonor : verifyRequester;
  const isVerifying = mode === "donor" ? verifyDonorPending : verifyPending;

  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email]);

  const handleOtp = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }
    const verifyData = {
      email,
      otp,
    };
    verify(verifyData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Server failure",
            description: "Something went wrong,  please try again later.",
            type: "error",
          });
        }
        if (mode === "donor") {
          toast.add({
            title: "Verification Successful!",
            description: "Welcome onboard!",
            type: "success",
          });
          router.push("/");
          return;
        }
        toast.add({
          title: "Verification Successful!",
          description:
            "An admin will review your application. Please allow us some time to process it, and check your email within the next few days for an update.",
          type: "success",
        });
        router.push("/");
      },
      onError: (err) => {
        toast.add({
          title: "Verification failure",
          description:
            err.message || "Something went wrong,  please try again later.",
          type: "error",
        });
      },
    });
  };
  if (!email) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verify Account</CardTitle>
        <CardDescription>
          Please enter the OTP sent to your email address.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOtp();
          }}
        >
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor="otp">OTP</FieldLabel>
            <InputOTP
              maxLength={6}
              onChange={(value) => {
                setOtp(value);
                if (isInvalid) {
                  setIsInvalid(false);
                }
              }}
              value={otp}
              autoComplete="off"
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {isInvalid && (
              <FieldError
                errors={[{ message: "Invalid OTP. Please try again" }]}
              />
            )}
          </Field>
        </form>
      </CardContent>
      <CardFooter>
        <Button disabled={isVerifying} type="submit" form="otp-form">
          {isVerifying ? <Spinner /> : "Submit"}
        </Button>
      </CardFooter>
    </Card>
  );
}
