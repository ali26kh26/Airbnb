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
  listings: safeListing[];
  currentUser: safeUser | null;
}

const PropertiesClient: React.FC<Props> = ({ listings, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onRemove = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Listing deleted");
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
      <Heading title="Properties" subtitle="List of your properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
            actionId={listing.id}
            actionLabel="Delete property"
            disabled={deletingId === listing.id}
            onAction={onRemove}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;
