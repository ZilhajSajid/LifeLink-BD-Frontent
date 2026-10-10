"use client";

import { useForm } from "@tanstack/react-form";
import { format } from "date-fns";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useCreateDonation } from "@/hooks";
import { toast } from "../ui/toast";

interface CreateDonationFormProps {
  bloodRequestId: string;
}

export default function CreateDonationForm({
  bloodRequestId,
}: CreateDonationFormProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const { mutate: create, isPending: createPending } = useCreateDonation();

  const form = useForm({
    defaultValues: {
      bloodRequestId,
      units: "",
      scheduledAt: "",
      time: "",
    },
    onSubmit: async ({ value }) => {
      const donationValue = {
        bloodRequestId: value.bloodRequestId,
        units: Number(value.units),
        scheduledAt: new Date(
          `${value.scheduledAt}T${value.time}:00`,
        ).toISOString(),
      };

      create(donationValue, {
        onSuccess: () => {
          toast.add({
            title: "Created",
            description: "Donation assigned successfully",
            type: "success",
          });
        },
        onError: () => {
          toast.add({
            title: "Failed",
            description: "Donation failed to create",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-5"
    >
      <div className="rounded-md border bg-muted/30 p-3">
        <p className="text-sm text-muted-foreground">Selected Blood Request</p>
        <p className="break-all text-sm font-medium">{bloodRequestId}</p>
      </div>

      <FieldGroup>
        <form.Field
          name="units"
          validators={{
            onChange: ({ value }) =>
              !value
                ? "Please select the number of units."
                : Number(value) < 1
                  ? "Units must be at least 1."
                  : undefined,
          }}
        >
          {(field) => (
            <Field>
              <FieldLabel>Number of Units</FieldLabel>

              <Select
                value={field.state.value}
                onValueChange={(value) => {
                  if (value !== null) field.handleChange(value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select units" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">1 unit</SelectItem>
                    <SelectItem value="2">2 units</SelectItem>
                    <SelectItem value="3">3 units</SelectItem>
                    <SelectItem value="4">4 units</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
            </Field>
          )}
        </form.Field>

        <form.Field
          name="scheduledAt"
          validators={{
            onChange: ({ value }) =>
              !value ? "Please select a donation date." : undefined,
          }}
        >
          {(field) => (
            <Field>
              <FieldLabel>Donation Date</FieldLabel>

              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger
                  render={
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    />
                  }
                >
                  {field.state.value
                    ? format(new Date(`${field.state.value}T12:00:00`), "PPP")
                    : "Pick a donation date"}
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={
                      field.state.value
                        ? new Date(`${field.state.value}T12:00:00`)
                        : undefined
                    }
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    onSelect={(date) => {
                      if (date) {
                        field.handleChange(format(date, "yyyy-MM-dd"));
                        setCalendarOpen(false);
                      }
                    }}
                  />
                </PopoverContent>
              </Popover>

              <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
            </Field>
          )}
        </form.Field>

        <form.Field
          name="time"
          validators={{
            onChange: ({ value }) =>
              !value ? "Please select a donation time." : undefined,
          }}
        >
          {(field) => (
            <Field>
              <FieldLabel>Donation Time</FieldLabel>

              <Input
                type="time"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />

              <FieldError>{field.state.meta.errors.join(", ")}</FieldError>
            </Field>
          )}
        </form.Field>
      </FieldGroup>

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {([canSubmit, isSubmitting]) => (
          <Button
            type="submit"
            className="w-full"
            disabled={!canSubmit || isSubmitting || createPending}
          >
            {createPending ? "Creating Donation..." : "Create Donation"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
