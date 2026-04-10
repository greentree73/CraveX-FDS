import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      _id
      name
      description
    }
  }
`;

export const GET_RESTAURANTS = gql`
  query GetRestaurants {
    restaurants {
      _id
      name
      address
      phone
      categoryIds
    }
  }
`;

export const GET_MENU_ITEMS = gql`
  query GetMenuItems($restaurantId: ID!) {
    menuItems(restaurantId: $restaurantId) {
      _id
      name
      price
      restaurantId
      categoryId
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      _id
      status
      totalAmount
      createdAt
      restaurant {
        _id
        name
      }
      customerId
      driverId
      orderItems {
        quantity
        menuItemId
      }
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      _id
      name
      email
      phone
      address
      role
    }
  }
`;
