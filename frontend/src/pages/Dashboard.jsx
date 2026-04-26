import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };
const handlePayment = async () => {
  const options = {
    key: rzp_test_Si7pgj8Su2KnKF,
    amount: 29900,
    currency: "INR",
    name: "RepAI",
    description: "Premium Subscription",
    handler: function (response) {
      alert("Payment Successful 🎉");
      console.log(response);
    },
    prefill: {
      email: "user@example.com"
    },
    theme: {
      color: "#FF3B30"
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

  return (
    <div>
      <h1>Dashboard Page</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handlePayment}>
       Buy Premium ₹299
    </button>
    </div>
  );
};

export default Dashboard;