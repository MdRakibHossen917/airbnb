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
      const scrollAmount = window.innerWidth < 768 ? 250 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  const handlePrev = () => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 250 : 300;
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setTimeout(checkScroll, 300);
    }
  };

  if (loading) {
    return (
      <div className="px-5 pt-5 mt-44">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold mt-6">Airbnb Originals</h1>
          <div className="flex space-x-2 mb-2">
            <button
              disabled
              className="w-10 h-10 bg-gray-200 rounded-full"
            ></button>
            <button
              disabled
              className="w-10 h-10 bg-gray-200 rounded-full"
            ></button>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto mt-4">
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <Skeleton key={idx} />
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-7">
      <div className="flex justify-between items-center">
        <h1 className="text-base lg:text-lg font-bold mb-2 lg:mt-6 flex items-center">
          Airbnb Originals
          <ChevronRight className="ml-2 w-5 h-5 text-gray-500" />
        </h1>
        <div className="hidden md:flex space-x-2">
          <button
            onClick={handlePrev}
            disabled={!canScrollLeft}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200
              ${
                canScrollLeft
                  ? "bg-gray-100 hover:bg-gray-200"
                  : "bg-gray-200 cursor-not-allowed"
              }`}
          >
            <ChevronLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            onClick={handleNext}
            disabled={!canScrollRight}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200
              ${
                canScrollRight
                  ? "bg-gray-100 hover:bg-gray-200"
                  : "bg-gray-200 cursor-not-allowed"
              }`}
          >
            <ChevronRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 scroll-smooth hide-scrollbar"
      >
        <style>{`
          .hide-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}</style>
        {products.map((product) => (
          <div
            key={product._id}
            className="flex-none w-[calc(50%-10px)] md:w-52 lg:w-52 relative rounded-xl hover:shadow-lg transition-shadow duration-300 snap-center"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-44 sm:h-52 object-cover rounded-3xl"
              />
              {product.tags?.includes("Guest favorite") && (
                <span className="absolute top-3 left-3 bg-white/80 text-gray-800 px-2 py-1 text-xs font-semibold rounded-full shadow-md">
                  Original
                </span>
              )}

              <button className="absolute top-2 right-2 w-8 h-8 p-1 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 shadow-md z-10 transition-transform duration-200 hover:scale-110 hover:bg-gray-200">
                <Upload size={18} />
              </button>
            </div>
            <div className="p-2 text-xs">
              <h2 className="font-semibold mb-1 truncate">{product.title}</h2>
              <p className="text-gray-600 mb-1 truncate">{product.location}</p>
              <p className="text-gray-600 flex items-center">
                {product.price}

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
