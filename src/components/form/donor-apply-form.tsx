"use client";

import { useForm } from "@tanstack/react-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { FileText, FileUp, X } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  donorApplicationSchema,
  isAcceptedFileSize,
  isAcceptedFileType,
  MAX_ADDITIONAL_FILES,
  MAX_FILE_SIZE,
} from "@/validation";
import { formatFileSize } from "@/utils";
import { DonorApplicationData } from "@/types";
import { useApplyAsDonor } from "@/hooks";
import { Spinner } from "../ui/spinner";
import { toast } from "../ui/toast";

export default function DonorApplyForm() {
  const router = useRouter();
  const { mutate: apply, isPending: applyPending } = useApplyAsDonor();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      bloodGroup: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      city: "",
      certificate: null as File | null,
      additionalFiles: [] as File[],
    },
    validators: { onSubmit: donorApplicationSchema },
    onSubmit: async ({ value }) => {
      const donorData: DonorApplicationData = {
        user: {
          name: value.name.trim(),
          email: value.email.trim(),
        },
        donor: {
          bloodGroup: value.bloodGroup.trim(),
          address: value.address.trim(),
          gender: value.gender.trim(),
          dateOfBirth: value.dateOfBirth.trim(),
          city: value.city.trim(),
        },
      };

      apply(
        {
          data: donorData,
          certificate: value.certificate as File,
          additionalFiles: value.additionalFiles,
        },

        {
          onSuccess: (res) => {
            if (!res.success) {
              toast.add({
                title: "Server failure",
                description: "Something went wrong. Please try again",
                type: "error",
              });
              return;
            }
            toast.add({
              title: "Application submitted",
              description: "Please verify your account",
              type: "success",
            });
            const params = new URLSearchParams({ email: donorData.user.email });
            router.push(`/apply/verify-account?${params.toString()}`);
          },
          onError: (err) => {
            toast.add({
              title: "Application failure",
              description:
                err.message || "Something went wrong. Please try again",
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">Be a Donor</h1>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        noValidate
      >
        <FieldGroup>
          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="name">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      onChange={(e) => field.handleChange(e.target.value)}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      autoComplete="false"
                      aria-invalid={isInvalid}
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="email">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      onChange={(e) => field.handleChange(e.target.value)}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      autoComplete="false"
                      aria-invalid={isInvalid}
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="phone">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                    <div className="relative">
                      <Input
                        key={field.name}
                        name={field.name}
                        placeholder="+880 1712 345678"
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        value={field.state.value}
                        type="tel"
                        aria-invalid={isInvalid}
                        autoComplete="off"
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="address">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        onChange={(e) => field.handleChange(e.target.value)}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        autoComplete="off"
                        className="pr-10"
                        aria-invalid={isInvalid}
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <form.Field name="city">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>City</FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        onChange={(e) => field.handleChange(e.target.value)}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        autoComplete="off"
                        className="pr-10"
                        aria-invalid={isInvalid}
                      />
                    </div>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="gender">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                const items = [
                  { label: "Male", value: "MALE" },
                  { label: "Female", value: "FEMALE" },
                  { label: "Other", value: "OTHER" },
                ];
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Gender</FieldLabel>
                    <Select
                      items={items}
                      value={field.state.value}
                      onValueChange={(value) => {
                        if (value) {
                          field.handleChange(value);
                        }
                      }}
                    >
                      <SelectTrigger className="w-45">
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {items.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="bloodGroup">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                const items = [
                  { label: "A+", value: "A_POSITIVE" },
                  { label: "A-", value: "A_NEGATIVE" },
                  { label: "B+", value: "B_POSITIVE" },
                  { label: "B-", value: "B_NEGATIVE" },
                  { label: "AB+", value: "AB_POSITIVE" },
                  { label: "AB-", value: "AB_NEGATIVE" },
                  { label: "O+", value: "O_POSITIVE" },
                  { label: "O-", value: "O_NEGATIVE" },
                ];
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel>Blood Group</FieldLabel>
                    <Select
                      items={items}
                      value={field.state.value}
                      onValueChange={(value) => {
                        if (value) {
                          field.handleChange(value);
                        }
                      }}
                    >
                      <SelectTrigger className="w-45">
                        <SelectValue placeholder="Select your Blood Group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {items.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
            <form.Field name="dateOfBirth">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Date of Birth</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="date"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      aria-invalid={isInvalid}
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>
          <form.Field name="certificate">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const file = field.state.value;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Certificate</FieldLabel>
                  <div>
                    <Button
                      render={<label htmlFor="certificate-field" />}
                      nativeButton={false}
                      variant="outline"
                    >
                      <FileUp size="4" />
                      Upload certificate
                    </Button>

                    <input
                      id="certificate-field"
                      type="file"
                      className="sr-only"
                      name={field.name}
                      onChange={(e) => {
                        const selected = e.target.files?.[0] ?? null;

                        field.handleChange(selected);
                        e.target.value = "";
                      }}
                    />
                    {file ? (
                      <span className="inline-flex max-w-full items-center gap-2 rounded-lg bg-muted px-2.5 py-1 text-sm">
                        <FileText className="size-4 shrink-0 text-primary" />
                        <span className="truncate">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                        <Button
                          type="button"
                          aria-label="Remove resume"
                          variant="ghost"
                          className="text-muted-foreground transition-colors hover:text-destructive focus:outline-none"
                          onClick={() => {
                            field.handleChange(null);
                            field.handleBlur();
                          }}
                        >
                          <X className="size-4" />
                        </Button>
                      </span>
                    ) : (
                      <span>
                        Supported Files: .pdf, .doc, .docx, .jpg, .jpeg, .png
                        and size :{MAX_FILE_SIZE} MB
                      </span>
                    )}
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="additionalFiles">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const files = field.state.value;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Additional Files
                    <span className="font-normal text-muted-foreground">
                      (optional)
                    </span>
                  </FieldLabel>
                  <div>
                    <Button
                      render={<label htmlFor="additional-file-field" />}
                      nativeButton={false}
                      variant="outline"
                    >
                      <FileUp size="4" />
                      Add Files
                    </Button>

                    <input
                      id="additional-file-field"
                      type="file"
                      multiple
                      className="sr-only"
                      name={field.name}
                      onChange={(e) => {
                        const incoming = Array.from(e.target.files ?? []);

                        if (incoming.length === 0) {
                          return;
                        }

                        field.handleChange([...files, ...incoming]);
                        e.target.value = "";
                      }}
                    />
                    {files.length > 0 && (
                      <span className="text-xs text-muted-foreground">
                        {files.length} of {MAX_ADDITIONAL_FILES} added
                      </span>
                    )}
                  </div>
                  {files.length > 0 && (
                    <ul className="flex flex-col gap-2">
                      {files.map((file, index) => (
                        <li
                          key={`${file.name}-${index}`}
                          className="flex items-center justify-between gap-2 rounded-lg bg-muted px-3 py-2 text-sm"
                        >
                          <span className="flex-min-w-0 items-center gap-2">
                            <FileText className="size-4 shrink-0 text-primary" />
                            <span className="truncate">{file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </span>
                          </span>
                          <Button
                            type="button"
                            aria-label={`Remove ${file.name}`}
                            variant="ghost"
                            className="text-muted-foreground transition-colors hover:text-destructive focus:outline-none"
                            onClick={() => {
                              field.handleChange(
                                files.filter((_, i) => i !== index),
                              );
                              field.handleBlur();
                            }}
                          >
                            <X className="size-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
        </FieldGroup>
        <div className="flex justify-end w-full mt-5">
          <Button disabled={applyPending} type="submit" size="lg">
            {applyPending ? <Spinner /> : "Submit"}
          </Button>
        </div>
      </form>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Already an approved Donor?{" "}
        <Link
          href="/login"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          Sign in to the Donor Portal
        </Link>
        . Requester applications should use the{" "}
        <Link
          href="/register"
          className="font-medium underline underline-offset-4 hover:text-primary"
        >
          requester registration
        </Link>{" "}
        form instead.
      </p>
    </div>
  );
}
