"use client";

import { safeListing, safeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import useCountries from "../hooks/useCountries";
import Button from "../shared/Button";
import HeartButton from "../shared/HeartButton";
interface Props {
  data: safeListing;
  currentUser?: safeUser | null;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}
const ListingCard: React.FC<Props> = ({
  data,
  onAction,
  actionId = "",
  actionLabel,
  currentUser,
  disabled,
  reservation,
}) => {
  const { getByValue } = useCountries();
  const router = useRouter();
  const location = getByValue(data.locationValue);

  const handleCanel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        {/* Image */}
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            alt={data.title}
            src={data.imageSrc}
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        {/* BODY */}
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex fle-row items-crnter gap-1">
          <div className="font-semibold ">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCanel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
