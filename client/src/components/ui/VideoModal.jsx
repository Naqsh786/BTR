import { useEffect, useRef } from "react";
import { X } from "lucide-react";

export default function VideoModal({ open, onClose, videoUrl, videoSrc, title }) {
  const overlayRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const embedUrl = videoUrl
    ? videoUrl.replace("watch?v=", "embed/").replace("outu.be/", "youtube.com/embed/")
    : null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label={title || "Video player"}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close video"
        className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 bg-ink/60 text-cream/70 backdrop-blur-sm transition-colors hover:border-cream/40 hover:text-cream md:right-8 md:top-8"
      >
        <X size={20} strokeWidth={1.5} />
      </button>

      {/* Video container */}
      <div className="relative w-[92vw] max-w-4xl overflow-hidden rounded-lg border border-cream/10 bg-ink shadow-2xl">
        {embedUrl ? (
          <div className="relative pb-[56.25%]">
            <iframe
              ref={frameRef}
              src={`${embedUrl}?autoplay=1&rel=0`}
              title={title || "Video"}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        ) : videoSrc ? (
          <div className="relative">
            <video
              ref={frameRef}
              src={videoSrc}
              controls
              autoPlay
              className="h-auto w-full"
              poster={null}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 px-8 py-24 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-clay/40">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                className="ml-1 text-clay"
              >
                <polygon points="5,3 19,12 5,21" fill="currentColor" />
              </svg>
            </div>
            <div>
              <p className="font-serif text-xl text-cream">Coming Soon</p>
              <p className="mt-2 text-sm text-cream/50">
                Our showcase video is in production.
                <br />
                Check back soon for a tour of our work.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
