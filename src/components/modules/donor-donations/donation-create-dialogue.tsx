"use client";

import CreateDonationForm from "@/components/form/create-donation-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DonationCreateDialogueProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bloodRequestId: string;
}

export default function DonationCreateDialogue({
  open,
  onOpenChange,
  bloodRequestId,
}: DonationCreateDialogueProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Make Donation</DialogTitle>
          <DialogDescription>
            Your donation offer will be associated with the selected blood
            request.
          </DialogDescription>
        </DialogHeader>

        <CreateDonationForm
          key={bloodRequestId}
          bloodRequestId={bloodRequestId}
        />
      </DialogContent>
    </Dialog>
  );
}