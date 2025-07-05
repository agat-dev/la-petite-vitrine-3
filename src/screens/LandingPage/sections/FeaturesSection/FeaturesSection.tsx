import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { AnimatedSection } from "../../../../components/ui/animated-section";

export const FeaturesSection = (): JSX.Element => {
  // Data for the decorative circles
  const decorativeCircles = [
    {
      size: "w-6 h-6",
      top: "top-[421px]",
      left: "left-[700px]",
      rounded: "rounded-xl",
    },
    {
      size: "w-6 h-6",
      top: "top-[272px]",
      left: "left-[575px]",
      rounded: "rounded-xl",
    },
    {
      size: "w-4 h-4",
      top: "top-0",
      left: "left-[203px]",
      rounded: "rounded-lg",
    },
    {
      size: "w-4 h-4",
      top: "top-[262px]",
      left: "left-[676px]",
      rounded: "rounded-lg",
    },
    {
      size: "w-[25px] h-[25px]",
      top: "top-[365px]",
      left: "left-[374px]",
      rounded: "rounded-[12.5px]",
    },
    {
      size: "w-[30px] h-[30px]",
      top: "top-[101px]",
      left: "left-[118px]",
      rounded: "rounded-[15px]",
    },
    {
      size: "w-4 h-4",
      top: "top-[401px]",
      left: "left-[161px]",
      rounded: "rounded-lg",
    },
    {
      size: "w-6 h-6",
      top: "top-[431px]",
      left: "left-[114px]",
      rounded: "rounded-xl",
    },
    {
      size: "w-6 h-6",
      top: "top-[231px]",
      left: "left-0",
      rounded: "rounded-xl",
    },
  ];

  return (
    <section className="flex flex-col min-h-[400px] md:min-h-[500px] lg:h-[717px] items-center justify-center gap-12 md:gap-16 lg:gap-20 p-4 md:p-8 lg:p-20 relative self-stretch w-full bg-amber-900">
      <img
        className="hidden lg:block absolute w-[1049px] h-[634px] top-[42px] left-[196px]"
        alt="Chart"
        src="/chart.svg"
      />

      <div className="hidden lg:block absolute w-[724px] h-[455px] top-[109px] left-[406px]">
        {decorativeCircles.map((circle, index) => (
          <div
            key={`circle-${index}`}
            className={`${circle.size} ${circle.top} ${circle.left} ${circle.rounded} absolute border-[3px] border-solid border-[#a3e635] animate-pulse`}
            style={{ animationDelay: `${index * 200}ms` }}
          />
        ))}
      </div>

      <AnimatedSection animation="scaleIn" className="w-full">
        <Card className="gap-8 self-stretch w-full border-none bg-transparent">
          <CardContent className="flex flex-col items-start gap-2 p-0">
            <h1 className="relative self-stretch mt-[-1.00px] font-heading-1-l font-[number:var(--heading-1-l-font-weight)] text-amber-50 text-4xl md:text-6xl lg:text-[length:var(--heading-1-l-font-size)] text-center tracking-[var(--heading-1-l-letter-spacing)] leading-[var(--heading-1-l-line-height)] [font-style:var(--heading-1-l-font-style)]">
              11,658,467
            </h1>
            <h2 className="text-amber-50 text-center relative self-stretch font-heading-2 font-[number:var(--heading-2-font-weight)] text-2xl md:text-4xl lg:text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
              Shoes Collected
            </h2>
          </CardContent>
        </Card>
      </AnimatedSection>

      <div className="hidden lg:inline-flex flex-col items-center justify-center absolute top-5 left-[225px]">
        <div className="w-8 h-8 top-[250px] left-28 bg-lime-200 rounded-2xl absolute border-[3px] border-solid border-[#a3e635]" />

        <AnimatedSection animation="slideUp" delay={400}>
          <Card className="flex flex-col w-[250px] items-start absolute top-[197px] left-[3px] bg-blue-gray200 rounded-[5px] border-none hover:scale-105 transition-transform duration-300">
            <CardContent className="flex items-start pt-4 pb-2 px-4 relative self-stretch w-full">
              <p className="relative flex-1 mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-normal text-blue-gray900 text-sm tracking-[0] leading-[14px]">
                <span className="text-slate-900 leading-[19.6px]">
                  Emma Simpson collected o
                </span>
                <span className="text-slate-900 leading-[0.1px]">
                  ne pair of{" "}
                </span>
                <span className="font-medium text-slate-900 leading-[15.4px]">
                  Cool Shoes
                </span>
                <span className="text-slate-900 leading-[19.6px]">.</span>
              </p>
            </CardContent>

            <img
              className="absolute w-3 h-1.5 top-16 left-[119px]"
              alt="Arrow bottom"
              src="/arrow-bottom.svg"
            />
          </Card>
        </AnimatedSection>

        <AnimatedSection animation="scaleIn" delay={600}>
          <div className="relative w-[266px] h-[210px] mt-[-13px] mb-[-5.00px] ml-[-5.00px] mr-[-5.00px] rounded-[10px] border-[5px] border-solid border-[#ffffff] [background:url(..//picture-6.png)_50%_50%_/_cover] hover:scale-105 transition-transform duration-500" />
        </AnimatedSection>
      </div>
    </section>
  );
};