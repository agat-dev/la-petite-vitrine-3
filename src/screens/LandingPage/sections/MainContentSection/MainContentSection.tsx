import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { AnimatedSection } from "../../../../components/ui/animated-section";
import StyledWrapper from "../../../../components/ui/button-ui";
import { DemoPopup } from "../../../../components/ui/demo-popup";

export const MainContentSection = (): JSX.Element => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Benefits list data
  const benefits = [
    "Est et in pharetra magna adipiscing ornare aliquam.",
    "Tellus arcu sed consequat ac velit ut eu blandit.",
    "Ullamcorper ornare in et egestas dolor orci.",
  ];

  return (
    <section className="max-w-[1400px] mx-auto flex flex-col items-start py-20 md:py-32 lg:py-40 3xl:py-48 4xl:py-56 relative self-stretch w-full">
      {/* Container pour centrer le contenu sur très grands écrans */}
      <div className="w-full max-w-[2400px] mx-auto">
        <AnimatedSection animation="scaleIn" className="w-full">
          <Card className="flex flex-col lg:flex-row min-h-[400px] lg:h-[496px] 3xl:h-[600px] 4xl:h-[700px] items-center gap-8 lg:gap-20 3xl:gap-24 4xl:gap-32 p-6 md:p-12 lg:p-20 3xl:p-24 4xl:p-32 relative self-stretch w-full rounded-[20px] lg:rounded-[30px] transition-all duration-500">
            <div className="flex flex-col items-start gap-6 relative w-full lg:w-auto">
              <AnimatedSection animation="slideRight" delay={200}>
                <div className="w-full lg:w-[520px] 3xl:w-[640px] 4xl:w-[800px] gap-6 flex flex-col items-start relative">
                  <div className="flex-col items-start gap-2 flex relative self-stretch w-full">
                    <h2 className="mt-[-1.00px] text-blue-gray900 relative self-stretch font-heading-2 font-medium text-5xl md:text-6xl 3xl:text-7xl 4xl:text-8xl tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
                      Voir <span className="pt-4 font-serif italic text-amber-800">les démos</span>
                    </h2>
                  </div>
                </div>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={400}>
              <div className="flex flex-col items-start relative gap-2">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center gap-2 relative group"
                    style={{ animationDelay: `${600 + index * 100}ms` }}
                  >
                    <CheckIcon className="w-6 h-6 text-green-600 transition-transform duration-300 group-hover:scale-110" />
                    <p className="relative w-fit mt-[-2.00px] font-body-XL font-[number:var(--body-XL-font-weight)] text-blue-gray900 text-base md:text-lg lg:text-[length:var(--body-XL-font-size)] tracking-[var(--body-XL-letter-spacing)] leading-[var(--body-XL-line-height)] [font-style:var(--body-XL-font-style)]">
                      {benefit}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={800}>
              <div onClick={() => setIsPopupOpen(true)} className="cursor-pointer">
                <StyledWrapper>
                  Voir une démo
                </StyledWrapper>
              </div>
            </AnimatedSection>
          </div>

          {/* Decorative shapes - hidden on mobile */}
          <div className="hidden lg:block absolute w-[500px] h-[600px] top-[-60px] right-[100px] overflow-hidden">
            <div className="relative h-[500px] w-full">
              <div className="absolute w-[500px] h-[500px] top-0 left-0">
                <div className="absolute w-[400px] h-[150px] top-[150px] left-[20px] bg-amber-200 -rotate-45" />
                <div className="absolute w-[60px] h-[60px] top-[350px] left-[300px] bg-fuchsia-700 rounded-[30px] opacity-75" />
                <div className="w-[70px] h-[70px] top-[100px] left-[50px] bg-amber-700 absolute rounded-[30px] opacity-75" />
                <div className="w-[150px] h-[150px] top-[280px] left-[320px] bg-pink-700 absolute rounded-[50px] opacity-75" />
              </div>
              <div className="w-[50px] h-[50px] top-[40px] left-[350px] bg-blue-light700 rounded-[50px] absolute opacity-75" />
            </div>
          </div>

          <AnimatedSection animation="slideLeft" delay={600}>
            <Card className="flex flex-col h-[300px] md:h-[350px] lg:h-[450px] items-center relative flex-1 grow mt-0 lg:mt-[-7.00px] mb-0 lg:mb-[-7.00px] rounded-[15px] lg:rounded-[20px] overflow-hidden border-[3px] lg:border-[5px] border-solid border-[#ffffff] hover:scale-105 transition-transform duration-500">
              <div className="bg-amber-100 h-[30px] items-center gap-7 px-4 py-2 flex relative self-stretch w-full">
                <div className="flex items-start gap-[5px] relative flex-1 grow">
                  {[1, 2, 3].map((_, index) => (
                    <img
                      key={index}
                      className="relative w-2.5 h-2.5"
                      alt="Browser window control"
                      src="/icon---jam-icons---filled---circle-f.svg"
                    />
                  ))}
                </div>
              </div>

              <CardContent className="flex items-center justify-center gap-2.5 relative flex-1 self-stretch w-full grow [background:url(../artisan-mobile.jpg)_50%_50%] bg-no-repeat bg-center bg-cover">
                <div className="w-40 inline-flex justify-center pl-7 pr-5 py-6 rounded-[100px] items-center relative hover:bg-overlaydark-75/80 transition-colors duration-300 group">
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>

          {/* Additional decorative shape - hidden on mobile */}
          <div className="hidden lg:block absolute w-[85px] h-[86px] top-[373px] left-[750px] bg-green-700 rounded-[50px] opacity-75" />
        </Card>
      </AnimatedSection>

      {/* Demo Popup */}
      <DemoPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      </div>
    </section>
  );
};