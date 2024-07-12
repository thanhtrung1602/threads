import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "~/pages/Auth/Register";
import Login from "~/pages/Auth/Login";
import { Toaster } from "react-hot-toast";
import Home from "~/pages/Home";
import DefaultLayout from "~/components/DefaultLayout";
// import Detail from "./pages/Home/detail";
import Profile from "~/pages/Profile";
import Detail from "~/pages/Home/detail";
import Search from "~/components/feature/search";

function App() {
  return (
    <div id="app">
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <DefaultLayout>
                <Home />
              </DefaultLayout>
            }
          />
          <Route
            path="/:id"
            element={
              <DefaultLayout>
                <Profile />
              </DefaultLayout>
            }
          />
          <Route
            path="/:idUser/post/:id"
            element={
              <DefaultLayout>
                <Detail />
              </DefaultLayout>
            }
          />
          <Route
            path="/search"
            element={
              <DefaultLayout>
                <Search />
              </DefaultLayout>
            }
          />
          <Route path="/accounts/register" element={<Register />} />
          <Route path="/accounts/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
