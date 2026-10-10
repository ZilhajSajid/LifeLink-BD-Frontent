import RequestList from "@/components/modules/requester/request-list";

export default function CreateBloodRequest() {
  return (
    <section className="p-5">
      <div>
        <h1 className="text-2xl">My Requests</h1>
        <p>Make Blood Requests</p>
      </div>
      <RequestList />
    </section>
  );
}
