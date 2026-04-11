import { useQuery } from "@apollo/client/react";
import { GET_MENU_ITEMS, GET_RESTAURANTS } from "../graphql/queries";
import MenuItemCard from "../components/MenuItemCard";
import Loading from "../components/Loading";
import { CartItem } from "../types";
import {
  GetMenuItemsResponse,
  GetRestaurantsResponse,
} from "../types/graphql";
import { getRestaurantImage } from "../utils/restaurantImages";
import { getMenuItemImage } from "../utils/menuItemImages";

type Props = {
  restaurantId: string;
  onAddToCart: (item: CartItem) => void;
};

export default function RestaurantMenuPage({
  restaurantId,
  onAddToCart,
}: Props) {
  const {
    data: menuData,
    loading: menuLoading,
    error: menuError,
  } = useQuery<GetMenuItemsResponse>(GET_MENU_ITEMS, {
    variables: { restaurantId },
  });

  const {
    data: restaurantData,
    loading: restaurantLoading,
    error: restaurantError,
  } = useQuery<GetRestaurantsResponse>(GET_RESTAURANTS);

  if (menuLoading || restaurantLoading) return <Loading />;

  if (menuError || restaurantError) {
    return (
      <div className="container py-5 text-danger">
        {menuError?.message || restaurantError?.message}
      </div>
    );
  }

  const restaurant = restaurantData?.restaurants.find(
    (r) => r._id === restaurantId,
  );

  const menuItems = menuData?.menuItems || [];

  return (
    <div className="container py-4">
      <div className="mb-4">
        <img
          src={getRestaurantImage(restaurant?.name)}
          alt={restaurant?.name || "Restaurant"}
          className="img-fluid rounded shadow"
          style={{ width: "100%", height: "280px", objectFit: "cover" }}
        />
      </div>

      <h2 className="mb-4">{restaurant?.name || "Restaurant Menu"}</h2>

      <div className="row g-4">
        {menuItems.map((item) => (
          <div className="col-12 col-md-6 col-lg-4" key={item._id}>
            <MenuItemCard
              name={item.name}
              image={getMenuItemImage(item.name)}
              price={item.price}
              onAdd={() => onAddToCart({ ...item, quantity: 1 })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}