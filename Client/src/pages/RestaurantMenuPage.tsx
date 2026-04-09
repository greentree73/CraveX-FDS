import { useQuery } from "@apollo/client/react";
import { GET_MENU_ITEMS, GET_RESTAURANTS } from "../graphql/queries";
import MenuItemCard from "../components/MenuItemCard";
import Loading from "../components/Loading";
import { CartItem, MenuItem } from "../types";
import {
  GetMenuItemsResponse,
  GetRestaurantsResponse,
} from "../types/graphql";

type Props = {
  restaurantId: string;
  onAddToCart: (item: CartItem) => void;
};

export default function RestaurantMenuPage({
  restaurantId,
  onAddToCart,
}: Props) {
  const { data } = useQuery<GetMenuItemsResponse>(GET_MENU_ITEMS, {
    variables: { restaurantId },
  });

  const { data: restaurantData } = useQuery<GetRestaurantsResponse>(GET_RESTAURANTS);

  if (loading) return <Loading />;
  if (error) return <div className="container py-5 text-danger">{error.message}</div>;

  const restaurant = restaurantData?.restaurants?.find(
    (r: any) => r._id === restaurantId,
  );

  return (
    <div className="container py-4">
      <div className="mb-4">
        <img
          src="https://via.placeholder.com/1200x320"
          alt={restaurant?.name}
          className="img-fluid rounded shadow"
        />
      </div>

      <h2 className="mb-4">{restaurant?.name} Menu</h2>

      <div className="row g-4">
        {data.menuItems.map((item: MenuItem) => (
          <div className="col-12 col-md-6 col-lg-4" key={item._id}>
            <MenuItemCard
              name={item.name}
              price={item.price}
              onAdd={() => onAddToCart({ ...item, quantity: 1 })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}