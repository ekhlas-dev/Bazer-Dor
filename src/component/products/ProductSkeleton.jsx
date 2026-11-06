
const ProductSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5"
        >
          <div className="flex justify-between">
            <div className="h-16 w-16 rounded-xl bg-gray-200" />
            <div className="h-6 w-16 rounded-full bg-gray-200" />
          </div>

          <div className="mt-5 h-5 w-2/3 rounded bg-gray-200" />
          <div className="mt-3 h-4 w-1/3 rounded bg-gray-100" />

          <div className="mt-6 border-t border-gray-100 pt-4">
            <div className="h-3 w-20 rounded bg-gray-100" />
            <div className="mt-2 h-6 w-28 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;
