"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DonorApprovalTable from "./donor-approval-table";
import { Suspense, useState } from "react";
import DonorApprovalTableLoading from "./donor-approval-table-loading";
import { DonorParams, DonorVerificationStatus } from "@/types";
import { Input } from "@/components/ui/input";
import DonorReviewSheet from "./donor-review-sheet";

const verificationStatus: ["ALL" | DonorVerificationStatus, string][] = [
  ["APPROVED", "Approved"],
  ["PENDING", "Pending"],
  ["REJECTED", "Rejected"],
  ["ALL", "All"],
];

export default function DonorApprovalTabs() {
  const [tab, setTab] = useState<"ALL" | DonorVerificationStatus>("ALL");
  const [selectedId, setSelectedId] = useState("");

  const queryParams: DonorParams = {
    page: 1,
    limit: 10,
    ...(tab === "ALL" ? {} : { verificationStatus: tab }),
  };

  return (
    <>
      <div className="flex justify-between my-5">
        <div>
          <Input type="search" placeholder="Search by name or email" />
        </div>
        <Tabs value={tab} onValueChange={(value) => setTab(value)}>
          <TabsList>
            {verificationStatus.map(([value, label]) => (
              <TabsTrigger key={value} value={value}>
                {label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <Suspense fallback={<DonorApprovalTableLoading />}>
        <DonorApprovalTable {...queryParams} handleReview={setSelectedId} />
      </Suspense>

      <DonorReviewSheet
        selectedId={selectedId}
        onClose={() => setSelectedId("")}
        {...queryParams}
      />
    </>
  );
}
