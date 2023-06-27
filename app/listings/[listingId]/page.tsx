import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
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

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currntUser} />
    </ClientOnly>
  );
};

export default ListingPage;
