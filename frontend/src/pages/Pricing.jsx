import Navbar from "../components/Navbar";

const Pricing = () => {

  return (

    <div
      style={{
        background: "black",
        minHeight: "100vh",
        color: "white"
      }}
    >

      <Navbar />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "100px"
        }}
      >

        <div
          style={{
            background: "#111",
            padding: "50px",
            borderRadius: "20px",
            width: "350px",
            textAlign: "center",
            border: "2px solid #00ff99"
          }}
        >

          <h1
            style={{
              fontSize: "40px"
            }}
          >
            Premium 💎
          </h1>

          <h2
            style={{
              color: "#00ff99",
              fontSize: "55px"
            }}
          >
            ₹299
          </h2>

          <p style={{ color: "#aaa" }}>
            One Time Payment
          </p>

          <div
            style={{
              marginTop: "30px",
              textAlign: "left"
            }}
          >

            <p>✔ Unlimited AI Chat</p>
            <p>✔ Premium Features</p>
            <p>✔ Faster Responses</p>
            <p>✔ Future Updates</p>

          </div>

          <button
            style={{
              marginTop: "30px",
              background: "#00ff99",
              color: "black",
              border: "none",
              padding: "15px 30px",
              borderRadius: "10px",
              fontWeight: "bold",
              cursor: "pointer",
              width: "100%"
            }}
          >
            Buy Premium
          </button>

        </div>

      </div>

    </div>

  );

};

export default Pricing;