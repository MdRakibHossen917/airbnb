"use client";

import React, { useState } from 'react';

// Define the type for the link objects
interface LinkItem {
  title: string;
  subtitle?: string;
  isLink?: boolean;
}

const InspirationSection = () => {
  const [activeTab, setActiveTab] = useState<'travelTips' | 'apartments'>('travelTips');

  const travelTips: LinkItem[] = [
    { title: 'Family travel hub', subtitle: 'Tips and inspiration' },
    { title: 'Family budget travel', subtitle: 'Get there for less' },
    { title: 'Vacation ideas for any budget', subtitle: 'Make it special without making it a splurge' },
    { title: 'Travel Europe on a budget', subtitle: 'How to take the kids to Europe for less' },
    { title: 'Outdoor adventure', subtitle: 'Explore nature with the family' },
    { title: 'Bucket list national parks', subtitle: 'Must-see parks for family travel' },
  ];

  const apartments: LinkItem[] = [
    { title: 'Albuquerque', subtitle: 'New Mexico' },
    { title: 'Atlanta Metro', subtitle: 'Georgia' },
    { title: 'Augusta', subtitle: 'Georgia' },
    { title: 'Austin Metro', subtitle: 'Texas' },
    { title: 'Baton Rouge', subtitle: 'Louisiana' },
    { title: 'Bentonville', subtitle: 'Arkansas' },
    { title: 'Birmingham', subtitle: 'Alabama' },
    { title: 'Boise', subtitle: 'Idaho' },
    { title: 'Boston Metro', subtitle: 'Massachusetts' },
    { title: 'Boulder', subtitle: 'Colorado' },
    { title: 'Charlotte', subtitle: 'North Carolina' },
    { title: 'Chicago Metro', subtitle: 'Illinois' },
    { title: 'Cincinnati', subtitle: 'Ohio' },
    { title: 'Columbus', subtitle: 'Ohio' },
    { title: 'CrestView', subtitle: 'Florida' },
    { title: 'Dallas', subtitle: 'Texas' },
    { title: 'Denver', subtitle: 'Colorado' },
    { title: 'Show more', isLink: true },
  ];

  const renderLinks = (links: LinkItem[]) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
        {links.map((link: LinkItem, index) => (
          <div key={index} className="flex flex-col space-y-1 text-start text-gray-800 cursor-pointer hover:text-gray-950">
            <h4 className={`text-sm font-semibold ${link.isLink ? 'underline' : ''}`}>{link.title}</h4>
            {!link.isLink && <p className="text-sm text-gray-600 hover:text-gray-800">{link.subtitle}</p>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-[Inter]">
      {/* Main Heading */}
      <h2 className="text-3xl font-bold mb-4">Inspiration for future getaways</h2>

      {/* Tabs */}
      <div className="flex space-x-6 border-b border-gray-300 mb-8">
        <button
          onClick={() => setActiveTab('travelTips')}
          className={`pb-2 text-sm font-semibold transition-colors duration-200 ${
            activeTab === 'travelTips' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Travel tips & inspiration
        </button>
        <button
          onClick={() => setActiveTab('apartments')}
          className={`pb-2 text-sm font-semibold transition-colors duration-200 ${
            activeTab === 'apartments' ? 'border-b-2 border-black text-black' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          Airbnb-friendly apartments
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'travelTips' && renderLinks(travelTips)}
      {activeTab === 'apartments' && renderLinks(apartments)}

      <div className="border-t border-gray-300 my-6"></div>

      {/* Support, Hosting, Airbnb Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 className="font-semibold mb-4 text-start">Support</h3>
          <ul className="space-y-2 text-sm text-start">
            <li className="text-gray-700 cursor-pointer hover:underline">Help Center</li>
            <li className="text-gray-700 cursor-pointer hover:underline">Cover</li>
            <li className="text-gray-700 cursor-pointer hover:underline">AirCover</li>
            <li className="text-gray-700 cursor-pointer hover:underline">
              Anti-discrimination
            </li>
            <li className="text-gray-700 cursor-pointer hover:underline">Disability support</li>
            <li className="text-gray-700 cursor-pointer hover:underline">
              Cancellation options
            </li>
            <li className="text-gray-700 cursor-pointer hover:underline">
              Report neighborhood cohesion
            </li>
          </ul>
        </div>

        {/* Hosting Section */}
        <div>
          <h3 className="font-semibold mb-4 text-start">Hosting</h3>
          <ul className="space-y-2 text-sm text-start">
            <li className="text-gray-700 cursor-pointer hover:underline">Airbnb your home:</li>
            <li className="text-gray-700 cursor-pointer hover:underline">
              Airbnb your experience
            </li>
            <li className="text-gray-700 cursor-pointer hover:underline">
              Airbnb your service
            </li>
            <li className="text-gray-700 cursor-pointer hover:underline">AirCover for Hosts</li>
            <li className="text-gray-700 cursor-pointer hover:underline">Hosting resources</li>
            <li className="text-gray-700 cursor-pointer hover:underline">Community forum</li>
            <li className="text-gray-700 cursor-pointer hover:underline">
              Hosting responsibly
            </li>
            <li className="text-gray-700 cursor-pointer hover:underline">
              Airbnb friendly apartments
            </li>
            <li className="text-gray-700 cursor-pointer hover:underline">
              Join a free hosting class
            </li>
            <li className="text-gray-700 cursor-pointer hover:underline">Find a job-hot!</li>
          </ul>
        </div>

        {/* Airbnb Section */}
        <div>
          <h3 className="font-semibold mb-4 text-start">Airbnb</h3>
          <ul className="space-y-2 text-sm text-start">
            <li className="text-gray-700 cursor-pointer hover:underline">
              2005 Summer Release
            </li>
            <li className="text-gray-700 cursor-pointer hover:underline">Newroom</li>
            <li className="text-gray-700 cursor-pointer hover:underline">Cancers</li>
            <li className="text-gray-700 cursor-pointer hover:underline">Investors?</li>
            <li className="text-gray-700 cursor-pointer hover:underline">GIT cards</li>
            <li className="text-gray-700 cursor-pointer hover:underline">
              Airbnb.org emergency stays?
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InspirationSection;
