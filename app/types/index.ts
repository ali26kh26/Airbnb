import { Listing, Reservation, User } from "@prisma/client";
import { IconType } from "react-icons";

export type safeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type safeListing = Omit<Listing, "createdAt"> & {
  createdAt: string;
};

export type category = {
  label: string;
  icon: IconType;
  description: string;
};

export type safeReservation = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: safeListing;
};
