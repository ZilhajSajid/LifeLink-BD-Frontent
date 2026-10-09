import DonorApprovalTabs from "@/components/modules/donor-approval/donor-approval-tabs";

export default function ApproveDonorPage() {
  return (
    <section className="p-5">
      <div>
        <h1>Donor approval</h1>
        <p>Please review and make sure the given data is verified</p>
      </div>
      <DonorApprovalTabs />
    </section>
  );
}
