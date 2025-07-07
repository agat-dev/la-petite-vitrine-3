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
