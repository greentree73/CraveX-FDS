import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { PLACE_ORDER } from "../graphql/mutations";
import { CartItem } from "../types";

type Props = {
  restaurantId: string | null;
  cart: CartItem[];
  onSuccess: () => void;
};

export default function CheckoutPage({ restaurantId, cart, onSuccess }: Props) {
  const [paymentMethod, setPaymentMethod] = useState<"credit_card" | "cash">("credit_card");

  const [placeOrder, { loading, error }] = useMutation(PLACE_ORDER);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = subtotal * 0.08;
  const total = subtotal + taxes;

  const handlePlaceOrder = async () => {
    if (!restaurantId || cart.length === 0) return;

    const orderItems = cart.map((item) => ({
      quantity: item.quantity,
      menuItemId: item._id,
    }));

    await placeOrder({
      variables: {
        totalAmount: Number(total.toFixed(2)),
        orderItems,
        restaurantId,
        driverId: null,
      },
    });

    onSuccess();
  };

  return (
    <div className="container py-4">
      <div className="col-lg-6 mx-auto card shadow-sm p-4">
        <h2 className="mb-4">Checkout</h2>

        <div className="mb-3">
          <label className="form-label">Payment Method</label>
          <select
            className="form-select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as "credit_card" | "cash")}
          >
            <option value="credit_card">Credit Card</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        {paymentMethod === "credit_card" && (
          <>
            <input className="form-control mb-3" placeholder="Cardholder Name" />
            <input className="form-control mb-3" placeholder="Card Number" />
            <div className="row">
              <div className="col">
                <input className="form-control mb-3" placeholder="MM/YY" />
              </div>
              <div className="col">
                <input className="form-control mb-3" placeholder="CVV" />
              </div>
            </div>
          </>
        )}

        <div className="mb-3">
          <strong>Total: ${total.toFixed(2)}</strong>
        </div>

        <button className="btn btn-danger w-100" onClick={handlePlaceOrder} disabled={loading}>
          {loading ? "Placing Order..." : "Place Order"}
        </button>

        {error && <p className="text-danger mt-3">{error.message}</p>}
      </div>
    </div>
  );
}