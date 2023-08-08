"use client";

import { formatISO } from "date-fns";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import useSearchModal from "../hooks/useSearchModal";
import Heading from "../shared/Heading";
import Calendar from "../shared/inputs/Calendar";
import Counter from "../shared/inputs/Counter";
import CountrySelect, {
  CountrySelectValue,
} from "../shared/inputs/CountrySelect";
import Modal from "./Modal";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [steps, setSteps] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [location, setLocation] = useState<CountrySelectValue>();

  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const onBack = useCallback(() => {
    setSteps((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setSteps((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (steps !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }
    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setSteps(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    steps,
    params,
    location?.value,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange.startDate,
    dateRange.endDate,
    searchModal,
    router,
    onNext,
  ]);

  const actionLabel = useMemo(() => {
    if (steps === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [steps]);

  const secondaryActionLabel = useMemo(() => {
    if (steps === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [steps]);

  const Map = useMemo(
    () =>
      dynamic(() => import("../shared/Map"), {
        ssr: false,
      }),
    [location]
  );

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="where do you wanna go?"
        subtitle="Find the perfect location"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (steps === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="when do you plan to go?"
          subtitle="Make sure everyone is free"
        />
        <Calendar
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      </div>
    );
  }
  if (steps === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find our perfect place" />
        <Counter
          value={guestCount}
          title="Guests"
          subTitle="How many guests are coming?"
          onChange={(value) => setGuestCount(value)}
        />
        <Counter
          value={roomCount}
          title="Rooms"
          subTitle="How many rooms do you need?"
          onChange={(value) => setRoomCount(value)}
        />
        <Counter
          value={bathroomCount}
          title="Bathrooms"
          subTitle="How many bathrooms do you need?"
          onChange={(value) => setBathroomCount(value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryAction={steps === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      body={bodyContent}
    />
  );
};

export default SearchModal;
