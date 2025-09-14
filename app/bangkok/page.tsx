"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Skeleton from "../share/skeleton/page";

type Bangkok = {
  _id: string;
  listing_type: string;
  price: string;
  rating: number;
  image: string;
  location: string;
  tags: string[];
};

const HeartIcon = ({ filled = false, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "#4B5563"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-6 h-6 transition-colors duration-300 ${className}`}
  >
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

export default function BangkokPage() {
  const [products, setProducts] = useState<Bangkok[]>([]);
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
        const res = await fetch("/api/bangkok");
        const data: Bangkok[] = await res.json();
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
    <div className="px-5">
      <div className="flex justify-between items-center">
        <h1 className="text-base lg:text-lg font-bold">Popular homes in Bangkok</h1>
       <div className="hidden md:flex space-x-2">
  <button
    onClick={handlePrev}
    disabled={!canScrollLeft}
    className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200
      ${canScrollLeft ? "bg-gray-100 hover:bg-gray-200" : "bg-gray-200 cursor-not-allowed"}`}
  >
    <ChevronLeft className="h-6 w-6 text-gray-500" />
  </button>
  <button
    onClick={handleNext}
    disabled={!canScrollRight}
    className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200
      ${canScrollRight ? "bg-gray-100 hover:bg-gray-200" : "bg-gray-200 cursor-not-allowed"}`}
  >
    <ChevronRight className="h-6 w-6 text-gray-500" />
  </button>
</div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto py-4 scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        <style>{`div::-webkit-scrollbar { display: none; }`}</style>

        {products.map((product) => (
          <div key={product._id} className="flex-none w-53 relative rounded-xl transition-shadow duration-300">
            <div className="relative">
              <img
                src={product.image}
                alt={product.listing_type}
                className="w-full h-52 object-cover rounded-3xl"
              />
              {product.tags?.includes("Guest favorite") && (
                <span className="absolute top-3 left-3 bg-white/80 text-gray-800 px-2 py-1 text-xs font-semibold rounded-full shadow-md">
                  Guest favorite
                </span>
              )}
              <button className="absolute top-2 right-2 text-white z-10 transition-transform duration-200 hover:scale-110">
                <HeartIcon className="drop-shadow-md" />
              </button>
            </div>
            <div className="m-2 text-xs">
              <h2 className="text-xs font-semibold">
                {product.listing_type} in {product.location}
              </h2>
              <p className="text-gray-600 flex items-center">
                {product.price}
                <span className="mx-2 text-xs text-gray-400">•</span>
                <span className="text-gray-600 mr-1">★</span>
                {product.rating.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
