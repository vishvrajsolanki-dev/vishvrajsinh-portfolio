import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { ThemeProvider } from "./hooks/useTheme";
import { CaseStudyPage } from "./pages/CaseStudyPage";
import { HomePage } from "./pages/HomePage";
import "./styles/global.css";

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<CaseStudyPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}
