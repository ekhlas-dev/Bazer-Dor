const Loading = () => {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
      {/* Hero Skeleton */}
      <div className="mb-10 grid animate-pulse gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div className="h-5 w-32 rounded bg-gray-200" />
          <div className="h-10 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-2/3 rounded bg-gray-200" />
          <div className="h-10 w-32 rounded bg-gray-200" />
        </div>

        <div className="h-56 rounded-xl bg-gray-200" />
      </div>

      {/* Products Skeleton */}
      <div className="mb-6 h-7 w-40 animate-pulse rounded bg-gray-200" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-xl border border-gray-200 p-4"
          >
            <div className="mb-4 h-32 rounded-lg bg-gray-200" />
            <div className="mb-2 h-4 w-3/4 rounded bg-gray-200" />
            <div className="mb-2 h-4 w-1/2 rounded bg-gray-200" />
            <div className="h-6 w-2/3 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
};

export default Loading;