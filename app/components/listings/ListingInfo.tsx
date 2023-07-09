"use client";

import { category, safeUser } from "@/app/types";
import dynamic from "next/dynamic";
import useCountries from "../hooks/useCountries";
import Avatar from "../shared/Avatar";
import ListingCategory from "./ListingCategory";

const Map = dynamic(() => import("../shared/Map"), {
  ssr: false,
});

interface Props {
  user: safeUser;
  category: category | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo: React.FC<Props> = ({
  bathroomCount,
  category,
  description,
  guestCount,
  locationValue,
  roomCount,
  user,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
                text-xl
                font-semibold
                flex
                flex-row
                items-center
                gap-2
            "
        >
          <div>Hosted by {user?.name} </div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex fle-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests </div>
          <div>{roomCount} rooms </div>
          <div>{bathroomCount} bathrooms </div>
        </div>
      </div>
      <hr />
      {category && <ListingCategory {...category} />}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
