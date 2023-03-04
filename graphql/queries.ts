import { gql } from "@apollo/client";

export const GET_CUSTOMERS = gql`
  query GetCustomers {
    getCustomers {
      value {
        email
        name
      }
      name
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
      value {
        Address
        City
        Lat
        Lng
        carrier
        createdAt
        shippingCost
        trackingId
        trackingItems {
          items {
            item_id
            name
            price
            quantity
          }
          customer {
            email
            name
          }
          customer_id
        }
      }
    }
  }
`;
