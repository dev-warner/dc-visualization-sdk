import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import VisualizationProvider from "../utils/Visualization";

const LayoutDefault = ({ children }) => (
  <>
    <VisualizationProvider>
      <Header navPosition="right" className="reveal-from-bottom" />
      <main className="site-content">{children}</main>
      <Footer />
    </VisualizationProvider>
  </>
);

export default LayoutDefault;
