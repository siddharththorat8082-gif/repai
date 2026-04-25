import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Dumbbell } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    await login(email, password);
    console.log('Welcome back!'); // 
    navigate('/dashboard');
  } catch (error) {
    const detail = error.response?.data?.detail;
    const errorMsg = typeof detail === 'string' ? detail : 'Login failed';
    console.log(errorMsg); // 
  } finally {
    setLoading(false);
  }
};

  const handleGoogleLogin = () => {
    const redirectUrl = window.location.origin + '/dashboard';
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirectUrl)}`;
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-3 mb-8">
          <Dumbbell className="w-10 h-10 text-[#FF3B30]" />
          <h1 className="text-3xl font-black uppercase tracking-tighter text-white" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>REP AI</h1>
        </div>

        <div className="bg-[#141414] border border-white/10 rounded-md p-8">
          <h2 className="text-2xl font-bold uppercase mb-6 text-white text-center" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>LOGIN</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-[#A1A1AA]">EMAIL</Label>
              <Input 
                id="email"
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required
                className="bg-[#0A0A0A] border-white/10 text-white focus:border-[#FF3B30] mt-2"
                data-testid="login-email-input"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-[#A1A1AA]">PASSWORD</Label>
              <Input 
                id="password"
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
                className="bg-[#0A0A0A] border-white/10 text-white focus:border-[#FF3B30] mt-2"
                data-testid="login-password-input"
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-[#FF3B30] hover:bg-[#FF645A] text-white font-bold"
              data-testid="login-submit-btn"
            >
              {loading ? 'LOGGING IN...' : 'LOGIN'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-[#141414] px-2 text-[#71717A]">OR</span>
            </div>
          </div>

          <Button 
            onClick={handleGoogleLogin} 
            variant="outline" 
            className="w-full border-white/10 text-white hover:bg-white/10"
            data-testid="google-login-btn"
          >
            CONTINUE WITH GOOGLE
          </Button>

          <p className="text-center text-[#A1A1AA] text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#FF3B30] hover:underline" data-testid="goto-register-link">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;