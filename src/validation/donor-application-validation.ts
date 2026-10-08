import z from "zod";

export const MAX_FILE_SIZE = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024;

export const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "image/png",
  "image/jpeg",
];

export const MAX_ADDITIONAL_FILES = 5;

export function isAcceptedFileSize(fileSize: number) {
  return fileSize <= MAX_FILE_SIZE_BYTES;
}

export function isAcceptedFileType(fileType: string) {
  return ACCEPTED_FILE_TYPES.includes(fileType);
}

export const getCustomFileSchema = <T>(message: string) =>
  z.custom<T>(
    (value) =>
      value === null ||
      (value instanceof File &&
        isAcceptedFileSize(value.size) &&
        isAcceptedFileType(value.type)),
    {
      message: message,
    },
  );

export const donorApplicationSchema = z.object({
  name: z.string().trim().min(3, "Full name must be 3 or more characters long"),
  email: z.email("please enter a valid email address"),
  phone: z
    .string()
    .refine((val) => val === "" || /^(?:\+?880|0)1[3-9]\d{8}$/.test(val), {
      message: "Please provide valid Bangladeshi number",
    }),
  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters long"),
  city: z.string().trim().min(2, "City is required"),
  bloodGroup: z
    .string()
    .refine(
      (value) =>
        [
          "A_POSITIVE",
          "A_NEGATIVE",
          "B_POSITIVE",
          "B_NEGATIVE",
          "AB_POSITIVE",
          "AB_NEGATIVE",
          "O_POSITIVE",
          "O_NEGATIVE",
        ].includes(value),
      {
        message: "Please select your blood group",
      },
    ),

  gender: z
    .string()
    .refine((value) => ["MALE", "FEMALE", "OTHER"].includes(value), {
      message: "Please select your gender",
    }),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((date) => !Number.isNaN(new Date(date).getTime()), {
      message: "Please enter a valid date of birth",
    })
    .refine((date) => new Date(date) < new Date(), {
      message: "Date of birth cannot be in the future",
    }),
  certificate: getCustomFileSchema<File | null>(
    `Certificate must be a pdf, doc, docx or an image file under ${MAX_FILE_SIZE} MB`,
  ).refine((value) => value instanceof File, {
    message: "A certificate or blood report is required",
  }),
  additionalFiles: z
    .array(z.custom<File>((value) => value instanceof File))
    .max(MAX_ADDITIONAL_FILES, {
      message: `You can attach at most ${MAX_ADDITIONAL_FILES} supporting documents`,
    })
    .refine(
      (files) =>
        files.every(
          (file) =>
            isAcceptedFileSize(file.size) && isAcceptedFileType(file.type),
        ),
      {
        message: `Each file must be a pdf, doc, docx or an image file under ${MAX_FILE_SIZE} MB`,
      },
    ),
});
