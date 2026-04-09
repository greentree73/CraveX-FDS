import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
        phone
        address
        role
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $name: String!
    $email: String!
    $phone: String!
    $address: String!
    $password: String!
    $role: UserRole
  ) {
    register(
      name: $name
      email: $email
      phone: $phone
      address: $address
      password: $password
      role: $role
    ) {
      token
      user {
        _id
        name
        email
        phone
        address
        role
      }
    }
  }
`;

export const PLACE_ORDER = gql`
  mutation PlaceOrder(
    $totalAmount: Float!
    $orderItems: [OrderItemInput!]!
    $restaurantId: ID!
    $driverId: ID
  ) {
    placeOrder(
      totalAmount: $totalAmount
      orderItems: $orderItems
      restaurantId: $restaurantId
      driverId: $driverId
    ) {
      _id
      status
      totalAmount
    }
  }
`;
