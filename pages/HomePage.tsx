import React from 'react';
import { Hero } from '../components/Hero';
import { HowCanIHelp } from '../components/HowCanIHelp';
import { Services } from '../components/Services';
import { SellingServices } from '../components/SellingServices';
import { Comparison } from '../components/Comparison';
import { MoneySaved } from '../components/MoneySaved';
import { CTAStrip } from '../components/CTAStrip';
import { SectionHeading } from '../components/SectionHeading';
import { Button } from '../components/Button';
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <SectionHeading
            title="Crea il tuo pacchetto personalizzato"
            subtitle="Combina i servizi che ti servono e ricevi un preventivo su misura."
            centered
          />
          <Button href="/crea-pacchetto" className="mx-auto">
            Crea il tuo pacchetto
          </Button>
        </div>
      </section>
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
