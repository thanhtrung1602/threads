import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "~/pages/Auth/Register";
import Login from "~/pages/Auth/Login";
import { Toaster } from "react-hot-toast";
import Home from "~/pages/Home";
import DefaultLayout from "~/components/DefaultLayout";
import Profile from "~/pages/Profile";
import Detail from "~/pages/Home/detail";
import Search from "~/components/feature/search";
import ProtectedRoute from "./router";
import { useSelector } from "react-redux";

function App() {
  const currentUser = useSelector((state) => state?.auth.login.currentUser);
  return (
    <div id="app">
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DefaultLayout>
                  <Home />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:id"
            element={
              <ProtectedRoute>
                <DefaultLayout>
                  <Profile />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/:idUser/post/:id"
            element={
              <ProtectedRoute>
                <DefaultLayout>
                  <Detail />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <DefaultLayout>
                  <Search />
                </DefaultLayout>
              </ProtectedRoute>
            }
          />
          <Route path="/accounts/register" element={<Register />} />
          <Route
            path="/accounts/login"
            element={!currentUser ? <Login /> : <Home />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
