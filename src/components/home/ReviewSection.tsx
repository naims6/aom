"use client";

import Autoplay from "embla-carousel-autoplay";
import { useMemo } from "react";
import { reviews } from "@/data/review";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
  const hue =
    name.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 360;
  return (
    <div
      className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
      style={{ backgroundColor: `hsl(${hue}, 55%, 45%)` }}
    >
      {initials}
    </div>
  );
}

export default function ReviewSection() {
  const plugins = useMemo(
    () => [Autoplay({ delay: 3500, stopOnInteraction: true, stopOnMouseEnter: true })],
    []
  );

  return (
    <section className="py-16 lg:py-24 bg-[#f8faf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What our customers say
          </h2>
          <div className="inline-flex items-center gap-2 bg-white border border-gray-100 rounded-full px-5 py-2 shadow-sm">
            <StarRating rating={5} />
            <span className="text-sm font-semibold text-gray-800">4.9</span>
            <span className="text-sm text-gray-400">
              / 5 &nbsp;·&nbsp; {reviews.length} reviews
            </span>
          </div>
        </div>

        {/* Carousel — px-12 makes room for the absolute prev/next buttons */}
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={plugins}
          className="w-full px-12"
        >
          <CarouselContent>
            {reviews.map((review) => (
              <CarouselItem
                key={review.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <article className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4 h-full hover:shadow-md transition-shadow duration-300">
                  <StarRating rating={review.rating} />

                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2">
                      {review.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-4">
                      {review.body}
                    </p>
                  </div>

                  {review.product && (
                    <span className="inline-flex items-center gap-1 text-xs text-primary font-medium bg-green-50 px-2.5 py-1 rounded-full w-fit">
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {review.product}
                    </span>
                  )}

                  <hr className="border-gray-100" />

                  <div className="flex items-center gap-3">
                    <Avatar name={review.name} />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {review.name}
                      </p>
                      <p className="text-xs text-gray-400">{review.location}</p>
                    </div>
                    <time
                      dateTime={review.date}
                      className="ml-auto text-xs text-gray-400 flex-shrink-0"
                    >
                      {new Date(review.date).toLocaleDateString("en-GB", {
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="border-gray-200 hover:border-primary hover:text-primary hover:bg-white transition-colors" />
          <CarouselNext className="border-gray-200 hover:border-primary hover:text-primary hover:bg-white transition-colors" />
        </Carousel>
      </div>
    </section>
  );
}
