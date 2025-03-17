import { Routes, Route, Navigate } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import HomePage from "./pages/HomePage";
import App from "./App"; // Import the App component

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="category" element={<Navigate to="/category/all" replace />} />
        <Route path="category/:slug" element={<CategoryPage />} />
      </Route>
    </Routes>
  );
}
