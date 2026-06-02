import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import AIChat from "../components/AIChat";

const Dashboard = () => {

  const navigate = useNavigate();

  const [isPremium, setIsPremium] =
    useState(false);

  const [user, setUser] =
    useState(null);

  // 🔥 Load User Profile
  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res = await API.get(

          "/auth/profile",

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        );

        setUser(res.data);

        setIsPremium(
          res.data.isPremium
        );

      } catch (error) {

        console.log(error);

      }

    };

    fetchProfile();

  }, []);

  // 🚪 Logout
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("isPremium");

    navigate("/login");

  };

  // 💰 Razorpay Payment
  const handlePayment = async () => {

    console.log(
      "PAYMENT BUTTON CLICKED"
    );

    try {

      // ✅ Create Razorpay Order

      const res = await fetch(

        "http://localhost:5000/create-order",

        {
          method: "POST",
        }

      );

      const order =
        await res.json();

      console.log(order);

      // ✅ Razorpay Options

      const options = {

        key:
          "rzp_test_SjIZLiYPwqqkAe",

        amount:
          order.amount,

        currency:
          order.currency,

        order_id:
          order.id,

        name:
          "Rep AI",

        description:
          "Premium Plan",

        handler:
          async function (
            response
          ) {

            console.log(
              "PAYMENT SUCCESS"
            );

            console.log(response);

            try {

              // ✅ Verify Payment

              const verifyRes =
                await fetch(

                  "http://localhost:5000/verify-payment",

                  {

                    method: "POST",

                    headers: {
                      "Content-Type":
                        "application/json",
                    },

                    body:
                      JSON.stringify(
                        response
                      ),

                  }

                );

              const data =
                await verifyRes.json();

              console.log(data);

              // ✅ Payment Verified

              if (data.success) {

                const token =
                  localStorage.getItem(
                    "token"
                  );

                // ✅ Update Premium in DB

                const premiumRes =
                  await API.put(

                    "/auth/premium",

                    {},

                    {
                      headers: {
                        Authorization:
                          `Bearer ${token}`
                      }
                    }

                  );

                console.log(
                  premiumRes.data
                );

                // ✅ Save Premium

                localStorage.setItem(
                  "isPremium",
                  "true"
                );

                setIsPremium(true);

                alert(
                  "Premium Activated 🎉"
                );

                window.location.reload();

              } else {

                alert(
                  "Payment Verification Failed ❌"
                );

              }

            } catch (error) {

              console.log(error);

              alert(
                "Premium Update Failed ❌"
              );

            }

          },

        prefill: {

          name:
            user?.name || "",

          email:
            user?.email || ""

        },

        theme: {
          color: "#3399cc"
        }

      };

      // ✅ Open Razorpay

      const rzp =
        new window.Razorpay(
          options
        );

      rzp.open();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div style={{
      background: "black",
      color: "white",
      minHeight: "100vh",
      padding: "30px"
    }}>

      <h1>
        Dashboard 🚀
      </h1>

      {/* 👤 User Info */}
      {
        user && (

          <div>

            <h2>
              Welcome {user.name}
            </h2>

            <p>
              {user.email}
            </p>

          </div>

        )
      }

      {/* 🔥 Premium Status */}
      {
        isPremium ? (

          <h2 style={{
            color: "lime"
          }}>
            🔥 Premium User
          </h2>

        ) : (

          <h2 style={{
            color: "red"
          }}>
            Free User
          </h2>

        )
      }

      {/* 💰 Premium Button */}
      {
        !isPremium && (

          <button
            onClick={
              handlePayment
            }
            style={{
              padding: "12px 20px",
              background: "gold",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              borderRadius: "10px"
            }}
          >
            Buy Premium ₹299
          </button>

        )
      }

      <br /><br />

      {/* 🚪 Logout */}
      <button
        onClick={
          handleLogout
        }
        style={{
          padding: "10px 20px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>

      <br /><br />

      {/* 🤖 AI CHAT */}
      <AIChat />

    </div>

  );

};

export default Dashboard;