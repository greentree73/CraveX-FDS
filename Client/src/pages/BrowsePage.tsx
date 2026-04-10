import { useQuery } from "@apollo/client/react";
import { GET_RESTAURANTS } from "../graphql/queries";
import RestaurantCard from "../components/RestaurantCard";
import Loading from "../components/Loading";
import { GetRestaurantsResponse } from "../types/graphql";

type Props = {
  onRestaurantSelect: (id: string) => void;
};

const restaurantImages: Record<string, string> = {
  "Pizza Hub": "/images/restaurants/pizza-hub.jpg",
  "Bombay Bites": "/images/restaurants/bombay-bites.jpg",
  "Thai Spice Kitchen": "/images/restaurants/thai-spice-kitchen.jpg",
  "Dragon Wok": "/images/restaurants/dragon-wok.jpg",
  "Morning Bakery Cafe": "/images/restaurants/morning-bakery-cafe.jpg",
  "Smoothie Stop": "/images/restaurants/smoothie-stop.jpg",
  "Sub Station": "/images/restaurants/sub-station.jpg",
  "Wing World": "/images/restaurants/wing-world.jpg",
  "Ocean Catch": "/images/restaurants/ocean-catch.jpg",
  "Scoops Delight": "/images/restaurants/scoops-delight.jpg",
  "Smokehouse BBQ": "/images/restaurants/smokehouse-bbq.jpg",
  "Little Italy Pasta House": "/images/restaurants/pasta-house.jpg",
  "Tokyo Bento": "/images/restaurants/tokyo-bento.jpg",
  "Saigon Bowl": "/images/restaurants/saigon-bowl.jpg",
};

export default function BrowsePage({ onRestaurantSelect }: Props) {
  const { data, loading, error } =
    useQuery<GetRestaurantsResponse>(GET_RESTAURANTS);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="container py-5 text-danger">
        {error.message}
      </div>
    );
  }

  const restaurants = data?.restaurants || [];

  return (
    <div className="container py-4">
      <div className="row g-4">
        {restaurants.map((restaurant) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={restaurant._id}>
            <RestaurantCard
              name={restaurant.name}
              image={
                restaurantImages[restaurant.name] ||
                "/images/restaurants/placeholder.jpg"
              }
              onClick={() => onRestaurantSelect(restaurant._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}