type Props = {
  onSignIn: () => void;
  onSignUp: () => void;
};

export default function HomePage({ onSignIn, onSignUp }: Props) {
  return (
    <div className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-6">
          <h1 className="display-4 fw-bold mb-3">CraveX Food Delivery</h1>
          <p className="lead mb-4">
            Order your favorite meals from top restaurants with a clean and fast experience.
          </p>
          <div className="d-flex gap-3">
            <button className="btn btn-outline-dark btn-lg" onClick={onSignIn}>
              Sign In
            </button>
            <button className="btn btn-danger btn-lg" onClick={onSignUp}>
              Sign Up
            </button>
          </div>
        </div>
        <div className="col-lg-6">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
            alt="Food"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
    </div>
  );
}