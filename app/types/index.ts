import { User } from "@prisma/client";
import { IconType } from "react-icons";

export type safeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export type category = {
  label: string;
  icon: IconType;
  description: string;
};
