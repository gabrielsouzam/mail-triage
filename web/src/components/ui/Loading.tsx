export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200"></div>
        <div className="w-12 h-12 rounded-full border-4 border-t-[#2c5f6f] border-r-transparent border-b-transparent border-l-transparent animate-spin absolute top-0 left-0"></div>
      </div>
    </div>
  );
}
