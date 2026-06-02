import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Home.css";

const Home = () => {

  return (

    <div className="home">

      <Navbar />

      {/* HERO */}
      <section className="hero">

        <h1>
          AI Powered Platform
          For Future Builders 🚀
        </h1>

        <p>
          Rep AI helps students, developers and creators
          build smarter with powerful AI tools.
        </p>

        <div className="heroButtons">

          <Link
            to="/register"
            className="primaryBtn"
          >
            Start Free
          </Link>

          <Link
            to="/login"
            className="secondaryBtn"
          >
            Login
          </Link>

        </div>

      </section>

      {/* FEATURES */}
      <section className="features">

        <h2>
          Powerful Features ⚡
        </h2>

        <div className="featureGrid">

          <div className="card">

            <h3>AI Chat</h3>

            <p>
              Smart AI assistant for instant answers,
              coding help and productivity.
            </p>

          </div>

          <div className="card">

            <h3>Premium Access</h3>

            <p>
              Unlock advanced AI features with
              premium membership.
            </p>

          </div>

          <div className="card">

            <h3>Fast Performance</h3>

            <p>
              Optimized backend and modern UI
              for smooth experience.
            </p>

          </div>

        </div>

      </section>

      {/* PRICING */}
      <section className="pricing">

        <h2>
          Pricing 💎
        </h2>

        <div className="pricingCard">

          <h3>Premium Plan</h3>

          <h1>₹299</h1>

          <p>
            One time premium access
          </p>

          <div className="pricingFeatures">

            <p>✔ Unlimited AI Chat</p>
            <p>✔ Premium Features</p>
            <p>✔ Fast Responses</p>
            <p>✔ Future Updates</p>

          </div>

          <Link
            to="/register"
            className="primaryBtn"
          >
            Buy Now
          </Link>

        </div>

      </section>

      {/* CTA */}
      <section className="cta">

        <h1>
          Ready To Build With AI?
        </h1>

        <p>
          Join Rep AI today and unlock your productivity.
        </p>

        <Link
          to="/register"
          className="primaryBtn"
        >
          Get Started Free
        </Link>

      </section>

      {/* FOOTER */}
      <footer className="footer">

        © 2026 Rep AI. All Rights Reserved.

      </footer>

    </div>

  );

};

export default Home;