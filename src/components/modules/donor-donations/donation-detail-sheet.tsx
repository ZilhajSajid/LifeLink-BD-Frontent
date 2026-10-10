"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Donation } from "@/types";

interface IProps {
  donation: Donation;
  open: boolean;
  onClose: () => void;
}

export default function DonationDetailSheet({
  donation,
  open,
  onClose,
}: IProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Schedule details</SheetTitle>
          <SheetDescription>
            {new Date(donation.createdAt).toLocaleDateString(undefined, {
              dateStyle: "full",
            })}
          </SheetDescription>
        </SheetHeader>
        <dl className="mt-4 flex flex-col gap-3 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Start</dt>
            <dd>
              {new Date(donation.createdAt).toLocaleTimeString(undefined, {
                timeStyle: "short",
              })}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">End</dt>
            <dd>
              {new Date(donation.scheduledAt).toLocaleTimeString(undefined, {
                timeStyle: "short",
              })}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Status</dt>
            <dd>{donation.status}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Slots</dt>
            <dd>
              {donation.units}/{donation.units} booked
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Meeting link</dt>
          </div>
        </dl>
      </SheetContent>
    </Sheet>
  );
}
