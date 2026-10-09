import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSuspenseGetAllDonors } from "@/hooks";
import { DonorParams } from "@/types";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface IProps extends DonorParams {
  handleReview: Dispatch<SetStateAction<string>>;
}

export default function DonorApprovalTable({
  handleReview,
  ...params
}: IProps) {
  const { data } = useSuspenseGetAllDonors(params);
  const donors = data?.data;

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Blood Group</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>City</TableHead>

            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {donors.map((donor) => (
            <TableRow key={donor.id}>
              <TableCell>{donor.user.name}</TableCell>
              <TableCell>{donor.user.email}</TableCell>
              <TableCell>{donor.bloodGroup}</TableCell>
              <TableCell>{donor.user.contactNumber ?? "-"}</TableCell>
              <TableCell>{donor.city}</TableCell>

              <TableCell className="text-right">
                {donor.user.emailVerified ? (
                  <Button
                    variant="outline"
                    onClick={() => handleReview(donor.id)}
                    disabled={donor.verificationStatus !== "PENDING"}
                  >
                    Review
                  </Button>
                ) : (
                  <Button disabled variant="outline">
                    Not Verified
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
