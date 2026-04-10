import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES, GET_RESTAURANTS } from "../graphql/queries";
import RestaurantCard from "../components/RestaurantCard";
import Loading from "../components/Loading";
import {
  GetCategoriesResponse,
  GetRestaurantsResponse,
} from "../types/graphql";

type Props = {
  categoryId: string;
  onRestaurantSelect: (id: string) => void;
};

export default function CategoryRestaurantsPage({
  categoryId,
  onRestaurantSelect,
}: Props) {
  const { data: categoryData, loading: categoryLoading, error: categoryError } =
    useQuery<GetCategoriesResponse>(GET_CATEGORIES);

  const {
    data: restaurantData,
    loading: restaurantLoading,
    error: restaurantError,
  } = useQuery<GetRestaurantsResponse>(GET_RESTAURANTS);

  if (categoryLoading || restaurantLoading) return <Loading />;

  if (categoryError || restaurantError) {
    return (
      <div className="container py-4 text-danger">
        {categoryError?.message || restaurantError?.message}
      </div>
    );
  }

  const category = categoryData?.categories.find((c) => c._id === categoryId);

  const restaurants =
    restaurantData?.restaurants.filter((r) =>
      r.categoryIds.includes(categoryId),
    ) || [];

  return (
    <div className="container py-4">
      <h2 className="mb-4">{category?.name || "Restaurants"}</h2>
      <div className="row g-4">
        {restaurants.map((restaurant) => (
          <div className="col-12 col-md-6 col-lg-4" key={restaurant._id}>
            <RestaurantCard
              name={restaurant.name}
              image="https://via.placeholder.com/400x250"
              onClick={() => onRestaurantSelect(restaurant._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}