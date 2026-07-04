import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import Landing from "./components/layouts/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layouts/Alert";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import Dashboard from "./components/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Documentation from "./components/pages/Documentation";
import ApiReference from "./components/pages/ApiReference";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";


// Check for token and set auth token header
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              element={
                <section className="container">
                  <Alert />
                  <Outlet />
                </section>
              }
            >
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profiles" element={<Profiles />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/api" element={<ApiReference />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route
                path="/dashboard"
                element={<PrivateRoute element={Dashboard} />}
              />
              <Route
                path="/create-profile"
                element={<PrivateRoute element={CreateProfile} />}
              />
              <Route
                path="/edit-profile"
                element={<PrivateRoute element={EditProfile} />}
              />
              <Route
                path="/add-experience"
                element={<PrivateRoute element={AddExperience} />}
              />
              <Route
                path="/add-education"
                element={<PrivateRoute element={AddEducation} />}
              />
              <Route
                path="/posts"
                element={<PrivateRoute element={Posts} />}
              />
              <Route
                path="/posts/:id"
                element={<PrivateRoute element={Post} />}
              />
            </Route>
          </Routes>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
};

export default App;
