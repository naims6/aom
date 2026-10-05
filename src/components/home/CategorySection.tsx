"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from "@/data/categories";

export default function CategorySection() {
  const stripRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!stripRef.current) return;
    const amount = stripRef.current.clientWidth * 0.75;
    stripRef.current.scrollBy({
      left: dir === "right" ? amount : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-14 lg:py-18 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          Shop by Category
        </h2>

        {/* Strip with arrows floating on left/right */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll categories left"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:shadow-md transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Scrollable strip */}
          <div
            ref={stripRef}
            className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 scrollbar-hide snap-x snap-mandatory"
          >
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.slug}`}
                aria-label={`Browse ${category.name}`}
                className="flex-none w-[30vw] sm:w-[22vw] lg:w-48 snap-start group block"
              >
                <div className="rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 30vw, (max-width: 1024px) 22vw, 192px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <div className="px-3 py-2.5 text-center">
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors duration-200 line-clamp-1">
                      {category.name}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll categories right"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-8 h-8 rounded-full bg-primary/10 border border-primary/20 shadow-sm flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:shadow-md transition-all duration-200"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
