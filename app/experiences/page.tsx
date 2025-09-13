import React from "react";

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-4">Experiences</h1>
      <p className="text-gray-600 mb-8">Explore our amazing experiences!</p>

      {/* Example content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="border p-4 rounded shadow">Experience 1</div>
        <div className="border p-4 rounded shadow">Experience 2</div>
        <div className="border p-4 rounded shadow">Experience 3</div>
      </div>
    </div>
  );
}
