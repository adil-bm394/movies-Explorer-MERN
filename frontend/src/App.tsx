import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ErrorBoundary from "./components/common/ErrorBoundary";
import MoviesListPage from "./pages/MoviesListPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MoviesDetailPage from "./pages/MoviesDetailPage";
import FavoritesPage from "./pages/FavouritesPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <div>
      <ToastContainer />
      <ErrorBoundary>
        <Navbar />
        <Routes>
          <Route path="/" element={<MoviesListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/movies/:id" element={<MoviesDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </ErrorBoundary>
    </div>
  );
};

export default App;
