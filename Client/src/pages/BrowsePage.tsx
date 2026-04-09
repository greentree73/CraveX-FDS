import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { LOGIN_USER } from "../graphql/mutations";
import { LoginResponse } from "../types/graphql";

type Props = {
  onSuccess: () => void;
  onSwitchToSignUp: () => void;
};

export default function SignInPage({ onSuccess, onSwitchToSignUp }: Props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [login, { loading, error }] = useMutation<LoginResponse>(LOGIN_USER);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data } = await login({
      variables: {
        email: formData.email,
        password: formData.password,
      },
    });

    if (data?.login?.token) {
      localStorage.setItem("token", data.login.token);
      localStorage.setItem("user", JSON.stringify(data.login.user));
      onSuccess();
    }
  };

  return (
    <div className="container py-5">
      <div className="col-md-6 mx-auto card shadow p-4">
        <h2 className="mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
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
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            className="btn btn-danger w-100"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {error && <p className="text-danger mt-3">{error.message}</p>}

        <button className="btn btn-link mt-2" onClick={onSwitchToSignUp}>
          Need an account? Sign Up
        </button>
      </div>
    </div>
  );
}