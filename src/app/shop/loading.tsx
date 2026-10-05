export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header Skeleton */}
      <div className="bg-surface border-b border-gray-100 py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="h-3 w-24 bg-gray-200 rounded mb-3" />
          <div className="h-8 w-48 bg-gray-200 rounded mb-2" />
          <div className="h-4 w-64 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="flex gap-8">
          {/* Sidebar Skeleton */}
          <aside className="hidden lg:block w-56 xl:w-64 flex-shrink-0 animate-pulse">
            <div className="bg-white border border-gray-100 rounded-sm p-5 space-y-4">
              <div className="h-4 w-16 bg-gray-200 rounded" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-8 bg-gray-100 rounded-sm" />
                ))}
              </div>
              <div className="h-px bg-gray-100 my-4" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-9 bg-gray-100 rounded-sm" />
            </div>
          </aside>

          {/* Grid Skeleton */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex flex-col bg-white border border-gray-100 rounded-sm overflow-hidden">
                  <div className="aspect-square bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 w-16 bg-gray-200 rounded" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                    <div className="h-3 w-full bg-gray-200 rounded" />
                    <div className="h-5 w-20 bg-gray-200 rounded" />
                    <div className="h-9 bg-gray-200 rounded-sm" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
