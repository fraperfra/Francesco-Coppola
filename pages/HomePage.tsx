import React from 'react';
import { Hero } from '../components/Hero';
import { HowCanIHelp } from '../components/HowCanIHelp';
import { Services } from '../components/Services';
import { SellingServices } from '../components/SellingServices';
import { Comparison } from '../components/Comparison';
import { MoneySaved } from '../components/MoneySaved';
import { CTAStrip } from '../components/CTAStrip';
import { OurOffice } from '../components/OurOffice';
import { Process } from '../components/Process';
import { PostOffer } from '../components/PostOffer';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Reassurance } from '../components/Reassurance';
import { Testimonials } from '../components/Testimonials';
import { Pricing } from '../components/Pricing';
import { Blog } from '../components/Blog';

export const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <HowCanIHelp />
      <Services />
      <SellingServices />
      <Comparison />
      <MoneySaved />
      <CTAStrip />
      <OurOffice />
      <Process />
      <PostOffer />
      <WhyChooseUs />
      <Reassurance />
      <Testimonials />
      <Pricing />
      <Blog />
    </>
  );
};
