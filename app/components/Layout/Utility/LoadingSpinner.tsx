export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    </div>
  );
}
