import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";

//Admin
import AdminTasks from "./pages/Admin/Tasks/Tasks";
import ClaimsA from "./pages/Admin/Claims/Claims";
import EditClaimA from "./pages/Admin/Claims/EditClaim";
import ViewClaimA from "./pages/Admin/Claims/ViewClaim";
import Managers from "./pages/Admin/Users/Manager";
import Developers from "./pages/Admin/Users/Developers";
import Client from "./pages/Admin/Users/Clients";
import Companies from "./pages/Admin/Users/Companies";

//developer
import DevTasks from "./pages/Developer/Tasks";

//Client
import ClaimsC from "./pages/Client/Claims";
import AddClaimC from "./pages/Client/AddClaim";
import EditClaimC from "./pages/Client/EditClaim";
import ViewClaimC from "./pages/Client/ViewClaim";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/contact" element={<Contact />}></Route>
        <Route exact path="/logout" element={<Logout />} />
        <Route exact path="/profile" element={<Profile />} />


        {/* Admin */}
        <Route exact path="/tasks" element={<AdminTasks />} />

        <Route path="/claimsAdmin" element={<ClaimsA />} />
        <Route path={"/claimsAdmin/edit/:id"} element={<EditClaimA />} />
        <Route path={"/claimsAdmin/view/:id"} element={<ViewClaimA />} />

        <Route path="/users/managers" element={<Managers />} />
        <Route path="/users/developers" element={<Developers />} />
        <Route path="/users/clients" element={<Client />} />
        <Route path="/users/companies" element={<Companies />} />
        

        {/* Developer */}
        <Route exact path="/tasksDev" element={<DevTasks />} />


        {/* Client */}
        <Route>
          <Route path="/claims" element={<ClaimsC />} />
          <Route path="/claims/addClaim" element={<AddClaimC />} />
          <Route path={"/claims/edit/:id"} element={<EditClaimC />} />
          <Route path={"/claims/view/:id"} element={<ViewClaimC />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
