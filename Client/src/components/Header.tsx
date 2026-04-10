import { Category } from "../types";

type Props = {
  isSignedIn: boolean;
  categories: Category[];
  cartCount: number;
  onHome: () => void;
  onSignIn: () => void;
  onSignUp: () => void;
  onCart: () => void;
  onOrders: () => void;
  onLogout: () => void;
  onCategorySelect: (id: string) => void;
};

export default function Header({
  isSignedIn,
  categories,
  cartCount,
  onHome,
  onSignIn,
  onSignUp,
  onCart,
  onOrders,
  onLogout,
  onCategorySelect,
}: Props) {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm sticky-top px-3 py-3">
      <div className="container-fluid align-items-center">
        <button
          className="navbar-brand fw-bold border-0 bg-transparent me-4"
          onClick={onHome}
        >
          CraveX
        </button>

        {!isSignedIn ? (
          <div className="ms-auto d-flex gap-2">
            <button className="btn btn-outline-dark" onClick={onSignIn}>
              Sign In
            </button>
            <button className="btn btn-danger" onClick={onSignUp}>
              Sign Up
            </button>
          </div>
        ) : (
          <>
            <div className="d-flex flex-wrap gap-2 flex-grow-1">
              {categories.map((category) => (
                <button
                  key={category._id}
                  className="btn btn-light btn-sm rounded-pill px-3"
                  onClick={() => onCategorySelect(category._id)}
                >
                  {category.name}
                </button>
              ))}
            </div>

            <div className="d-flex gap-2 ms-auto">
              <button className="btn btn-outline-secondary" onClick={onOrders}>
                Orders
              </button>
              <button className="btn btn-outline-primary" onClick={onCart}>
                Cart ({cartCount})
              </button>
              <button className="btn btn-outline-danger" onClick={onLogout}>
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}