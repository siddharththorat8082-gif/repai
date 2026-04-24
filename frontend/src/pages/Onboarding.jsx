import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import axios from 'axios';
import { toast } from 'sonner';

const Onboarding = () => {
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [fitnessGoal, setFitnessGoal] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${API_URL}/api/onboarding`,
        {
          age: parseInt(age),
          height: parseFloat(height),
          weight: parseFloat(weight),
          gender,
          fitness_goal: fitnessGoal,
          experience_level: experienceLevel
        },
        { withCredentials: true }
      );
      
      setUser({ ...user, onboarded: true });
      toast.success('Profile complete!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="bg-[#141414] border border-white/10 rounded-md p-8">
          <h2 className="text-3xl font-black uppercase mb-2 text-white text-center" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>BUILD YOUR PROFILE</h2>
          <p className="text-[#A1A1AA] text-center mb-8">Help us personalize your fitness journey</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-[#A1A1AA]">AGE</Label>
                <Input 
                  type="number" 
                  value={age} 
                  onChange={(e) => setAge(e.target.value)} 
                  required
                  className="bg-[#0A0A0A] border-white/10 text-white focus:border-[#FF3B30] mt-2"
                  data-testid="onboarding-age-input"
                />
              </div>

              <div>
                <Label className="text-[#A1A1AA]">GENDER</Label>
                <Select value={gender} onValueChange={setGender} required>
                  <SelectTrigger className="bg-[#0A0A0A] border-white/10 text-white mt-2" data-testid="onboarding-gender-select">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#141414] border-white/10">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-[#A1A1AA]">HEIGHT (cm)</Label>
                <Input 
                  type="number" 
                  step="0.1"
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)} 
                  required
                  className="bg-[#0A0A0A] border-white/10 text-white focus:border-[#FF3B30] mt-2"
                  data-testid="onboarding-height-input"
                />
              </div>

              <div>
                <Label className="text-[#A1A1AA]">WEIGHT (kg)</Label>
                <Input 
                  type="number" 
                  step="0.1"
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)} 
                  required
                  className="bg-[#0A0A0A] border-white/10 text-white focus:border-[#FF3B30] mt-2"
                  data-testid="onboarding-weight-input"
                />
              </div>
            </div>

            <div>
              <Label className="text-[#A1A1AA]">FITNESS GOAL</Label>
              <Select value={fitnessGoal} onValueChange={setFitnessGoal} required>
                <SelectTrigger className="bg-[#0A0A0A] border-white/10 text-white mt-2" data-testid="onboarding-goal-select">
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent className="bg-[#141414] border-white/10">
                  <SelectItem value="fat_loss">Fat Loss</SelectItem>
                  <SelectItem value="muscle_gain">Muscle Gain</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-[#A1A1AA]">EXPERIENCE LEVEL</Label>
              <Select value={experienceLevel} onValueChange={setExperienceLevel} required>
                <SelectTrigger className="bg-[#0A0A0A] border-white/10 text-white mt-2" data-testid="onboarding-experience-select">
                  <SelectValue placeholder="Select your experience" />
                </SelectTrigger>
                <SelectContent className="bg-[#141414] border-white/10">
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              type="submit" 
              disabled={loading} 
              className="w-full bg-[#FF3B30] hover:bg-[#FF645A] text-white font-bold py-6 text-lg"
              data-testid="onboarding-submit-btn"
            >
              {loading ? 'SAVING...' : 'COMPLETE PROFILE'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;