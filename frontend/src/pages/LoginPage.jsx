import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

const Login = () => {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    try {

      const res = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      navigate("/dashboard");

    } catch (err) {

      console.log(err);

      setError(

        err.response?.data?.message ||

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
        onSubmit={handleLogin}
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#111",
          padding: "40px",
          borderRadius: "25px",
          border: "1px solid #222",
          boxShadow: "0 0 30px rgba(0,255,153,0.08)"
        }}
      >

        <h1
          style={{
            color: "#00ff99",
            marginBottom: "30px",
            textAlign: "center",
            fontSize: "38px"
          }}
        >
          Login 🚀
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
          style={inputStyle}
        />

        {
          error && (

            <div
              style={{
                background: "#2a1212",
                color: "#ff4d4d",
                padding: "14px",
                borderRadius: "10px",
                marginBottom: "20px",
                border: "1px solid #ff4d4d",
                fontSize: "14px"
              }}
            >

              {error}

            </div>

          )
        }

        <button
          type="submit"
          disabled={loading}
          style={{
            ...buttonStyle,
            opacity: loading ? 0.7 : 1
          }}
        >

          {
            loading
              ? "Logging in..."
              : "Login"
          }

        </button>

        <p
          style={{
            color: "#aaa",
            textAlign: "center",
            marginTop: "25px",
            fontSize: "15px"
          }}
        >

          No account?

          <Link
            to="/register"
            style={{
              color: "#00ff99",
              marginLeft: "8px",
              textDecoration: "none",
              fontWeight: "bold"
            }}
          >
            Register
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
  outline: "none",
  boxSizing: "border-box"

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
  cursor: "pointer",
  transition: "0.3s"

};

export default Login;