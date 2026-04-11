import { useQuery } from "@apollo/client/react";
import { GET_RESTAURANTS } from "../graphql/queries";
import RestaurantCard from "../components/RestaurantCard";
import Loading from "../components/Loading";
import { GetRestaurantsResponse } from "../types/graphql";
import { getRestaurantImage } from "../utils/restaurantImages";

type Props = {
  onRestaurantSelect: (id: string) => void;
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
                getRestaurantImage(restaurant.name) ||
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