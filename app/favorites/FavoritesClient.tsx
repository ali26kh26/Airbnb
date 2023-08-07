"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
import Container from "../components/shared/Container";
import Heading from "../components/shared/Heading";
import { safeListing, safeUser } from "../types";

interface Props {
  favoriteListings: safeListing[];
  currentUser: safeUser | null;
}

const FavoritesClient: React.FC<Props> = ({
  favoriteListings,
  currentUser,
}) => {
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
        title="Favorites"
        subtitle="List of places you have favorited!"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {favoriteListings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
            actionId={listing.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
