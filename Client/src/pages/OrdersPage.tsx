import { useQuery } from "@apollo/client/react";
import { GET_ORDERS } from "../graphql/queries";
import Loading from "../components/Loading";
import { GetOrdersResponse } from "../types/graphql";

export default function OrdersPage() {
  const { data } = useQuery(GET_ORDERS, {
    fetchPolicy: "network-only",
  });

  if (loading) return <Loading />;
  if (error) return <div className="container py-5 text-danger">{error.message}</div>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Order History</h2>

      <div className="row g-3">
        {data.orders.map((order: any) => (
          <div className="col-12" key={order._id}>
            <div className="card shadow-sm">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">Order #{order._id}</h5>
                  <p className="mb-1">Restaurant ID: {order.restaurantId}</p>
                  <p className="mb-0">Total: ${order.totalAmount.toFixed(2)}</p>
                </div>
                <span className="badge bg-warning text-dark fs-6">
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}