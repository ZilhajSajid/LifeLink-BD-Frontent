import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { useApproveDonor, useGetAllDonors } from "@/hooks";
import { ApproveDonorPayload, DonorParams } from "@/types";
import { BadgeCheck, Heart, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";

interface IProps extends DonorParams {
  selectedId: string;
  onClose: () => void;
}

export default function DonorReviewSheet({
  selectedId,
  onClose,
  ...params
}: IProps) {
  const [confirmRejection, setConfirmRejection] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const { data } = useGetAllDonors(params);
  const { mutate: approve, isPending: approvePending } = useApproveDonor();

  const selectedDonor = data?.data?.find((donor) => donor.id === selectedId);

  const isAlreadyApproved =
    selectedDonor?.verificationStatus === "APPROVED" &&
    selectedDonor?.user.emailVerified === true;

  const handleClose = () => {
    setConfirmRejection(false);
    setRejectionReason("");
    onClose();
  };

  const handleReviewAction = (status: "APPROVED" | "REJECTED") => {
    const reviewData: ApproveDonorPayload = {
      donorId: selectedId,
      verificationStatus: status,
      rejectionReason: rejectionReason,
    };
    approve(reviewData, {
      onSuccess: (res) => {
        console.log(res);
        toast.add({
          title: "Approved",
          description: "Congratulations! You are an approved donor.",
          type: "success",
        });
        handleClose();
      },
      onError: (err) => {
        toast.add({
          title: "verification failed",
          description:
            err.message || "Something went wrong,  please try again later.",
          type: "error",
        });
      },
    });
  };

  return (
    <Sheet open={!!selectedId} onOpenChange={handleClose}>
      <SheetContent side="left" className="gap-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle>Review donor application</SheetTitle>
          <SheetDescription>
            Verify the details below before approving or rejecting. This action
            cannot be undone.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
          {/* Donor Information */}
          <div className="flex items-start gap-3">
            <span className="rounded-full bg-primary/10 p-2.5">
              <Heart className="size-5 text-primary" />
            </span>

            <div className="min-w-0">
              <p className="truncate font-semibold">
                {selectedDonor?.user.name ?? "—"}
              </p>
              <p className="text-sm text-muted-foreground">Blood Donor</p>
            </div>
          </div>

          <Separator />

          {/* Contact Information */}
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Contact
            </p>

            <div className="flex items-center gap-2 text-sm">
              <Mail className="size-4 shrink-0 text-muted-foreground" />
              <span
                className="truncate"
                title={selectedDonor?.user.email ?? ""}
              >
                {selectedDonor?.user.email ?? "—"}
              </span>
            </div>
          </div>

          <Separator />

          {/* Donor Details */}
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Donor Details
            </p>

            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">Blood group</span>
              <span className="font-medium">
                {selectedDonor?.bloodGroup ?? "—"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">Gender</span>
              <span className="font-medium">
                {selectedDonor?.gender ?? "—"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">Date of birth</span>
              <span className="font-medium">
                {selectedDonor?.dateOfBirth
                  ? new Date(selectedDonor.dateOfBirth).toLocaleDateString()
                  : "—"}
              </span>
            </div>

            <div className="flex items-start justify-between gap-3 text-sm">
              <span className="shrink-0 text-muted-foreground">Address</span>
              <span className="text-right font-medium">
                {selectedDonor?.address ?? "—"}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-muted-foreground">City</span>
              <span className="font-medium">{selectedDonor?.city ?? "—"}</span>
            </div>
          </div>

          <Separator />

          {/* Verification */}
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Verification
            </p>

            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="size-4 shrink-0 text-muted-foreground" />
              <span>
                {selectedDonor?.verificationStatus ?? "Pending review"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <BadgeCheck className="size-4 shrink-0 text-muted-foreground" />
              <span>
                {selectedDonor?.user.emailVerified
                  ? "Email verified"
                  : "Email not verified"}
              </span>
            </div>
          </div>
        </div>

        <SheetFooter className="border-t">
          {isAlreadyApproved ? (
            <div className="flex w-full items-center justify-center gap-2 rounded-md bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
              <BadgeCheck className="size-5" />
              Donor approved and email verified
            </div>
          ) : confirmRejection ? (
            <div className="flex w-full flex-col gap-3">
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Tell the donor why this application is being rejected…"
                rows={4}
                disabled={approvePending}
                autoFocus
              />

              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setConfirmRejection(false);
                    setRejectionReason("");
                  }}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  disabled={approvePending}
                >
                  Cancel
                </Button>

                <Button
                  onClick={() => handleReviewAction("REJECTED")}
                  variant="destructive"
                  size="lg"
                  className="flex-1"
                  disabled={!rejectionReason.trim() || approvePending}
                >
                  {approvePending && <Spinner />}
                  {approvePending ? "Rejecting…" : "Confirm Rejection"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex w-full gap-2">
              <Button
                onClick={() => setConfirmRejection(true)}
                variant="destructive"
                size="lg"
                className="flex-1"
                disabled={approvePending}
              >
                Reject
              </Button>

              <Button
                onClick={() => handleReviewAction("APPROVED")}
                variant="default"
                size="lg"
                className="flex-1"
                disabled={approvePending}
              >
                {approvePending && <Spinner />}
                {approvePending ? "Approving…" : "Approve"}
              </Button>
            </div>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
