import { GlobeIcon } from "lucide-react";

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
    <footer className="flex flex-col w-full items-start justify-center px-4 md:px-8 lg:px-20 3xl:px-24 4xl:px-32 py-0 relative bg-blue-gray900">
      {/* Container pour centrer le contenu sur très grands écrans */}
      <div className="w-full max-w-[2400px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12 3xl:gap-16 4xl:gap-20 px-0 py-8 md:py-12 relative self-stretch w-full border-t border-b border-slate-700">
          {/* Product Column */}
          <div className="flex-col items-start flex relative">
            <div className="items-center gap-2 px-0 py-3 self-stretch w-full flex relative">
              <h3 className="relative w-fit mt-[-1.00px] font-subtitle-m font-[number:var(--subtitle-m-font-weight)] text-white text-sm md:text-base lg:text-[length:var(--subtitle-m-font-size)] 3xl:text-lg 4xl:text-xl tracking-[var(--subtitle-m-letter-spacing)] leading-[var(--subtitle-m-line-height)] whitespace-nowrap [font-style:var(--subtitle-m-font-style)]">
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
                    className="mt-[-1.00px] font-[number:var(--body-m-font-weight)] leading-[var(--body-m-line-height)] relative w-fit font-body-m text-blue-gray200 text-xs md:text-sm lg:text-[length:var(--body-m-font-size)] 3xl:text-base 4xl:text-lg tracking-[var(--body-m-letter-spacing)] whitespace-nowrap [font-style:var(--body-m-font-style)]"
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
              <h3 className="relative w-fit mt-[-1.00px] font-subtitle-m font-[number:var(--subtitle-m-font-weight)] text-white text-sm md:text-base lg:text-[length:var(--subtitle-m-font-size)] 3xl:text-lg 4xl:text-xl tracking-[var(--subtitle-m-letter-spacing)] leading-[var(--subtitle-m-line-height)] whitespace-nowrap [font-style:var(--subtitle-m-font-style)]">
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
                    className="mt-[-1.00px] font-[number:var(--body-m-font-weight)] leading-[var(--body-m-line-height)] relative w-fit font-body-m text-blue-gray200 text-xs md:text-sm lg:text-[length:var(--body-m-font-size)] 3xl:text-base 4xl:text-lg tracking-[var(--body-m-letter-spacing)] whitespace-nowrap [font-style:var(--body-m-font-style)]"
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
              <h3 className="relative w-fit mt-[-1.00px] font-subtitle-m font-[number:var(--subtitle-m-font-weight)] text-white text-sm md:text-base lg:text-[length:var(--subtitle-m-font-size)] 3xl:text-lg 4xl:text-xl tracking-[var(--subtitle-m-letter-spacing)] leading-[var(--subtitle-m-line-height)] whitespace-nowrap [font-style:var(--subtitle-m-font-style)]">
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
                    className="mt-[-1.00px] font-[number:var(--body-m-font-weight)] leading-[var(--body-m-line-height)] relative w-fit font-body-m text-blue-gray200 text-xs md:text-sm lg:text-[length:var(--body-m-font-size)] 3xl:text-base 4xl:text-lg tracking-[var(--body-m-letter-spacing)] whitespace-nowrap [font-style:var(--body-m-font-style)]"
                  >
                    {link}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media Column */}
          <div className="col-span-2 md:col-span-1 gap-2 flex flex-col items-start relative">
            <div className="items-center gap-2 px-0 py-3 self-stretch w-full flex relative">
              <h3 className="relative w-fit mt-[-1.00px] font-subtitle-m font-[number:var(--subtitle-m-font-weight)] text-white text-sm md:text-base lg:text-[length:var(--subtitle-m-font-size)] 3xl:text-lg 4xl:text-xl tracking-[var(--subtitle-m-letter-spacing)] leading-[var(--subtitle-m-line-height)] whitespace-nowrap [font-style:var(--subtitle-m-font-style)]">
                Follow Us
              </h3>
            </div>

            <div className="flex items-center gap-3 md:gap-4 3xl:gap-6 4xl:gap-8 relative self-stretch w-full">
              {socialIcons.map((icon, index) => (
                <a key={`social-${index}`} href="#" aria-label={icon.alt}>
                  <img
                    className="relative w-5 h-5 md:w-6 md:h-6 3xl:w-7 3xl:h-7 4xl:w-8 4xl:h-8 hover:opacity-80 transition-opacity"
                    alt={icon.alt}
                    src={icon.src}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 lg:gap-12 3xl:gap-16 4xl:gap-20 px-0 py-4 md:py-6 relative self-stretch w-full">
          <div className="relative flex-1 font-body-m font-[number:var(--body-m-font-weight)] text-blue-gray200 text-xs md:text-sm lg:text-[length:var(--body-m-font-size)] 3xl:text-base 4xl:text-lg tracking-[var(--body-m-letter-spacing)] leading-[var(--body-m-line-height)] [font-style:var(--body-m-font-style)] text-center md:text-left">
            Collers @ 2023. All rights reserved.
          </div>

          <div className="inline-flex flex-wrap items-center justify-center md:justify-end gap-4 md:gap-6 lg:gap-8 3xl:gap-10 4xl:gap-12 relative">
            {footerBottomLinks.map((link, index) => (
              <div
                key={`bottom-${index}`}
                className="inline-flex px-0 py-3 items-center gap-2 relative"
              >
                <a
                  href="#"
                  className="mt-[-1.00px] font-[number:var(--body-m-font-weight)] leading-[var(--body-m-line-height)] relative w-fit font-body-m text-blue-gray200 text-xs md:text-sm lg:text-[length:var(--body-m-font-size)] 3xl:text-base 4xl:text-lg tracking-[var(--body-m-letter-spacing)] whitespace-nowrap [font-style:var(--body-m-font-style)]"
                >
                  {link}
                </a>
              </div>
            ))}

            <div className="inline-flex px-0 py-3 items-center gap-2 relative">
              <GlobeIcon className="relative w-5 h-5 md:w-6 md:h-6 3xl:w-7 3xl:h-7 4xl:w-8 4xl:h-8 text-blue-gray200" />
              <span className="font-[number:var(--body-m-font-weight)] leading-[var(--body-m-line-height)] relative w-fit font-body-m text-blue-gray200 text-xs md:text-sm lg:text-[length:var(--body-m-font-size)] 3xl:text-base 4xl:text-lg tracking-[var(--body-m-letter-spacing)] whitespace-nowrap [font-style:var(--body-m-font-style)]">
                EN
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
