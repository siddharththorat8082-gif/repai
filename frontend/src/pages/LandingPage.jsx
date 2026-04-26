import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Welcome to RepAI 🚀</h1>
      <p>Your AI-powered platform</p>

      <br />

      <button onClick={() => navigate('/login')}>
        Login
      </button>

      <br /><br />

      <button onClick={() => navigate('/register')}>
        Register
      </button>
    </div>
  );
}

export default LandingPage;