import { useMemo, useState } from "react";
import { useQuery } from "@apollo/client/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import BrowsePage from "./pages/BrowsePage";
import CategoryRestaurantsPage from "./pages/CategoryRestaurantsPage";
import RestaurantMenuPage from "./pages/RestaurantMenuPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import { GET_CATEGORIES } from "./graphql/queries";
import { CartItem } from "./types";
import { GetCategoriesResponse } from "./types/graphql";

type Page =
  | "home"
  | "signin"
  | "signup"
  | "browse"
  | "categoryRestaurants"
  | "restaurantMenu"
  | "cart"
  | "checkout"
  | "orders";


export default function App() {
  const [page, setPage] = useState<Page>(
  localStorage.getItem("token") ? "browse" : "home"
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSignedIn, setIsSignedIn] = useState(!!localStorage.getItem("token"));

  const { data } = useQuery<GetCategoriesResponse>(GET_CATEGORIES, {
    skip: !isSignedIn,
  });

  const categories = data?.categories || [];

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const handleLoginSuccess = () => {
    setIsSignedIn(true);
    setSelectedCategoryId(null);
    setSelectedRestaurantId(null);
    setPage("browse");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsSignedIn(false);
    setCart([]);
    setSelectedCategoryId(null);
    setSelectedRestaurantId(null);
    setPage("home");
  };

  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((cartItem) => cartItem._id === item._id);
      if (existing) {
        return prev.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }
      return [...prev, item];
    });
  };

  const handleChangeQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header
        isSignedIn={isSignedIn}
        categories={categories}
        cartCount={cartCount}
        onHome={() => setPage(isSignedIn ? "browse" : "home")}
        onSignIn={() => setPage("signin")}
        onSignUp={() => setPage("signup")}
        onCart={() => setPage("cart")}
        onOrders={() => setPage("orders")}
        onLogout={handleLogout}
        onCategorySelect={(id) => {
          setSelectedCategoryId(id);
          setPage("categoryRestaurants");
        }}
      />

      <div className="flex-grow-1">
        {page === "home" && (
          <HomePage
            onSignIn={() => setPage("signin")}
            onSignUp={() => setPage("signup")}
          />
        )}

        {page === "signin" && !isSignedIn && (
          <SignInPage
            onSuccess={handleLoginSuccess}
            onSwitchToSignUp={() => setPage("signup")}
          />
        )}

        {page === "signup" && !isSignedIn && (
          <SignUpPage
            onSuccess={handleLoginSuccess}
            onSwitchToSignIn={() => setPage("signin")}
          />
        )}

        {page === "browse" && isSignedIn && (
          <BrowsePage
            onCategorySelect={(id) => {
            setSelectedCategoryId(id);
            setPage("categoryRestaurants");
          }}
          onRestaurantSelect={(id) => {
          setSelectedRestaurantId(id);
          setPage("restaurantMenu");
          }}
          />
        )}

        {page === "categoryRestaurants" && isSignedIn && selectedCategoryId && (
          <CategoryRestaurantsPage
            categoryId={selectedCategoryId}
            onRestaurantSelect={(id) => {
              setSelectedRestaurantId(id);
              setPage("restaurantMenu");
            }}
          />
        )}

        {page === "restaurantMenu" && isSignedIn && selectedRestaurantId && (
          <RestaurantMenuPage
            restaurantId={selectedRestaurantId}
            onAddToCart={handleAddToCart}
          />
        )}

        {page === "cart" && isSignedIn && (
          <CartPage
            cart={cart}
            onChangeQuantity={handleChangeQuantity}
            onCheckout={() => setPage("checkout")}
          />
        )}

        {page === "checkout" && isSignedIn && selectedRestaurantId && (
          <CheckoutPage
            restaurantId={selectedRestaurantId}
            cart={cart}
            onSuccess={() => {
              setCart([]);
              setPage("orders");
            }}
          />
        )}

        {page === "orders" && isSignedIn && <OrdersPage />}
      </div>

      <Footer />
    </div>
  );
}

