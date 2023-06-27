"use client";

import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import { categories } from "@/app/components/navbar/Categories";
import Container from "@/app/components/shared/Container";
import { safeListing, safeUser } from "@/app/types";
import { useMemo } from "react";

interface props {
  listing: safeListing & {
    user: safeUser;
  };
  currentUser?: safeUser | null;
}

const ListingClient: React.FC<props> = ({ currentUser, listing }) => {
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
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 mt-6">
            <ListingInfo
              category={category}
              bathroomCount={listing.bathroomCount}
              description={listing.description}
              guestCount={listing.guestCount}
              locationValue={listing.locationValue}
              roomCount={listing.roomCount}
              user={listing.user}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
