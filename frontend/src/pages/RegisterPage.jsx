import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

const Register = () => {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");
 
   const [loading, setLoading] = useState(false);

  const [password, setPassword] =
    useState("");

  const [error, setError] =
  useState("");

  const handleRegister = async (e) => {

  e.preventDefault();

  setLoading(true);

  setError("");

  try {

    const res = await API.post(
      "/auth/register",
      {
        name,
        email,
        password
      }
    );

    localStorage.setItem(
      "token",
      res.data.token
    );

    navigate("/dashboard");

  } catch (error) {

    console.log(error);

    setError(

      error.response?.data?.message ||

      "Server Error ❌"

    );

  }

  setLoading(false);

};

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >

      <form
        onSubmit={handleRegister}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#111",
          padding: "40px",
          borderRadius: "25px",
          border: "1px solid #222"
        }}
      >

        <h1
          style={{
            color: "#00ff99",
            marginBottom: "30px",
            textAlign: "center"
          }}
        >
          Register 🚀
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          required
          style={inputStyle}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
          style={inputStyle}
        />

        <button
          type="submit"
          disabled={loading}
          style={buttonStyle}
        >

          {
            loading
              ? "Creating Account..."
              : "Register"
          }
          {
  error && (

    <div
      style={{
        background: "#2a1212",
        color: "#ff4d4d",
        padding: "14px",
        borderRadius: "10px",
        marginBottom: "20px",
        border: "1px solid #ff4d4d"
      }}
    >

      {error}

    </div>

  )
}

        </button>

        <p
          style={{
            color: "#aaa",
            textAlign: "center",
            marginTop: "20px"
          }}
        >

          Already have account?

          <Link
            to="/login"
            style={{
              color: "#00ff99",
              marginLeft: "8px"
            }}
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  );

};

const inputStyle = {

  width: "100%",
  padding: "16px",
  marginBottom: "20px",
  background: "#1a1a1a",
  border: "1px solid #222",
  borderRadius: "12px",
  color: "white",
  fontSize: "16px",
  outline: "none"

};

const buttonStyle = {

  width: "100%",
  padding: "16px",
  background: "#00ff99",
  border: "none",
  borderRadius: "12px",
  color: "black",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer"

};

export default Register;