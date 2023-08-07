import getCurrentUser from "../actions/getCurrentUser";
import getFavoritesListings from "../actions/getFavoritesListings";
import ClientOnly from "../components/shared/ClientOnly";
import EmptyState from "../components/shared/EmptyState";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="please login" />
      </ClientOnly>
    );
  }

  const favoriteListings = await getFavoritesListings();

  if (!favoriteListings || favoriteListings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorite listing found"
          subtitle="looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient
        currentUser={currentUser}
        favoriteListings={favoriteListings}
      />
    </ClientOnly>
  );
};

export default FavoritesPage;
