"use client";

import useLoginModal from "@/app/components/hooks/useLoginMdal";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingResevation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/shared/Container";
import { safeListing, safeReservation, safeUser } from "@/app/types";
import axios from "axios";
import { differenceInCalendarDays } from "date-fns";
import { eachDayOfInterval } from "date-fns/esm";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

const initailDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface props {
  listing: safeListing & {
    user: safeUser;
  };
  currentUser?: safeUser | null;
  reservations?: safeReservation[];
}

const ListingClient: React.FC<props> = ({
  currentUser,
  listing,
  reservations = [],
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initailDateRange);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing reserved");
        setDateRange(initailDateRange);
        router.push("/trips");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [currentUser, dateRange, listing?.id, loginModal, router, totalPrice]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const days = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (days && listing.price) {
        setTotalPrice(days * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing.id}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            title={listing.title}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              category={category}
              bathroomCount={listing.bathroomCount}
              description={listing.description}
              guestCount={listing.guestCount}
              locationValue={listing.locationValue}
              roomCount={listing.roomCount}
              user={listing.user}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingResevation
                price={listing.price}
                totalPrice={totalPrice}
                onchangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
