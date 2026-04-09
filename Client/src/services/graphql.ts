import { gql } from "@apollo/client";

/* =======================
   QUERIES
======================= */

export const GET_CATEGORIES = gql`
  query {
    categories {
      _id
      name
      description
    }
  }
`;

export const GET_MENU = gql`
  query ($restaurantId: String!) {
    menuItems(restaurantId: $restaurantId) {
      _id
      name
      price
      categoryId
    }
  }
`;

export const GET_ORDERS = gql`
  query {
    orders {
      _id
      status
      totalAmount
    }
  }
`;

export const GET_RESTAURANTS = gql`
  query {
    restaurants {
      _id
      name
      address
      phone
    }
  }
`;

/* =======================
   AUTH
======================= */

export const REGISTER_USER = gql`
  mutation ($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        _id
        name
        email
      }
    }
  }
`;

/* =======================
   ORDER
======================= */

export const PLACE_ORDER = gql`
  mutation ($input: OrderInput!) {
    placeOrder(input: $input) {
      _id
      status
      totalAmount
    }
  }
`;

/* =======================
   ADD / CREATE MUTATIONS
======================= */

export const ADD_RESTAURANT = gql`
  mutation ($input: RestaurantInput!) {
    addRestaurant(input: $input) {
      _id
      name
      address
    }
  }
`;

export const ADD_MENUITEM = gql`
  mutation ($input: MenuItemInput!) {
    addMenuItem(input: $input) {
      _id
      name
      price
      categoryId
      restaurantId
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation ($input: CategoryInput!) {
    addCategory(input: $input) {
      _id
      name
      description
    }
  }
`;

export const ADD_PAYMENT = gql`
  mutation ($input: PaymentInput!) {
    addPayment(input: $input) {
      _id
      amount
      status
      method
    }
  }
`;

export const ADD_DRIVER = gql`
  mutation ($input: DriverInput!) {
    addDriver(input: $input) {
      _id
      name
      phone
      isAvailable
    }
  }
`;

/* =======================
   UPDATE / EDIT MUTATIONS
======================= */

// Update Restaurant
export const UPDATE_RESTAURANT = gql`
  mutation ($id: String!, $input: RestaurantInput!) {
    updateRestaurant(id: $id, input: $input) {
      _id
      name
      address
      phone
    }
  }
`;

// Update Menu Item
export const UPDATE_MENUITEM = gql`
  mutation ($id: String!, $input: MenuItemInput!) {
    updateMenuItem(id: $id, input: $input) {
      _id
      name
      price
      categoryId
    }
  }
`;

// Update Category
export const UPDATE_CATEGORY = gql`
  mutation ($id: String!, $input: CategoryInput!) {
    updateCategory(id: $id, input: $input) {
      _id
      name
      description
    }
  }
`;

// Update Driver
export const UPDATE_DRIVER = gql`
  mutation ($id: String!, $input: DriverInput!) {
    updateDriver(id: $id, input: $input) {
      _id
      name
      phone
      isAvailable
    }
  }
`;

// Update Order Status (very common use case)
export const UPDATE_ORDER_STATUS = gql`
  mutation ($id: String!, $status: String!) {
    updateOrderStatus(id: $id, status: $status) {
      _id
      status
    }
  }
`;

// Update Payment Status
export const UPDATE_PAYMENT_STATUS = gql`
  mutation ($id: String!, $status: String!) {
    updatePaymentStatus(id: $id, status: $status) {
      _id
      status
    }
  }
`;

/* =======================
   DELETE MUTATIONS
======================= */

export const DELETE_RESTAURANT = gql`
  mutation ($id: String!) {
    deleteRestaurant(id: $id) {
      _id
      name
    }
  }
`;

export const DELETE_MENUITEM = gql`
  mutation ($id: String!) {
    deleteMenuItem(id: $id) {
      _id
      name
    }
  }
`;
