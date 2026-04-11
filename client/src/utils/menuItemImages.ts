const menuItemImage: Record<string, string> = {
  "Margherita Pizza": "/images/menuItems/margherita-pizza.jpg",
  "Pepperoni Pizza": "/images/menuItems/pepperoni-pizza.jpg",
  "Butter Chicken": "/images/menuItems/butter-chicken.jpg",
  "Paneer Tikka Masala": "/images/menuItems/paneer-tikka-masala.jpg",
  "Pad Thai": "/images/menuItems/pad-thai.jpg",
  "Green Curry": "/images/menuItems/green-curry.jpg",
  "Kung Pao Chicken": "/images/menuItems/kung-pao-chicken.jpg",
  "Veg Fried Rice": "/images/menuItems/veg-fried-rice.jpg",
  "Cappuccino": "/images/menuItems/cappuccino.jpg",
  "Butter Croissant": "/images/menuItems/butter-croissant.jpg",
  "Berry Blast Smoothie": "/images/menuItems/berry-blast-smoothie.jpg",
  "Mango Banana Smoothie": "/images/menuItems/mango-banana-smoothie.jpg",
  "Lasagna": "/images/menuItems/lasagna.jpg",
  "Spaghetti Alfredo": "/images/menuItems/spaghetti-alfredo.jpg",
  "Turkey Club Sandwich": "/images/menuItems/turkey-club-sandwich.jpg",
  "Veggie Sub": "/images/menuItems/veggie-sub.jpg",
  "Classic Buffalo Wings": "/images/menuItems/classic-buffalo-wings.jpg",
  "BBQ Wings": "/images/menuItems/bbq-wings.jpg",
  "Grilled Salmon": "/images/menuItems/grilled-salmon.jpg",
  "Fish Tacos": "/images/menuItems/fish-tacos.jpg",
  "Chocolate Ice Cream": "/images/menuItems/chocolate-ice-cream.jpg",
  "Vanilla Sundae": "/images/menuItems/vanilla-sundae.jpg",
  "Chicken Teriyaki Bento": "/images/menuItems/chicken-teriyaki-bento.jpg",
  "California Roll": "/images/menuItems/california-roll.jpg",
  "Pho Bo": "/images/menuItems/pho-bo.jpg",
  "Spring Rolls": "/images/menuItems/spring-rolls.jpg",
  "Smoked Brisket Plate": "/images/menuItems/smoked-brisket-plate.jpg",
  "Pulled Pork Sandwich": "/images/menuItems/pulled-pork-sandwich.jpg",
};

export const getMenuItemImage = (name?: string) =>
  (name && menuItemImage[name.trim()]) ||
  "/images/menuItems/placeholder.jpg";
