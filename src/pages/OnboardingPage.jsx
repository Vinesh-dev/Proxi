import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Check, User, GraduationCap, Compass } from "lucide-react";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";

const AVAILABLE_INTERESTS = [
  "Artificial Intelligence",
  "Entrepreneurship",
  "Badminton",
  "Coffee",
  "Late-night studying",
  "Gaming",
  "Music Production",
  "Hiking",
  "Photography",
  "Hackathons",
  "Board Games",
  "Anime",
];

const AVAILABLE_GOALS = [
  { id: "friends", label: "Find Friends" },
  { id: "study", label: "Study Partner" },
  { id: "project", label: "Project Collab" },
  { id: "network", label: "Networking" },
];

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nickname: "",
    department: "",
    yearOfStudy: "1st Year",
    selectedInterests: [],
    selectedGoals: [],
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const toggleInterest = (interest) => {
    setFormData((prev) => {
      const isSelected = prev.selectedInterests.includes(interest);
      const newInterests = isSelected
        ? prev.selectedInterests.filter((i) => i !== interest)
        : [...prev.selectedInterests, interest];
      return { ...prev, selectedInterests: newInterests };
    });
  };

  const toggleGoal = (goalId) => {
    setFormData((prev) => {
      const isSelected = prev.selectedGoals.includes(goalId);
      const newGoals = isSelected
        ? prev.selectedGoals.filter((g) => g !== goalId)
        : [...prev.selectedGoals, goalId];
      return { ...prev, selectedGoals: newGoals };
    });
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.nickname.trim()) {
      newErrors.nickname = "Nickname is required";
    }
    if (!formData.department.trim()) {
      newErrors.department = "Department/Course is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.selectedInterests.length === 0) {
      alert("Please select at least one interest to help find matches!");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(`Onboarding completed! Welcome, ${formData.nickname}!`);
      navigate("/");
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black px-6 py-12 flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-900/40 backdrop-blur-xl border border-slate-800/80 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Progress indicator */}
        <div className="flex justify-between items-center mb-8">
          <span className="text-xs font-semibold text-cyan-400 tracking-wider uppercase">
            Step {step} of 2
          </span>
          <div className="flex gap-1.5">
            <div
              className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
                step >= 1 ? "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" : "bg-slate-700"
              }`}
            />
            <div
              className={`h-1.5 w-8 rounded-full transition-all duration-300 ${
                step >= 2 ? "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]" : "bg-slate-700"
              }`}
            />
          </div>
        </div>

        {step === 1 ? (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                Create Profile <Sparkles size={24} className="text-cyan-400" />
              </h1>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Choose an alias. Your real identity is kept private until you choose to reveal it.
              </p>
            </div>

            <div className="space-y-4">
              <InputField
                label="Display Nickname"
                name="nickname"
                value={formData.nickname}
                onChange={handleTextChange}
                placeholder="e.g. Neo, CyberJedi, CoffeeLover"
                error={errors.nickname}
                icon={User}
                required
              />

              <InputField
                label="Academic Course / Department"
                name="department"
                value={formData.department}
                onChange={handleTextChange}
                placeholder="e.g. Computer Science, Mechanical Eng"
                error={errors.department}
                icon={GraduationCap}
                required
              />

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5 pl-1">
                  Year of Study
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["1st Year", "2nd Year", "3rd Year", "4th Year", "Graduate"].map((year) => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, yearOfStudy: year }))}
                      className={`py-2 px-1 text-xs font-semibold rounded-xl border transition-all ${
                        formData.yearOfStudy === year
                          ? "bg-cyan-500/10 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.15)]"
                          : "bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={handleNext}>Next Page</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
                Your Interests <Compass size={24} className="text-cyan-400" />
              </h1>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Select your goals and interests to find compatible students nearby.
              </p>
            </div>

            <div className="space-y-5">
              {/* Goals */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2.5 pl-1">
                  What are you looking for?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {AVAILABLE_GOALS.map((goal) => {
                    const isSelected = formData.selectedGoals.includes(goal.id);
                    return (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => toggleGoal(goal.id)}
                        className={`py-2.5 px-3 text-xs font-semibold rounded-xl border flex items-center justify-between transition-all ${
                          isSelected
                            ? "bg-cyan-500/10 border-cyan-400 text-cyan-300"
                            : "bg-slate-900/60 border-slate-700 text-slate-400 hover:border-slate-600 hover:text-slate-200"
                        }`}
                      >
                        <span>{goal.label}</span>
                        {isSelected && <Check size={14} className="text-cyan-400" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2.5 pl-1">
                  Select Interests & Hobbies
                </label>
                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
                  {AVAILABLE_INTERESTS.map((interest) => {
                    const isSelected = formData.selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => toggleInterest(interest)}
                        className={`py-1.5 px-3.5 text-xs font-medium rounded-full border transition-all ${
                          isSelected
                            ? "bg-cyan-500 border-cyan-400 text-white shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                            : "bg-slate-900/60 border-slate-700 text-slate-300 hover:border-slate-600 hover:text-slate-100"
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 py-3 border border-slate-700 hover:border-slate-600 font-semibold text-slate-300 hover:text-white rounded-xl transition-colors bg-transparent"
              >
                Back
              </button>
              <div className="flex-1">
                <Button onClick={handleSubmit} className="relative overflow-hidden group">
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving...</span>
                    </div>
                  ) : (
                    <span>Submit</span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default OnboardingPage;
