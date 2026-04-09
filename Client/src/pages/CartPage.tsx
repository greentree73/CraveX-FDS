import { CartItem } from "../types";

type Props = {
  cart: CartItem[];
  onChangeQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
};

export default function CartPage({
  cart,
  onChangeQuantity,
  onCheckout,
}: Props) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = subtotal * 0.08;
  const total = subtotal + taxes;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Your Cart</h2>

      <div className="row g-4">
        <div className="col-lg-8">
          {cart.length === 0 ? (
            <div className="alert alert-info">Your cart is empty.</div>
          ) : (
            cart.map((item) => (
              <div className="card mb-3 shadow-sm" key={item._id}>
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{item.name}</h5>
                    <p className="mb-0">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <button className="btn btn-outline-secondary" onClick={() => onChangeQuantity(item._id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="btn btn-outline-secondary" onClick={() => onChangeQuantity(item._id, 1)}>+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="col-lg-4">
          <div className="card shadow-sm p-3">
            <h4>Summary</h4>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <p>Taxes: ${taxes.toFixed(2)}</p>
            <h5>Total: ${total.toFixed(2)}</h5>
            <button className="btn btn-danger w-100 mt-2" onClick={onCheckout} disabled={!cart.length}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}