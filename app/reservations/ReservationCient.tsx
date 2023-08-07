"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import Container from "../components/shared/Container";
import Heading from "../components/shared/Heading";
import { safeReservation, safeUser } from "../types";

interface Props {
  reservations: safeReservation[];
  currentUser: safeUser | null;
}

const ReservationCient: React.FC<Props> = ({ reservations, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation cancelled");
          router.refresh();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="See who reserved your properties"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            currentUser={currentUser}
            actionId={reservation.id}
            actionLabel="Cancel guest reservation"
            disabled={deletingId === reservation.id}
            onAction={onCancel}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationCient;
