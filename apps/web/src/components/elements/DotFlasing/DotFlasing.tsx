export const DotFlasing = () => {
  return (
    <div className="m-10 flex justify-center" aria-label="Loading...">
      <div className="h-2 w-2 animate-ping rounded-full bg-blue-600"></div>
      <div className="mx-4 h-2 w-2 animate-ping rounded-full bg-blue-600"></div>
      <div className="h-2 w-2 animate-ping rounded-full bg-blue-600"></div>
    </div>
  );
};
