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

export const getRestaurantImage = (name?: string) =>
  (name && restaurantImages[name.trim()]) ||
  "/images/restaurants/placeholder.jpg";