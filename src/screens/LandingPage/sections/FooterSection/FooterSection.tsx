import { GlobeIcon } from "lucide-react";
import React from "react";

export const FooterSection = (): JSX.Element => {
  // Product column links
  const productLinks = [
    "Pricing",
    "Overview",
    "Browse",
    "Accessibility",
    "Five",
  ];

  // Solutions column links
  const solutionLinks = [
    "Brainstorming",
    "Ideation",
    "Wireframing",
    "Research",
    "Design",
  ];

  // Support column links
  const supportLinks = [
    "Contact Us",
    "Developers",
    "Documentation",
    "Integrations",
    "Reports",
  ];

  // Footer bottom links
  const footerBottomLinks = ["Terms", "Privacy", "Contact"];

  // Social media icons
  const socialIcons = [
    {
      src: "/icon---jam-icons---outline---logos---youtube.svg",
      alt: "Icon jam icons youtube",
    },
    {
      src: "/icon---jam-icons---outline---logos---facebook.svg",
      alt: "Icon jam icons facebook",
    },
    {
      src: "/icon---jam-icons---outline---logos---twitter.svg",
      alt: "Icon jam icons twitter",
    },
    {
      src: "/icon---jam-icons---outline---logos---instagram.svg",
      alt: "Icon jam icons instagram",
    },
    {
      src: "/icon---jam-icons---outline---logos---linkedin.svg",
      alt: "Icon jam icons linkedin",
    },
  ];

  return (
    <footer className="flex flex-col w-full items-start justify-center px-4 md:px-8 lg:px-20 py-0 relative bg-blue-gray900">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12 px-0 py-8 md:py-12 relative self-stretch w-full border-t border-b border-slate-700">
        {/* Product Column */}
        <div className="flex-col items-start flex relative">
          <div className="items-center gap-2 px-0 py-3 self-stretch w-full flex relative">
            <h3 className="relative w-fit mt-[-1.00px] font-subtitle-m font-[number:var(--subtitle-m-font-weight)] text-white text-sm md:text-base lg:text-[length:var(--subtitle-m-font-size)] tracking-[var(--subtitle-m-letter-spacing)] leading-[var(--subtitle-m-line-height)] whitespace-nowrap [font-style:var(--subtitle-m-font-style)]">
              Product
            </h3>
          </div>

          <div className="flex flex-col items-start relative self-stretch w-full">
            {productLinks.map((link, index) => (
              <div
                key={`product-${index}`}
                className="items-center gap-2 px-0 py-3 self-stretch w-full flex relative"
              >
                <a
                  href="#"
                  className="mt-[-1.00px] font-[number:var(--body-m-font-weight)] leading-[var(--body-m-line-height)] relative w-fit font-body-m text-blue-gray200 text-xs md:text-sm lg:text-[length:var(--body-m-font-size)] tracking-[var(--body-m-letter-spacing)] whitespace-nowrap [font-style:var(--body-m-font-style)]"
                >
                  {link}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Solutions Column */}
        <div className="flex flex-col items-start relative">
          <div className="items-center gap-2 px-0 py-3 self-stretch w-full flex relative">
            <h3 className="relative w-fit mt-[-1.00px] font-subtitle-m font-[number:var(--subtitle-m-font-weight)] text-white text-sm md:text-base lg:text-[length:var(--subtitle-m-font-size)] tracking-[var(--subtitle-m-letter-spacing)] leading-[var(--subtitle-m-line-height)] whitespace-nowrap [font-style:var(--subtitle-m-font-style)]">
              Solutions
            </h3>
          </div>

          <div className="flex flex-col items-start relative self-stretch w-full">
            {solutionLinks.map((link, index) => (
              <div
                key={`solution-${index}`}
                className="items-center gap-2 px-0 py-3 self-stretch w-full flex relative"
              >
                <a
                  href="#"
                  className="mt-[-1.00px] font-[number:var(--body-m-font-weight)] leading-[var(--body-m-line-height)] relative w-fit font-body-m text-blue-gray200 text-xs md:text-sm lg:text-[length:var(--body-m-font-size)] tracking-[var(--body-m-letter-spacing)] whitespace-nowrap [font-style:var(--body-m-font-style)]"
                >
                  {link}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Support Column */}
        <div className="flex flex-col items-start relative">
          <div className="items-center gap-2 px-0 py-3 self-stretch w-full flex relative">
            <h3 className="relative w-fit mt-[-1.00px] font-subtitle-m font-[number:var(--subtitle-m-font-weight)] text-white text-sm md:text-base lg:text-[length:var(--subtitle-m-font-size)] tracking-[var(--subtitle-m-letter-spacing)] leading-[var(--subtitle-m-line-height)] whitespace-nowrap [font-style:var(--subtitle-m-font-style)]">
              Support
            </h3>
          </div>

          <div className="flex flex-col items-start relative self-stretch w-full">
            {supportLinks.map((link, index) => (
              <div
                key={`support-${index}`}
                className="items-center gap-2 px-0 py-3 self-stretch w-full flex relative"
              >
                <a
                  href="#"
                  className="mt-[-1.00px] font-[number:var(--body-m-font-weight)] leading-[var(--body-m-line-height)] relative w-fit font-body-m text-blue-gray200 text-xs md:text-sm lg:text-[length:var(--body-m-font-size)] tracking-[var(--body-m-letter-spacing)] whitespace-nowrap [font-style:var(--body-m-font-style)]"
                >
                  {link}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Get the App Column */}
        <div className="col-span-2 md:col-span-1 gap-2 flex flex-col items-start relative">
          <div className="items-center gap-2 px-0 py-3 self-stretch w-full flex relative">
            <h3 className="relative w-fit mt-[-1.00px] font-subtitle-m font-[number:var(--subtitle-m-font-weight)] text-white text-sm md:text-base lg:text-[length:var(--subtitle-m-font-size)] tracking-[var(--subtitle-m-letter-spacing)] leading-[var(--subtitle-m-line-height)] whitespace-nowrap [font-style:var(--subtitle-m-font-style)]">
              Get the App
            </h3>
          </div>

          <div className="flex flex-col items-start gap-2 relative self-stretch w-full">
            <img
              className="relative self-stretch w-full h-[46px]"
              alt="Button"
              src="/button.svg"
            />

            <div className="flex flex-col h-[46px] items-start justify-center gap-2.5 relative self-stretch w-full">
              <div className="relative w-[137px] h-10">
                <div className="relative w-[135px] h-10 bg-[url(/vector-6.svg)] bg-[100%_100%]">
                  <img
                    className="absolute w-[135px] h-10 top-0 left-0"
                    alt="Vector"
                    src="/vector-8.svg"
                  />

                  <div className="absolute top-1 left-10 [-webkit-text-stroke:0.2px_#ffffff] [font-family:'Open_Sans',Helvetica] font-normal text-white text-[8.4px] tracking-[0] leading-[normal]">
                    GET IT ON
                  </div>

                  <img
                    className="absolute w-[85px] h-[17px] top-[17px] left-[41px]"
                    alt="Vector"
                    src="/vector-3.svg"
                  />

                  <img
                    className="absolute w-4 h-[13px] top-[19px] left-2.5"
                    alt="Vector"
                    src="/vector-7.svg"
                  />

                  <img
                    className="absolute w-[13px] h-[11px] top-3.5 left-5"
                    alt="Vector"
                    src="/vector-9.svg"
                  />

                  <img
                    className="absolute w-[11px] h-[21px] top-[9px] left-2.5"
                    alt="Vector"
                    src="/vector-5.svg"
                  />

                  <img
                    className="absolute w-4 h-[13px] top-[7px] left-2.5"
                    alt="Vector"
                    src="/vector-4.svg"
                  />
                </div>
              </div>
            </div>

            <div className="flex pt-12 pb-3 px-0 self-stretch w-full items-center gap-2 relative">
              <h4 className="mt-[-1.00px] font-[number:var(--subtitle-m-font-weight)] leading-[var(--subtitle-m-line-height)] relative w-fit font-subtitle-m text-blue-gray200 text-sm md:text-base lg:text-[length:var(--subtitle-m-font-size)] tracking-[var(--subtitle-m-letter-spacing)] whitespace-nowrap [font-style:var(--subtitle-m-font-style)]">
                Follow Us
              </h4>
            </div>

            <div className="flex items-center gap-3 md:gap-4 relative self-stretch w-full">
              {socialIcons.map((icon, index) => (
                <a key={`social-${index}`} href="#" aria-label={icon.alt}>
                  <img
                    className="relative w-5 h-5 md:w-6 md:h-6"
                    alt={icon.alt}
                    src={icon.src}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 lg:gap-12 px-0 py-4 md:py-6 relative self-stretch w-full">
        <div className="relative flex-1 font-body-m font-[number:var(--body-m-font-weight)] text-blue-gray200 text-xs md:text-sm lg:text-[length:var(--body-m-font-size)] tracking-[var(--body-m-letter-spacing)] leading-[var(--body-m-line-height)] [font-style:var(--body-m-font-style)] text-center md:text-left">
          Collers @ 2023. All rights reserved.
        </div>

        <div className="inline-flex flex-wrap items-center justify-center md:justify-end gap-4 md:gap-6 lg:gap-8 relative">
          {footerBottomLinks.map((link, index) => (
            <div
              key={`bottom-${index}`}
              className="inline-flex px-0 py-3 items-center gap-2 relative"
            >
              <a
                href="#"
                className="mt-[-1.00px] font-[number:var(--body-m-font-weight)] leading-[var(--body-m-line-height)] relative w-fit font-body-m text-blue-gray200 text-xs md:text-sm lg:text-[length:var(--body-m-font-size)] tracking-[var(--body-m-letter-spacing)] whitespace-nowrap [font-style:var(--body-m-font-style)]"
              >
                {link}
              </a>
            </div>
          ))}

          <div className="inline-flex px-0 py-3 items-center gap-2 relative">
            <GlobeIcon className="relative w-5 h-5 md:w-6 md:h-6 text-blue-gray200" />
            <span className="font-[number:var(--body-m-font-weight)] leading-[var(--body-m-line-height)] relative w-fit font-body-m text-blue-gray200 text-xs md:text-sm lg:text-[length:var(--body-m-font-size)] tracking-[var(--body-m-letter-spacing)] whitespace-nowrap [font-style:var(--body-m-font-style)]">
              EN
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};