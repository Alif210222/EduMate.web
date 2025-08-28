import React from 'react';
import Banner from '../../Components/Banner';
import CoreFeatures from '../../Components/coreFeature';
import WhyChooseEdumate from '../../Components/ChooseEdu';

const HomePage = () => {
    return (
        <div>
          <Banner></Banner>
          <CoreFeatures></CoreFeatures>
          <WhyChooseEdumate></WhyChooseEdumate>
        </div>
    );
};

export default HomePage;