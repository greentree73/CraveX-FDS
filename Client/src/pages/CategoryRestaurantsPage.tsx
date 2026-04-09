import { useQuery } from "@apollo/client/react";
import { GET_CATEGORIES, GET_RESTAURANTS } from "../graphql/queries";
import RestaurantCard from "../components/RestaurantCard";
import Loading from "../components/Loading";

type Props = {
  categoryId: string;
  onRestaurantSelect: (id: string) => void;
};

export default function CategoryRestaurantsPage({
  categoryId,
  onRestaurantSelect,
}: Props) {
  const { data: categoryData, loading: categoryLoading } = useQuery(GET_CATEGORIES);
  const { data: restaurantData, loading: restaurantLoading } = useQuery(GET_RESTAURANTS);

  if (categoryLoading || restaurantLoading) return <Loading />;

  const category = categoryData.categories.find((c: any) => c._id === categoryId);
  const restaurants = restaurantData.restaurants.filter((r: any) =>
    r.categoryIds.includes(categoryId),
  );

  return (
    <div className="container py-4">
      <h2 className="mb-4">{category?.name} Restaurants</h2>
      <div className="row g-4">
        {restaurants.map((restaurant: any) => (
          <div className="col-12 col-md-6 col-lg-4" key={restaurant._id}>
            <RestaurantCard
              name={restaurant.name}
              address={restaurant.address}
              onClick={() => onRestaurantSelect(restaurant._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}