export const typeDefs = `#graphql

  enum OrderStatus {
    pending
    preparing
    ready
    out_for_delivery
    delivered
    cancelled
  }

  enum UserRole {
    customer
    owner
    admin
  }

  enum PaymentStatus {
    pending
    completed
  }

  enum PaymentMethod {
    credit_card
    cash
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    phone: String!
    address: String!
    role: UserRole!
    createdAt: String
    updatedAt: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Category {
    _id: ID!
    name: String!
    description: String
    restaurants: [Restaurant!]!
    createdAt: String
    updatedAt: String
  }

  type Restaurant {
    _id: ID!
    name: String!
    address: String!
    phone: String

    categoryIds: [ID!]!
    menuItemIds: [ID!]!

    categories: [Category!]!
    menuItems: [MenuItem!]!

    createdAt: String!
    updatedAt: String!
  }

  type MenuItem {
    _id: ID!
    name: String!
    price: Float!
    restaurantId: ID!
    categoryId: ID
    createdAt: String
    updatedAt: String
  }

  type Driver {
    _id: ID!
    name: String!
    phone: String!
    isAvailable: Boolean!
    createdAt: String
    updatedAt: String
  }

  type Payment {
    _id: ID!
    amount: Float!
    status: PaymentStatus!
    method: PaymentMethod!
    orderId: ID!
    createdAt: String
    updatedAt: String
  }

  type OrderItem {
    quantity: Int!
    menuItemId: ID!
  }

  input OrderItemInput {
    quantity: Int!
    menuItemId: ID!
  }

  type Order {
    _id: ID!
    status: OrderStatus!
    totalAmount: Float!
    orderItems: [OrderItem!]!
    restaurantId: ID!
    customerId: ID!
    driverId: ID
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User!]!
    categories: [Category!]!
    restaurants: [Restaurant!]!
    menuItems(restaurantId: ID!): [MenuItem!]!
    orders: [Order!]!
  }

  type Mutation {
    register(
      name: String!
      email: String!
      phone: String!
      address: String!
      password: String!
      role: UserRole
    ): AuthPayload!

    login(
      email: String!
      password: String!
    ): AuthPayload!

    addRestaurant(
      name: String!
      address: String!
      phone: String
      categoryIds: [ID!]
      menuItemIds: [ID!]
    ): Restaurant

    addMenuItem(
      name: String!
      price: Float!
      restaurantId: ID!
      categoryId: ID
    ): MenuItem

    addCategory(
      name: String!
      description: String!
    ): Category

    addDriver(
      name: String!
      phone: String!
    ): Driver

    addPayment(
      orderId: ID!
      amount: Float!
      status: PaymentStatus!
      method: PaymentMethod!
    ): Payment

    placeOrder(
      totalAmount: Float!
      orderItems: [OrderItemInput!]!
      restaurantId: ID!
      driverId: ID
    ): Order

    updateRestaurant(
      id: ID!
      name: String
      address: String
      phone: String
      categoryIds: [ID!]
      menuItemIds: [ID!]
    ): Restaurant

    updateMenuItem(
      id: ID!
      name: String
      price: Float
      restaurantId: ID
      categoryId: ID
    ): MenuItem

    updateCategory(
      id: ID!
      name: String
      description: String
    ): Category

    updateDriver(
      id: ID!
      name: String
      phone: String
      isAvailable: Boolean
    ): Driver

    updateOrderStatus(
      id: ID!
      status: OrderStatus!
    ): Order

    updatePaymentStatus(
      id: ID!
      status: PaymentStatus!
    ): Payment

    deleteRestaurant(id: ID!): Restaurant
    deleteMenuItem(id: ID!): MenuItem
  }
`;

export default typeDefs;

