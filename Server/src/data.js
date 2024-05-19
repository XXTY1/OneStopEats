export const sample_foods = [
  {
    id: "1",
    name: "Pizza Pepperoni",
    cookTime: "10-20",
    price: 10,
    favorite: false,
    origins: ["italy"],
    stars: 4.5,
    imageUrl: "food-1.jpg",
    tags: ["FastFood", "Pizza", "Lunch"],
    description:
      "A classic Italian favorite, featuring a crispy crust, zesty tomato sauce, and topped with spicy pepperoni slices. Perfect for any meal that calls for a touch of Mediterranean flair.",
  },
  {
    id: "2",
    name: "Meatball",
    price: 20,
    cookTime: "20-30",
    favorite: true,
    origins: ["persia", "middle east", "china"],
    stars: 5,
    imageUrl: "food-2.jpg",
    tags: ["SlowFood", "Lunch"],
    description:
      "Savory and hearty meatballs, seasoned with a blend of spices from Persia to China, making it a global comfort food. Ideal for a filling lunch or a satisfying dinner.",
  },
  {
    id: "3",
    name: "Hamburger",
    price: 5,
    cookTime: "10-15",
    favorite: false,
    origins: ["germany", "us"],
    stars: 3.5,
    imageUrl: "food-3.jpg",
    tags: ["FastFood", "Hamburger"],
    description:
      "An American classic with a German twist, our hamburger is a juicy patty sandwiched between fresh buns, garnished with your choice of toppings. A fast-food staple that never disappoints.",
  },
  {
    id: "4",
    name: "Fried Potatoes",
    price: 2,
    cookTime: "15-20",
    favorite: true,
    origins: ["belgium", "france"],
    stars: 3,
    imageUrl: "food-4.jpg",
    tags: ["FastFood", "Fry"],
    description:
      "Crispy on the outside, fluffy on the inside, these golden fried potatoes are a beloved snack. Originating from Belgium and France, they're a simple yet irresistible treat.",
  },
  {
    id: "5",
    name: "Chicken Soup",
    price: 11,
    cookTime: "40-50",
    favorite: false,
    origins: ["india", "asia"],
    stars: 3.5,
    imageUrl: "food-5.jpg",
    tags: ["SlowFood", "Soup"],
    description:
      "A nourishing bowl of Chicken Soup, infused with spices from India and Asia, offering a comforting and aromatic experience. It's the perfect remedy for any day.",
  },
  {
    id: "6",
    name: "Vegetables Pizza",
    price: 9,
    cookTime: "40-50",
    favorite: false,
    origins: ["italy"],
    stars: 4.0,
    imageUrl: "food-6.jpg",
    tags: ["FastFood", "Pizza", "Lunch"],
    description:
      "Loaded with a vibrant medley of fresh vegetables on a bed of rich tomato sauce and melted cheese, this pizza is a delightful feast for those who love their greens.",
  },
];

export const sample_tags = [
  { name: "All", count: 6 },
  { name: "FastFood", count: 4 },
  { name: "Pizza", count: 2 },
  { name: "Lunch", count: 3 },
  { name: "SlowFood", count: 2 },
  { name: "Hamburger", count: 1 },
  { name: "Fry", count: 1 },
  { name: "Soup", count: 1 },
];

export const sample_users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@gmail.com",
    password: "12345",
    address: "Toronto On",
    isAdmin: false,
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@gmail.com",
    password: "12345",
    address: "Shanghai",
    isAdmin: true,
  },
];
