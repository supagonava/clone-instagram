import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/index";
import LoginPage from "@/pages/login";

const Router = () => {
    return (
        <Routes>
            <Route path="/" index element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
        </Routes>
    );
};

export default Router;
