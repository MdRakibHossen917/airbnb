"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronRight, ChevronLeft, Upload } from "lucide-react";
import Skeleton from "../share/skeleton/page";

type Originals = {
  _id: string;
  title: string;
  listing_type: string;
  price: string;
  rating?: number;
  image: string;
  location: string;
  tags: string[];
};

export default function OriginalsPage() {
  const [products, setProducts] = useState<Originals[]>([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/originals");
        const data: Originals[] = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    checkScroll();

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [products]);

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      checkScroll();
    }
  };

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
      checkScroll();
    }
  };

if (loading) {
  return (
    <div className="px-5 pt-5 mt-44">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold mt-6">Popular homes in Kuala Lumpur</h1>
        <div className="flex space-x-2 mb-2">
          <button disabled className="w-10 h-10 bg-gray-200 rounded-full"></button>
          <button disabled className="w-10 h-10 bg-gray-200 rounded-full"></button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto mt-4">
        {Array(6).fill(0).map((_, idx) => (
          <Skeleton key={idx} />
        ))}
      </div>
    </div>
  );
}


  return (
    <div className="px-7">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl text-gray-800 font-bold mt-6">Airbnb Originals</h1>
        <div className="flex space-x-2">
          <button
            onClick={handlePrev}
            disabled={!canScrollLeft}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200  mt-6 ${
              canScrollLeft ? "bg-gray-100 hover:bg-gray-200" : "bg-gray-200 cursor-not-allowed"
            }`}
          >
            <ChevronLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            onClick={handleNext}
            disabled={!canScrollRight}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200  mt-6 ${
              canScrollRight ? "bg-gray-100 hover:bg-gray-200" : "bg-gray-200 cursor-not-allowed"
            }`}
          >
            <ChevronRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Cards container */}
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto py-4 scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>

        {products.map((product) => (
          <div
            key={product._id}
            className="flex-none w-60 sm:w-56 md:w-52 lg:w-52 relative rounded-xl  hover:shadow-lg transition-shadow duration-300 "
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-52 object-cover rounded-3xl"
              />
              {product.tags?.includes("Guest favorite") && (
                <span className="absolute top-3 left-3 bg-white/80 text-gray-800 px-2 py-1 text-xs font-semibold rounded-full shadow-md">
                  Original
                </span>
              )}
              {/* Upload Icon Button */}
              <button className="absolute top-2 right-2 w-8 h-8 p-1 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 shadow-md z-10 transition-transform duration-200 hover:scale-110 hover:bg-gray-200">
                <Upload size={18} />
              </button>
            </div>
            {/* Card info */}
            <div className="p-2 text-xs">
              <h2 className="font-semibold mb-1">{product.title}</h2>
              <p className="text-gray-600 mb-1">
             {product.location}
              </p>
              <p className="text-gray-600 flex items-center">
                {product.price}
                <span className="mx-2 text-xs text-gray-400">•</span>
                <span className="text-gray-600 mr-1">★</span>
                {product.rating ? product.rating.toFixed(2) : "N/A"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
