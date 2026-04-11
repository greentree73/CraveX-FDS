import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { REGISTER_USER } from "../graphql/mutations";

type Props = {
  onSuccess: () => void;
  onSwitchToSignIn: () => void;
};

type RegisterResponse = {
  register: {
    token: string;
    user: {
      _id: string;
      name: string;
      email: string;
      phone: string;
      address: string;
      role: string;
    };
  };
};

export default function SignUpPage({
  onSuccess,
  onSwitchToSignIn,
}: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const [register, { loading, error }] =
    useMutation<RegisterResponse>(REGISTER_USER);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data } = await register({
      variables: {
        ...formData,
        role: "customer",
      },
    });

    if (data?.register?.token) {
      localStorage.setItem("token", data.register.token);
      localStorage.setItem("user", JSON.stringify(data.register.user));
      onSuccess();
    }
  };

  return (
    <div className="container py-5">
      <div className="col-md-6 mx-auto card shadow p-4">
        <h2 className="mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-3"
            name="name"
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            name="phone"
            type="text"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            name="address"
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button className="btn btn-danger w-100" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        {error && <p className="text-danger mt-3">{error.message}</p>}
        <button className="btn btn-link mt-2" onClick={onSwitchToSignIn}>
          Already have an account? Sign In
        </button>
      </div>
    </div>
  );
}