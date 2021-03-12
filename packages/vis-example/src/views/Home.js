import React from "react";
import Hero from "../components/sections/Hero";
import FeaturesTiles from "../components/sections/FeaturesTiles";
import FeaturesSplit from "../components/sections/FeaturesSplit";
import Testimonial from "../components/sections/Testimonial";
import Cta from "../components/sections/Cta";

import { useContent } from "../utils/Visualization";

const Home = () => {
  const { content } = useContent("realtime-v1");

  return (
    <>
      <Hero className="illustration-section-01" {...(content.hero || {})} />
      <FeaturesTiles {...content.features} />
      <FeaturesSplit
        invertMobile
        topDivider
        imageFill
        className="illustration-section-02"
        {...(content.workflows || {})}
      />
      <Testimonial topDivider {...(content.testimonials || {})} />
      <Cta split />
    </>
  );
};

export default Home;
