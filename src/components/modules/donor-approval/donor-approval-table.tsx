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
import TablePagination from "@/components/ui/table-pagination";
import { SearchX } from "lucide-react";

interface IProps extends DonorParams {
  handleReview: Dispatch<SetStateAction<string>>;
  handlePageChange: Dispatch<SetStateAction<number>>;
}

export default function DonorApprovalTable({
  handleReview,
  handlePageChange,
  ...params
}: IProps) {
  const { data } = useSuspenseGetAllDonors(params);
  const donors = data?.data;

  const totalPages = data?.meta?.totalPages ?? 0;
  const isEmpty = donors.length === 0;

  return (
    <>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Blood Group</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>City</TableHead>

              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isEmpty ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={6}>
                  <div className="flex flex-col items-center justify-center gap-2 px-6 py-12 text-center">
                    <span className="rounded-full bg-muted p-3">
                      <SearchX className="size-5 text-muted-foreground" />
                    </span>
                    <p className="font-medium">No donors found</p>
                    <p className="max-w-sm text-sm text-muted-foreground">
                      {params.searchTerm
                        ? `No results for "${params.searchTerm}". Try a different name or email.`
                        : "There are no donors in this view yet."}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              donors.map((donor) => (
                <TableRow key={donor.id}>
                  <TableCell className="font-medium">
                    {donor.user.name}
                  </TableCell>

                  <TableCell
                    className="max-w-55 truncate"
                    title={donor.user.email}
                  >
                    {donor.user.email}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {donor.bloodGroup}
                  </TableCell>
                  <TableCell>
                    {donor.dateOfBirth
                      ? new Date(donor.dateOfBirth).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>{donor.city}</TableCell>
                  <TableCell className="text-right">
                    {donor.user.emailVerified ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReview(donor.id)}
                        disabled={donor.verificationStatus !== "PENDING"}
                      >
                        Review
                      </Button>
                    ) : (
                      <Button disabled variant="outline" size="sm">
                        Not Verified
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <div className="my-5">
          <TablePagination
            page={params.page ?? 1}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
}
