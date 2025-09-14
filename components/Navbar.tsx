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

  const menuRef = useRef<HTMLDivElement>(null); // 👈 dropdown ref

  const menu: MenuItem[] = [
    { title: "Homes", url: "/", icon: "/images/imageHome.png" },
    {
      title: "Experiences",
      url: "/experiences",
      icon: "/images/imageExperiences.avif",
      isNew: true,
    },
    {
      title: "Services",
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
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 👉 Outside click handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Calculate menu width dynamically
  const menuItemWidth = 160;
  const menuGap = 24;
  const totalMenuWidth =
    menu.length * menuItemWidth + (menu.length - 1) * menuGap;

  return (
    <div>
      <nav className="w-full bg-gray-50 shadow-sm fixed top-0 left-0 z-50 transition-all duration-300 px-4">
        <div className="container mx-auto flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center gap-2 mr-30">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-25 object-contain"
            />
          </div>

          {/* Center */}
          <div className="flex-1 mx-6 flex justify-center">
            {!scrolled ? (
              // Menu Items
              <div className="hidden md:flex gap-6">
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
                            New
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
                    {selectedMenu?.title || "Anywhere"}
                  </div>
                </div>

                <div className="w-px bg-gray-300 h-8"></div>

                {/* Check in */}
                <div className="flex-1 text-center py-2 cursor-pointer transition-colors">
                  <div className="text-xs text-gray-600 font-semibold">
                    Check in
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    Add dates
                  </div>
                </div>

                <div className="w-px bg-gray-300 h-8"></div>

                {/* Guests + Search */}
                <div className="flex-1 flex justify-between items-center px-2 py-2 cursor-pointer transition-colors">
                  <div>
                    <div className="text-xs text-gray-600 font-semibold">
                      Guests
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      Add guests
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
            <button className="hidden md:inline px-4 py-2 rounded-full hover:bg-gray-100 transition">
              Become a host
            </button>
            <div className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition">
              <Globe className="w-5 h-5" />
            </div>
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 cursor-pointer transition"
            >
              <Menu className="w-5 h-5" />
            </div>

            {/* Dropdown */}
            {isMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 p-2">
    {/* Top Section */}
    <div className="py-2 border-b border-gray-200">
      <div className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-black cursor-pointer hover:bg-gray-100 rounded-lg">
        <HelpCircle className="w-4 h-4 text-gray-600" />
        Help Center
      </div>
      <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-100 rounded-lg">
        <Users className="w-4 h-4 text-gray-600" />
        Find a co-host
      </div>
    </div>

    {/* Middle Section */}
    <div className="py-2 border-b border-gray-200">
      <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-100 rounded-lg">
        <Home className="w-4 h-4 text-gray-600" />
        Become a host
      </div>
      <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-100 rounded-lg">
        <Gift className="w-4 h-4 text-gray-600" />
        Gift card
      </div>
    </div>

    {/* Bottom Section */}
    <div className="py-2">
      <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-100 rounded-lg">
        <UserPlus className="w-4 h-4 text-gray-600" />
        Sign up
      </div>
      <div className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 cursor-pointer hover:bg-gray-100 rounded-lg">
        <LogIn className="w-4 h-4 text-gray-600" />
        Log in
      </div>
    </div>
  </div>
            )}
          </div>
        </div>

        {/* Bottom Search Bar - hide on scroll */}
        {!scrolled && (
          <div className="mt-4 mx-auto max-w-4xl px-4 mb-10">
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
                  Where
                </div>
                <input
                  type="text"
                  placeholder="Search destinations"
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
                  Check in
                </div>
                <div className="text-sm text-gray-500 mt-1">Add dates</div>
              </div>

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
                    Check out
                  </div>
                  <div className="text-sm text-gray-500 mt-1">Add dates</div>
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
                  <div className="text-xs font-semibold text-gray-800">Who</div>
                  <div className="text-sm text-gray-500 mt-1">Add guests</div>
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
    </div>
  );
};

export default Navbar;
