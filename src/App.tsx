import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";
import SchedulePage from "./pages/SchedulePage";
import GolivePage from "./pages/GolivePage";
import PrivatePage from "./pages/PrivatePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/dashboard" element={<PrivatePage />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="schedule" element={<SchedulePage />} />
          <Route path="golive" element={<GolivePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
