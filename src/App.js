import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar from "./components/templates/Navbar";
import Profile from "./components/users/Profile";
import Login from "./components/common/Login";
import Wallet from "./components/users/Wallet";
import USRLST from "./components/users/UsersList";
import Food from "./components/vendors/food";
import OrderBuyer from "./components/users/OrderBuyer";
import OrdersVendor from "./components/vendors/OrderVendor";
import MyOrders from "./components/users/MyOrders";
import Statistics from "./components/vendors/statistics";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

function App() {

  if (localStorage.getItem('log') === "1") {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="usrlst" element={<USRLST />} />
            <Route path="order" element={<OrderBuyer />} />
            <Route path="myorders" element={<MyOrders />} />

          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  else if (localStorage.getItem('log') === "2") {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="food" element={<Food />} />
            <Route path="orders" element={<OrdersVendor />} />
            <Route path="stats" element={<Statistics />} />

          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }


}

export default App;
