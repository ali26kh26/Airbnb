import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import ListingCard from "./components/listings/ListingCard";
import ClientOnly from "./components/shared/ClientOnly";
import Container from "./components/shared/Container";
import EmptyState from "./components/shared/EmptyState";

export default async function Home() {
  const listings = await getListings();
  const currentUser = await getCurrentUser();
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListingCard
              data={listing}
              currentUser={currentUser}
              key={listing.id}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
