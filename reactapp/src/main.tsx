import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import InventoryAdd from "./components/InventoryAdd/InventoryAdd.js";
import UserList from "./components/Users/UserList.js";
import ContactList from "./components/Contacts/ContactList.js";
import CampaignList from "./components/Campaigns/CampaignList.js";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import SignIn from "./components/LoginPage/LoginForm.js";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={App} />
          <Route path="/inventory/add" Component={InventoryAdd} />
          <Route path="/users/list" Component={UserList} />
          <Route path="/login" Component={SignIn} />
          <Route path="/contact-list" Component={ContactList} />
          <Route path="/campaign/list" Component={CampaignList} />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  </React.StrictMode>
);
