import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ClientOnly from "../components/shared/ClientOnly";
import EmptyState from "../components/shared/EmptyState";
import ReservationCient from "./ReservationCient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (!reservations || reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No reservation found"
          subtitle="looks like you have no reservations on your properties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ReservationCient currentUser={currentUser} reservations={reservations} />
    </ClientOnly>
  );
};

export default ReservationsPage;
