"use client";

import { useForm } from "@tanstack/react-form";
import { useCreateBloodRequest } from "@/hooks";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { Droplet, Loader2 } from "lucide-react";
import { CreateBloodRequestResponse } from "@/types";

const bloodGroups = [
  "A_POSITIVE",
  "A_NEGATIVE",
  "B_POSITIVE",
  "B_NEGATIVE",
  "AB_POSITIVE",
  "AB_NEGATIVE",
  "O_POSITIVE",
  "O_NEGATIVE",
];

const urgencies = ["NORMAL", "URGENT", "CRITICAL"];

export default function CreateBloodRequestForm() {
  const { mutate: createBloodRequest, isPending } = useCreateBloodRequest();

  const form = useForm({
    defaultValues: {
      bloodGroup: "O_POSITIVE",
      unitsRequired: 1,
      urgency: "NORMAL",
      hospitalName: "",
      hospitalAddress: "",
      city: "",
      requiredDate: "",
      reason: "",
    },
    onSubmit: async ({ value }) => {
      const payload = {
        ...value,
        unitsRequired: Number(value.unitsRequired),
        requiredDate: new Date(value.requiredDate).toISOString(),
      };

      createBloodRequest(payload, {
        onSuccess: (response: CreateBloodRequestResponse) => {
          const paymentUrl = response.data?.paymentUrl;

          if (!paymentUrl) {
            toast.add({
              title: "Request created",
              description:
                "The request was created, but no payment URL was returned.",
              type: "error",
            });
            return;
          }

          window.location.assign(paymentUrl);
        },
        onError: () => {
          toast.add({
            title: "Request failed",
            description:
              "Unable to create your blood request. Please try again.",
            type: "error",
          });
        },
      });
    },
  });

  const inputClass =
    "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary";

  const labelClass = "mb-2 block text-sm font-medium";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="mb-8">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Droplet className="h-6 w-6 text-primary" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight">
          Create Blood Request
        </h1>
        <p className="mt-2 text-muted-foreground">
          Provide the blood requirement details and proceed to payment.
        </p>
      </div>

      <form
        className="space-y-6 rounded-2xl border bg-background p-6 shadow-sm md:p-8"
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <form.Field
            name="bloodGroup"
            validators={{
              onChange: ({ value }) =>
                value ? undefined : "Select a blood group",
            }}
          >
            {(field) => (
              <div>
                <label className={labelClass} htmlFor={field.name}>
                  Blood Group *
                </label>
                <select
                  id={field.name}
                  className={inputClass}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                >
                  {bloodGroups.map((group) => (
                    <option key={group} value={group}>
                      {group.replace("_", " ").replace("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </form.Field>

          <form.Field
            name="unitsRequired"
            validators={{
              onChange: ({ value }) =>
                Number(value) < 1 ? "At least one unit is required" : undefined,
            }}
          >
            {(field) => (
              <div>
                <label className={labelClass} htmlFor={field.name}>
                  Units Required *
                </label>
                <input
                  id={field.name}
                  className={inputClass}
                  type="number"
                  min="1"
                  required
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) =>
                    field.handleChange(Number(event.target.value))
                  }
                />
              </div>
            )}
          </form.Field>

          <form.Field name="urgency">
            {(field) => (
              <div>
                <label className={labelClass} htmlFor={field.name}>
                  Urgency *
                </label>
                <select
                  id={field.name}
                  className={inputClass}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                >
                  {urgencies.map((urgency) => (
                    <option key={urgency} value={urgency}>
                      {urgency}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </form.Field>

          <form.Field
            name="requiredDate"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "Required date is mandatory"
                  : new Date(value).getTime() <= Date.now()
                    ? "Choose a future date and time"
                    : undefined,
            }}
          >
            {(field) => (
              <div>
                <label className={labelClass} htmlFor={field.name}>
                  Required Date & Time *
                </label>
                <input
                  id={field.name}
                  className={inputClass}
                  type="datetime-local"
                  required
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                {field.state.meta.errors.length > 0 && (
                  <p className="mt-1 text-sm text-destructive">
                    {field.state.meta.errors.join(", ")}
                  </p>
                )}
              </div>
            )}
          </form.Field>

          <form.Field name="hospitalName">
            {(field) => (
              <div>
                <label className={labelClass} htmlFor={field.name}>
                  Hospital Name *
                </label>
                <input
                  id={field.name}
                  className={inputClass}
                  placeholder="Evercare Hospital"
                  required
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              </div>
            )}
          </form.Field>

          <form.Field name="city">
            {(field) => (
              <div>
                <label className={labelClass} htmlFor={field.name}>
                  City *
                </label>
                <input
                  id={field.name}
                  className={inputClass}
                  placeholder="Dhaka"
                  required
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              </div>
            )}
          </form.Field>
        </div>

        <form.Field name="hospitalAddress">
          {(field) => (
            <div>
              <label className={labelClass} htmlFor={field.name}>
                Hospital Address *
              </label>
              <input
                id={field.name}
                className={inputClass}
                placeholder="Basundhara, Dhaka"
                required
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            </div>
          )}
        </form.Field>

        <form.Field name="reason">
          {(field) => (
            <div>
              <label className={labelClass} htmlFor={field.name}>
                Reason for Request *
              </label>
              <textarea
                id={field.name}
                className={inputClass}
                rows={4}
                placeholder="Explain why blood is needed..."
                required
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            </div>
          )}
        </form.Field>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Request...
            </>
          ) : (
            "Create Request & Proceed to Payment"
          )}
        </Button>
      </form>
    </div>
  );
}
