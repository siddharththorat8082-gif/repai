import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  useEffect(() => {

    const token =
      localStorage.getItem("token");

    setIsLoggedIn(!!token);

  }, []);

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("isPremium");

    navigate("/login");

    window.location.reload();

  };

  return (

    <nav
      style={{
        width: "100%",
        background: "#0a0a0a",
        borderBottom: "1px solid #222",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxSizing: "border-box"
      }}
    >

      {/* LOGO */}
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#00ff99",
          fontSize: "30px",
          fontWeight: "bold"
        }}
      >
        Rep AI
      </Link>

      {/* NAV LINKS */}
      <div
        style={{
          display: "flex",
          gap: "25px",
          alignItems: "center"
        }}
      >

        <Link
          to="/"
          style={linkStyle}
        >
          Home
        </Link>

        <Link
          to="/pricing"
          style={linkStyle}
        >
          Pricing
        </Link>

        {
          !isLoggedIn && (
            <>
              <Link
                to="/login"
                style={linkStyle}
              >
                Login
              </Link>

              <Link
                to="/register"
                style={{
                  background: "#00ff99",
                  color: "black",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontWeight: "bold"
                }}
              >
                Register
              </Link>
            </>
          )
        }

        {
          isLoggedIn && (
            <>
              <Link
                to="/dashboard"
                style={linkStyle}
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                style={{
                  background: "red",
                  border: "none",
                  color: "white",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Logout
              </button>
            </>
          )
        }

      </div>

    </nav>

  );

};

const linkStyle = {

  color: "white",

  textDecoration: "none",

  fontSize: "16px",

  fontWeight: "500"

};

export default Navbar;