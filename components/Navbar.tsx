"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Menu, Search } from "lucide-react";
import { HelpCircle, Users, UserPlus, LogIn, Gift, Home } from "lucide-react";

interface MenuItem {
  title: string;
  url: string;
  icon?: string;
  isNew?: boolean;
}

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);
  const [activeSearch, setActiveSearch] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'bn'>('en');

  const menuRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lang: 'en' | 'bn') => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const translations = {
    en: {
      search: "Start your search",
      homes: "Homes",
      experiences: "Experiences",
      services: "Services",
      becomeHost: "Become a host",
      helpCenter: "Help Center",
      findCoHost: "Find a co-host",
      giftCard: "Gift card",
      signUp: "Sign up",
      logIn: "Log in",
      anywhere: "Anywhere",
      checkIn: "Check in",
      checkOut: "Check Out",
      addDates: "Add dates",
      guests: "Guests",
      addGuests: "Add guests",
      where: "Where",
      searchDestinations: "Search destinations",
      who: "Who",
      new: "new"
    },
    bn: {
      search: "আপনার অনুসন্ধান শুরু করুন",
      homes: "বাসা",
      experiences: "অভিজ্ঞতা",
      services: "সেবা",
      becomeHost: "হোস্ট হোন",
      helpCenter: "সহায়তা কেন্দ্র",
      findCoHost: "সহ-হোস্ট খুঁজুন",
      giftCard: "গিফট কার্ড",
      signUp: "নিবন্ধন",
      logIn: "লগ ইন",
      anywhere: "যেকোনো স্থান",
      checkIn: "চেক ইন",
      checkOut: "চেক আউট",
      addDates: "তারিখ যোগ করুন",
      guests: "অতিথি",
      addGuests: "অতিথি যোগ করুন",
      where: "কোথায়",
      searchDestinations: "গন্তব্য খুঁজুন",
      who: "কে",
      new: "নতুন"
    }
  };

  const t = translations[currentLanguage];

  const menu: MenuItem[] = [
    { title: t.homes, url: "/", icon: "/images/imageHome.png" },
    {
      title: t.experiences,
      url: "/experiences",
      icon: "/images/imageExperiences.avif",
      isNew: true,
    },
    {
      title: t.services,
      url: "/services",
      icon: "/images/imageServices.avif",
      isNew: true,
    },
  ];

  const handleClick = (item: MenuItem) => {
    setActive(item.url);
    setActiveSearch("");
    setSelectedMenu(item);
    router.push(item.url);
  };

  const handleSearchClick = (section: string) => {
    setActiveSearch(section);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage === 'en' || savedLanguage === 'bn') {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItemWidth = 160;
  const menuGap = 24;
  const totalMenuWidth =
    menu.length * menuItemWidth + (menu.length - 1) * menuGap;

  return (
    <div>
      <nav
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 px-4 ${
          scrolled ? "bg-white shadow-sm" : "bg-gray-50"
        }`}
      >
        {/* Mobile Navbar - Only shown on mobile devices */}
        <div className="md:hidden py-3">
          {scrolled ? (
            // State 1: Scrolled (small, compact search bar)
            <div className="flex items-center w-full px-4 py-3 rounded-full border border-gray-300 bg-white cursor-pointer shadow-sm transition-all duration-300">
              <Search className="w-4 h-4 text-gray-800 mr-2 flex-shrink-0" />
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold text-gray-800">
                  {t.search}
                </span>
              </div>
            </div>
          ) : (
            // State 2: Not Scrolled (full search bar + menu icons)
            <>
              {/* Mobile Search Bar */}
              <div className="flex items-center w-full px-4 py-3 rounded-full border border-gray-300 bg-white cursor-pointer mb-4 shadow-sm">
                <Search className="w-4 h-4 text-gray-800 mr-2 flex-shrink-0" />
                <div className="flex flex-col overflow-hidden">
                  <span className="text-sm font-semibold text-gray-800">
                    {t.search}
                  </span>
                </div>
              </div>

              {/* Mobile Menu Items */}
              <div className="flex justify-between items-center w-9/12 mx-auto overflow-x-auto hide-scrollbar">
                {menu.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleClick(item)}
                    className={`relative flex flex-col items-center justify-center gap-1 text-xs font-medium text-gray-700 hover:text-black transition-colors min-w-[80px] px-2 py-1 ${
                      active === item.url
                        ? "text-black after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-black"
                        : ""
                    }`}
                  >
                    {item.icon && (
                      <div className="relative group mt-3">
                        <img
                          src={item.icon}
                          alt={item.title + " icon"}
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/32x24/EAEAEA/202020?text=Icon";
                          }}
                        />
                        {item.isNew && (
                          <span className="absolute -top-4 -right-5 bg-gray-600 text-white text-[10px] px-1 py-0.5 rounded-tl-lg rounded-e-md">
                            {t.new}
                          </span>
                        )}
                      </div>
                    )}
                    <span className="truncate max-w-full">{item.title}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Desktop Navbar */}
        <div className="hidden md:flex container mx-auto items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-2 mr-8">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-28 h-8 object-contain"
            />
          </div>

          {/* Center */}
          <div className="flex-1 ml-30 flex justify-center">
            {!scrolled ? (
              // Desktop Menu Items
              <div className="hidden md:flex gap-4">
                {menu.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleClick(item)}
                    className={`relative flex items-center gap-2 font-medium text-gray-700 hover:text-black transition-colors ${
                      active === item.url
                        ? "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-black"
                        : ""
                    }`}
                  >
                    {item.icon && (
                      <div className="relative group">
                        <img
                          src={item.icon}
                          alt={item.title + " icon"}
                          className="w-10 h-8 object-contain transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-6"
                        />
                        {item.isNew && (
                          <span className="absolute -top-5 -right-10 bg-gray-600 text-white text-xs px-2 py-0.5 m-1 rounded-tl-lg rounded-e-md transition-transform duration-300 ease-in-out group-hover:scale-110">
                            {t.new}
                          </span>
                        )}
                      </div>
                    )}
                    {item.title}
                  </button>
                ))}
              </div>
            ) : (
              <div
                className="hidden md:flex border rounded-full shadow-sm bg-white overflow-hidden transition-all duration-300 items-center"
                style={{ width: `${totalMenuWidth}px` }}
              >
                {/* Anywhere */}
                <div className="flex-1 text-center py-2 cursor-pointer transition-colors flex items-center justify-center gap-2">
                  {selectedMenu?.icon && (
                    <img
                      src={selectedMenu.icon}
                      alt={selectedMenu.title}
                      className="w-6 h-6 object-contain rounded"
                    />
                  )}
                  <div className="text-xs text-gray-600 font-semibold">
                    {selectedMenu?.title || t.anywhere}
                  </div>
                </div>

                <div className="w-px bg-gray-300 h-8"></div>

                {/* Check in */}
                <div className="flex-1 text-center py-2 cursor-pointer transition-colors">
                  <div className="text-xs font-semibold text-gray-800">
                    {t.checkIn}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{t.addDates}</div>
                </div>

                <div className="w-px bg-gray-300 h-8"></div>

                {/* Guests + Search */}
                <div className="flex-1 flex justify-between items-center px-2 py-2 cursor-pointer transition-colors">
                  <div>
                    <div className="text-xs font-semibold text-gray-800">
                      {t.guests}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {t.addGuests}
                    </div>
                  </div>
                  <div className="bg-red-500 p-2 rounded-full text-white flex items-center justify-center">
                    <Search className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div
            ref={menuRef}
            className="relative flex items-center gap-2 text-gray-800"
          >
            {/* Language Switcher */}
            <div className="flex items-center gap-1 mr-2">
              <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-1 text-sm rounded ${
                  currentLanguage === 'en'
                    ? 'bg-gray-200 font-semibold'
                    : 'hover:bg-gray-100'
                }`}
              >
                EN
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => changeLanguage('bn')}
                className={`px-2 py-1 text-sm rounded ${
                  currentLanguage === 'bn'
                    ? 'bg-gray-200 font-semibold'
                    : 'hover:bg-gray-100'
                }`}
              >
                BN
              </button>
            </div>

            <button className="hidden md:inline px-4 py-2 rounded-full font-semibold hover:bg-gray-100 transition text-sm">
              {t.becomeHost}
            </button>
            <div className="p-2 rounded-full bg-gray-200 hover:bg-gray-200 cursor-pointer transition">
              <Globe className="w-5 h-5" />
            </div>
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-200 cursor-pointer transition"
            >
              <Menu className="w-5 h-5" />
            </div>

            {/* Dropdown */}
            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 p-2">
                {/* Dropdown content */}
                <div className="py-2 border-b border-gray-200">
                  <div className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black cursor-pointer hover:bg-gray-100 rounded-lg">
                    <HelpCircle className="w-4 h-4 text-gray-600" />
                    {t.helpCenter}
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-100 rounded-lg">
                    <Users className="w-4 h-4 text-gray-600" />
                    {t.findCoHost}
                  </div>
                </div>

                <div className="py-2 border-b border-gray-200">
                  <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-100 rounded-lg">
                    <Home className="w-4 h-4 text-gray-600" />
                    {t.becomeHost}
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-100 rounded-lg">
                    <Gift className="w-4 h-4 text-gray-600" />
                    {t.giftCard}
                  </div>
                </div>

                <div className="py-2">
                  <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-100 rounded-lg">
                    <UserPlus className="w-4 h-4 text-gray-600" />
                    {t.signUp}
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-100 rounded-lg">
                    <LogIn className="w-4 h-4 text-gray-600" />
                    {t.logIn}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Search Bar - hide on scroll (Desktop only) */}
        {!scrolled && (
          <div className="hidden md:block mt-4 mx-auto max-w-4xl px-4 mb-10">
            <div
              className={`flex items-center border border-gray-300 rounded-full shadow-sm overflow-hidden transition-all duration-300 ease-in-out hover:shadow-md ${
                activeSearch ? "bg-gray-200" : "bg-white"
              }`}
            >
              {/* Where */}
              <div
                onClick={() => handleSearchClick("where")}
                className={`flex-1 px-4 py-2 cursor-pointer rounded-full transition-colors duration-300 ease-in-out ${
                  activeSearch === "where"
                    ? "bg-white"
                    : activeSearch
                    ? "bg-gray-200 hover:bg-gray-300"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <div className="text-xs font-semibold ml-4 text-gray-800">
                  {t.where}
                </div>
                <input
                  type="text"
                  placeholder={t.searchDestinations}
                  className="w-full text-sm text-gray-500 bg-transparent outline-none ml-4 mt-1"
                  onFocus={() => handleSearchClick("where")}
                />
              </div>

              {/* Check in */}
              <div
                onClick={() => handleSearchClick("checkin")}
                className={`flex-1 px-4 py-2 cursor-pointer rounded-full transition-colors duration-300 ease-in-out ${
                  activeSearch === "checkin"
                    ? "bg-white"
                    : activeSearch
                    ? "bg-gray-200 hover:bg-gray-300"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <div className="text-xs font-semibold text-gray-800">
                  {t.checkIn}
                </div>
                <div className="text-sm text-gray-500 mt-1">{t.addDates}</div>
              </div>

              <div className="w-px bg-gray-300 h-8"></div>

              {/* Check out */}
              {active === "/" && (
                <div
                  onClick={() => handleSearchClick("checkout")}
                  className={`flex-1 px-4 py-2 cursor-pointer rounded-full transition-colors duration-300 ease-in-out ${
                    activeSearch === "checkout"
                      ? "bg-white"
                      : activeSearch
                      ? "bg-gray-200 hover:bg-gray-300"
                      : "bg-white hover:bg-gray-100"
                  }`}
                >
                  <div className="text-xs font-semibold text-gray-800">
                    {t.checkOut}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{t.addDates}</div>
                </div>
              )}

              {/* Who + Search Button */}
              <div
                onClick={() => handleSearchClick("who")}
                className={`flex-1 px-4 py-2 cursor-pointer rounded-full flex items-center justify-between transition-colors duration-300 ease-in-out ${
                  activeSearch === "who"
                    ? "bg-white"
                    : activeSearch
                    ? "bg-gray-200 hover:bg-gray-300"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-gray-800">{t.who}</div>
                  <div className="text-sm text-gray-500 mt-1">{t.addGuests}</div>
                </div>
                <button className="flex-shrink-0 bg-red-500 hover:bg-red-600 p-2 rounded-full transition-colors duration-300 ease-in-out ml-2 flex items-center justify-center gap-2">
                  <Search className="w-4 h-4 text-white" />
                  {activeSearch === "who" && (
                    <span className="font-semibold text-white">Search</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Add CSS for hiding scrollbar on mobile menu */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Navbar;