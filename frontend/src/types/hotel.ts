import { z } from "zod";

// HOTEL DATA
export const HotelData = z.object({
  _id: z.string(),
  userId: z.string(),
  name: z.string().trim().min(1, { message: "Name is required" }),
  city: z.string().trim().min(1, { message: "City is required" }),
  country: z.string().trim().min(1, { message: "Country is required" }),
  description: z.string().trim().min(1, { message: "Description is required" }),
  type: z.string().trim().min(1, { message: "Type is required" }),
  facilities: z
    .array(z.string().trim())
    .min(1, { message: "At least one facility should be chosen" }),
  adultCount: z.coerce.number().int().positive(),
  childCount: z.coerce.number().int().positive(),
  pricePerNight: z.coerce.number().positive(),
  starRating: z.coerce.number().int().min(1).max(5),
  imageFiles: z
    .instanceof(FileList)
    .refine(
      (files) => files?.length !== 0,
      "At least one image should be uploaded"
    )
    .refine((files) => files?.length <= 6, "Maximum 6 images"),
  lastUpdated: z.coerce.date().refine((data) => data > new Date(), {
    message: "Date can't be in the future",
  }),
});
export type Hotel = z.infer<typeof HotelData>;

// HOTEL ADD
export const HotelDataAdd = HotelData.omit({
  _id: true,
  userId: true,
  lastUpdated: true,
});
export type HotelAdd = z.infer<typeof HotelDataAdd>;
