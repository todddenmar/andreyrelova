"use client";

export default function CanvaSlideshow() {
  return (
    <div className="relative w-full aspect-[9/16]">
      <iframe
        src="https://www.canva.com/design/DAG3nFYglgI/lNqA9mvQDzcq8uN39VN-6Q/view?embed"
        className="w-full h-full rounded-lg border-none"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
}
