import React from 'react';
import Banner from '../../Components/Banner';
import CoreFeatures from '../../Components/coreFeature';
import WhyChooseEdumate from '../../Components/ChooseEdu';
import HowItWorks from '../../Components/HowItWork';

const HomePage = () => {
    return (
        <div>
          <Banner></Banner>
          <CoreFeatures></CoreFeatures>
          <WhyChooseEdumate></WhyChooseEdumate>
          <HowItWorks></HowItWorks>
        </div>
    );
};

export default HomePage;