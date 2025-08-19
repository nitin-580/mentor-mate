import { Routes, Route, Link } from "react-router-dom"
import LoginPage from "./pages/login.tsx"
import SignupPage from "./pages/register.tsx"
import VerifyOtpPage from "./pages/otp.tsx";
import MentorGrid from "./pages/mentor-listing.tsx";

function App() {
  return (
    <div>
      {/* Navigation links */}
      <nav>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/signup">Signup</Link> |{" "}
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/mentor-listing" element={<MentorGrid />} />
      </Routes>
    </div>
  )
}

export default App;
