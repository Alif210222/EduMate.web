import React from 'react';
import Banner from '../../Components/Banner';
import CoreFeatures from '../../Components/coreFeature';
import WhyChooseEdumate from '../../Components/ChooseEdu';
import HowItWorks from '../../Components/HowItWork';
import FAQ from '../../Components/FAQSection';
import BlogSection from '../../Components/BlogSection';

const HomePage = () => {
    return (
        <div>
          <Banner></Banner>
          <CoreFeatures></CoreFeatures>
          <WhyChooseEdumate></WhyChooseEdumate>
          <HowItWorks></HowItWorks>
          <BlogSection></BlogSection>
          <FAQ></FAQ>
        </div>
    );
};

export default HomePage;