import React, { useState } from "react";
import { MenuIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";

export const HeaderSection = (): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Démos", href: "#demos" },
    { label: "Tarifs", href: "#products" },
  ];

  return (
    <header className="flex items-center justify-between px-4 md:px-8 lg:px-20 py-4 md:py-6 relative self-stretch w-full flex-[0_0_auto] bg-transparent">
      {/* Logo/Brand Name */}
      <div className="relative w-fit font-heading-5 font-[number:var(--heading-5-font-weight)] text-amber-900 text-xl md:text-2xl lg:text-[length:var(--heading-5-font-size)] tracking-[var(--heading-5-letter-spacing)] leading-[var(--heading-5-line-height)] whitespace-nowrap [font-style:var(--heading-5-font-style)]">
        <img
          className="w-12 h-12 md:w-16 md:h-16"
          alt="Logo"
          src="/logo-pv.png"
        />
      </div>

      {/* Navigation and Sign Up Button */}
      <div className="inline-flex items-center gap-2 md:gap-4 relative flex-[0_0_auto]">
        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList className="flex gap-2">
            {navItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  href={item.href}
                  className="inline-flex items-center gap-2 px-2 py-3 relative self-stretch flex-[0_0_auto]"
                >
                  <span className="relative w-fit mt-[-1.00px] font-button-m font-[number:var(--button-m-font-weight)] text-gray-900 text-[length:var(--button-m-font-size)] tracking-[var(--button-m-letter-spacing)] leading-[var(--button-m-line-height)] whitespace-nowrap [font-style:var(--button-m-font-style)]">
                    {item.label}
                  </span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Button */}
        <div
          className="lg:hidden p-2 cursor-pointer"
          onClick={() => setMobileOpen(true)}
        >
          <MenuIcon className="w-6 h-6 text-amber-900" />
        </div>
      </div>

      {/* Mobile Drawer avec effet Framer Motion */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-amber-50 w-64 h-full shadow-lg p-6 flex flex-col gap-6"
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -80, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center mb-6">
                <img
                  className="w-12 h-12"
                  alt="Logo"
                  src="/logo-pv.png"
                />
                <button onClick={() => setMobileOpen(false)}>
                  <X className="w-6 h-6 text-amber-900" />
                </button>
              </div>
              <nav className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="text-blue-gray900 text-lg font-medium hover:text-amber-700 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </motion.div>
            {/* Click outside to close */}
            <div className="flex-1" onClick={() => setMobileOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
