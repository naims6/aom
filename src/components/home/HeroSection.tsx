import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[560px] md:h-[620px] lg:h-[700px] flex items-center overflow-hidden">
      {/* Background: hero-organic.jpg — right side has content, left side is empty */}
      <div className="absolute inset-0">
        <Image
          src="/assests/hero-organic.jpg"
          alt="Organic hero background"
          fill
          className="object-cover object-left md:object-right"
          priority
          sizes="100vw"
        />
      </div>

      {/* Text content sits on the left (empty) half of the image */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="inline-block w-6 h-px bg-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">
              Pure &amp; Natural From Bangladesh
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-5">
            Nature&apos;s Finest,{' '}
            <span className="text-primary">Delivered Fresh</span>
          </h1>

          {/* Supporting text */}
          <p className="text-base lg:text-lg text-gray-500 leading-relaxed mb-8">
            Premium organic ghee, honey, and nuts sourced directly from trusted farmers
            across Bangladesh. No additives. No shortcuts. Just pure goodness.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <Link href="/shop" className="btn-primary text-center">
              Shop Now
            </Link>
            <Link href="/shop" className="btn-outline text-center">
              View Categories
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              100% Natural
            </span>
            <span className="w-px h-4 bg-gray-200 hidden sm:block" />
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              No Preservatives
            </span>
            <span className="w-px h-4 bg-gray-200 hidden sm:block" />
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Farm to Table
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
