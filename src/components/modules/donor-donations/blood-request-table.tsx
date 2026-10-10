"use client";

import { useState } from "react";
import { useGetBloodRequests } from "@/hooks";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DonationCreateDialogue from "./donation-create-dialogue";

interface BloodRequest {
  id: string;
  bloodGroup: string;
  hospitalName: string | null;
  city: string | null;
  unitsRequired: number;
  unitsFulfilled: number;
  requiredDate: string;
  urgency: string;
  status: string;
}

export default function BloodRequestTable() {
  const { data: response, isPending, isError } = useGetBloodRequests();

  const [selectedRequest, setSelectedRequest] = useState<BloodRequest | null>(
    null,
  );

  const requests = response?.data ?? [];

  if (isPending) {
    return (
      <div className="rounded-lg border p-10 text-center">
        Loading blood requests...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg border p-10 text-center text-red-600">
        Failed to load blood requests. Please try again.
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="rounded-lg border p-10 text-center text-sm text-muted-foreground">
        No blood requests found.
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Blood Group</TableHead>
              <TableHead>Hospital</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Remaining Units</TableHead>
              <TableHead>Required Date</TableHead>
              <TableHead>Urgency</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {requests.map((request: BloodRequest) => (
              <TableRow key={request.id}>
                <TableCell className="font-semibold">
                  {request.bloodGroup.replaceAll("_", " ")}
                </TableCell>

                <TableCell>{request.hospitalName ?? "Not specified"}</TableCell>

                <TableCell>{request.city ?? "Not specified"}</TableCell>

                <TableCell>
                  {request.unitsRequired - request.unitsFulfilled}
                </TableCell>

                <TableCell>
                  {new Date(request.requiredDate).toLocaleDateString()}
                </TableCell>

                <TableCell>{request.urgency}</TableCell>

                <TableCell>
                  <Button
                    disabled={
                      ![
                        "CONFIRMED",
                        "MATCHING",
                        "PARTIALLY_FULFILLED",
                      ].includes(request.status) ||
                      request.unitsFulfilled >= request.unitsRequired
                    }
                    onClick={() => setSelectedRequest(request)}
                  >
                    Donate
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedRequest && (
        <DonationCreateDialogue
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedRequest(null);
            }
          }}
          bloodRequestId={selectedRequest.id}
        />
      )}
    </>
  );
}
