"use client";

import React, { useState } from "react";

interface LinkItem {
  title: string;
  subtitle?: string;
  isLink?: boolean;
}

const InspirationSection = () => {
  const [activeTab, setActiveTab] = useState<"travelTips" | "apartments">(
    "travelTips"
  );

  const travelTips: LinkItem[] = [
    { title: "Family travel hub", subtitle: "Tips and inspiration" },
    { title: "Family budget travel", subtitle: "Get there for less" },
    {
      title: "Vacation ideas for any budget",
      subtitle: "Make it special without making it a splurge",
    },
    { title: "Travel Europe on a budget", subtitle: "Take the kids for less" },
    { title: "Travel Europe on a budget", subtitle: "Take the kids for less" },
    { title: "Outdoor adventure", subtitle: "Explore nature with the family" },
    { title: "Bucket list national parks", subtitle: "Must-see family parks" },
  ];

  const apartments: LinkItem[] = [
    { title: "Albuquerque", subtitle: "New Mexico" },
    { title: "Atlanta Metro", subtitle: "Georgia" },
    { title: "Augusta", subtitle: "Georgia" },
    { title: "Austin Metro", subtitle: "Texas" },
    { title: "Baton Rouge", subtitle: "Louisiana" },
    { title: "Bentonville", subtitle: "Arkansas" },
    { title: "Birmingham", subtitle: "Alabama" },
    { title: "Boise", subtitle: "Idaho" },
    { title: "Boston Metro", subtitle: "Massachusetts" },
    { title: "Boulder", subtitle: "Colorado" },
    { title: "Charlotte", subtitle: "North Carolina" },
    { title: "Chicago Metro", subtitle: "Illinois" },
    { title: "Cincinnati", subtitle: "Ohio" },
    { title: "Columbus", subtitle: "Ohio" },
    { title: "CrestView", subtitle: "Florida" },
    { title: "Dallas", subtitle: "Texas" },
    { title: "Denver", subtitle: "Colorado" },
    { title: "Show more", isLink: true },
  ];

  const renderLinks = (links: LinkItem[]) => (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
      {links.map((link, index) => (
        <div
          key={index}
          className="flex flex-col space-y-1 text-start text-gray-800"
        >
          {link.isLink ? (
            <a href="#" className="text-sm font-semibold underline">
              {link.title}
            </a>
          ) : (
            <>
              <h4 className="text-sm font-semibold">{link.title}</h4>
              <p className="text-sm text-gray-600">{link.subtitle}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="px-4 py-8 bg-gray-50 font-[Inter]">
      <h2 className="text-3xl font-bold mb-4">
        Inspiration for future getaways
      </h2>

      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-300 mb-8">
        <button
          onClick={() => setActiveTab("travelTips")}
          className={`pb-2 text-sm font-semibold transition-colors duration-200 ${
            activeTab === "travelTips"
              ? "border-b-2 border-black text-black"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Travel tips & inspiration
        </button>
        <button
          onClick={() => setActiveTab("apartments")}
          className={`pb-2 text-sm font-semibold transition-colors duration-200 ${
            activeTab === "apartments"
              ? "border-b-2 border-black text-black"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          Airbnb-friendly apartments
        </button>
      </div>

      {/* Tab content */}
      {activeTab === "travelTips" && renderLinks(travelTips)}
      {activeTab === "apartments" && renderLinks(apartments)}

      <div className="border-t border-gray-300 my-6"></div>

      {/* Footer sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="font-semibold mb-4 text-start">Support</h3>
          <ul className="space-y-2 text-sm text-start">
            {[
              "Help Center",
              "AirCover",
              "Anti-discrimination",
              "Disability support",
              "Cancellation options",
              "Report neighborhood issues",
            ].map((item, i) => (
              <li
                key={i}
                className="text-gray-600 cursor-pointer hover:underline"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-start">Hosting</h3>
          <ul className="space-y-2 text-sm text-start">
            {[
              "Airbnb your home",
              "Airbnb your experience",
              "Airbnb your service",
              "AirCover for Hosts",
              "Hosting resources",
              "Community forum",
              "Hosting responsibly",
              "Airbnb-friendly apartments",
              "Join a free hosting class",
              "Find a job",
            ].map((item, i) => (
              <li
                key={i}
                className="text-gray-600 cursor-pointer hover:underline"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-4 text-start">Airbnb</h3>
          <ul className="space-y-2 text-sm text-start">
            {[
              "Newsroom",
              "Investors",
              "Gift cards",
              "Airbnb.org emergency stays",
            ].map((item, i) => (
              <li
                key={i}
                className="text-gray-600 cursor-pointer hover:underline"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default function Footer() {
  return (
    <div className="font-[Inter]">
      <InspirationSection />
      {/* Lower footer */}
      <div className="bg-gray-100 py-4 px-8 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Left */}
          <div className="flex space-x-4 items-center flex-wrap">
            <span>© 2025 Airbnb, Inc.</span>
            <span className="hidden md:inline">·</span>
            <a href="#" className="hover:underline">
              Terms
            </a>
            <span className="hidden md:inline">·</span>
            <a href="#" className="hover:underline">
              Sitemap
            </a>
            <span className="hidden md:inline">·</span>
            <a href="#" className="hover:underline">
              Privacy
            </a>
            <span className="hidden md:inline">·</span>
            <a href="#" className="hover:underline">
              Your Privacy Choices
            </a>
          </div>

          {/* Right */}
          <div className="flex space-x-4 items-center flex-wrap">
            <a href="#" className="hover:underline">
              English (US)
            </a>
            <a href="#" className="hover:underline">
              $ USD
            </a>

            <a
              href="https://www.linkedin.com/in/rakibhossen917/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>

            <a
              href="https://github.com/MdRakibHossen917"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
                <path d="M15 22v-4a4.8 4.8 0 0 0-3-4v-1a5 5 0 0 1-2-4.5c0-1.7.6-3 2-4.5v-.5a2.5 2.5 0 0 0-2.5-2.5c-2 0-3.5 1.5-3.5 3.5a1 1 0 0 1-.5 1c-1 1-1.5 2.5-1.5 4v1.5a6.5 6.5 0 0 0 4 5c-.3 0-.6.1-.9.2-1.2.5-2.1.8-3.1 1.2-1.5.6-2.6 1.1-2.9 1.4-.2.2-.2.5-.2.8v.5a.5.5 0 0 0 .5.5h16a.5.5 0 0 0 .5-.5v-.5a.5.5 0 0 0-.5-.5z" />
                <path d="M9 19c-3.1 0-5.5-2.4-5.5-5.5v-1a4 4 0 0 1-4-4c0-2.2 1.8-4 4-4s4 1.8 4 4c0 1.5-.5 2.5-1.5 3.5a.5.5 0 0 1-.5.5c-1 1-1.5 2.5-1.5 4v1.5a6.5 6.5 0 0 0 4 5c-.3 0-.6.1-.9.2-1.2.5-2.1.8-3.1 1.2-1.5.6-2.6 1.1-2.9 1.4-.2.2-.2.5-.2.8v.5a.5.5 0 0 0 .5.5h16a.5.5 0 0 0 .5-.5v-.5a.5.5 0 0 0-.5-.5z" />
              </svg>
            </a>

            <a
              href="https://www.facebook.com/md.rakib.hossen.41751"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
