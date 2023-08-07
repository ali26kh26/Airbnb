import prisma from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoritesListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }
    const favoriteListingsId = currentUser.favoriteIds;

    const listings = await prisma.listing.findMany({
      where: {
        id: { in: favoriteListingsId },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListing = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListing;
  } catch (error: any) {
    throw new Error(error);
  }
}
