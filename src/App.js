import Layout from "./components/Layout";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";

import Jobs from "./pages/Jobs/Jobs";
import UsersLogin from "./pages/Login/UserLogin";
import Login from "./pages/Login/Login";
import CompanyLogin from "./pages/Login/CompanyLogin";
import UserSignUp from "./pages/Login/UserSignUp";
import CompanySignUp from "./pages/Login/CompanySignUp";
import UserProfile from "./pages/Profile/UserProfile";

import CompanyProfile from "./pages/Profile/CompanyProfile";
import JobPostingForm from "./pages/Jobs/JobPostingForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="login" element={<Login />}/>
        <Route path="login/user" element={<UsersLogin/>}/>
        <Route path="user-profile/:userId" element={<UserProfile/>}/>
        <Route path="login/company" element={<CompanyLogin/>}/>
        <Route path="company-profile/:companyId" element={<CompanyProfile/>}/>
        <Route path="company/:companyId/postjobs" element={<JobPostingForm/>}/>
        <Route path="signup/user" element={<UserSignUp/>} />
        <Route path="signup/company" element={<CompanySignUp/>} />
      </Route>
    </Routes>
  );
}

export default App;
