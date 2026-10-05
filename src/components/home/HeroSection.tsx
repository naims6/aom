import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="w-full min-h-[70vh] lg:min-h-[85vh] flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 lg:py-0">

          {/* Left: Text Content */}
          <div className="order-2 lg:order-1 flex flex-col items-start">
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
            <p className="text-base lg:text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
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

          {/* Right: Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm lg:max-w-none lg:w-[500px] aspect-[4/5] rounded-2xl overflow-hidden bg-surface shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=900&q=80"
                alt="A spread of organic natural food products"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 45vw, 500px"
              />
              {/* Subtle overlay label */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">Free Delivery</p>
                  <p className="text-xs text-gray-500">On orders above ৳999</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
