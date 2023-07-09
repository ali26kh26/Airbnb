import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import getReservations from "@/app/actions/getReservations";
import ClientOnly from "@/app/components/shared/ClientOnly";
import EmptyState from "@/app/components/shared/EmptyState";
import ListingClient from "./ListingClient";

interface Iparams {
  listingId?: string;
}
const ListingPage = async ({ params }: { params: Iparams }) => {
  const { listingId } = params;
  const listing = await getListingById(params);
  const currntUser = await getCurrentUser();
  const reservations = await getReservations(params);

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currntUser}
      />
    </ClientOnly>
  );
};

export default ListingPage;
