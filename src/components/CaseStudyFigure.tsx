import Image from "next/image";

type AspectRatio = "16/9" | "4/3" | "3/2" | "21/9";

interface CaseStudyFigureProps {
  src: string;
  alt: string;
  caption?: string;
  aspect?: AspectRatio;
  /** Controls which part of the image is visible when cropped. Defaults to "top". */
  objectPosition?: "top" | "center" | "bottom";
  /** "cover" crops to fill the frame (default). "contain" shows the full image with neutral background. */
  objectFit?: "cover" | "contain";
  /** Override top margin. Defaults to "mt-10 md:mt-12". */
  className?: string;
}

const aspectClasses: Record<AspectRatio, string> = {
  "16/9": "aspect-[16/9]",
  "4/3":  "aspect-[4/3]",
  "3/2":  "aspect-[3/2]",
  "21/9": "aspect-[21/9]",
};

/**
 * Reusable image wrapper for case study screenshots and photos.
 *
 * Applies a consistent editorial frame:
 *   - rounded-2xl corners
 *   - overflow hidden (keeps image within the rounded container)
 *   - subtle neutral-200 border
 *   - soft two-layer shadow (light, not card-heavy)
 *   - optional caption aligned to the image width
 *
 * Usage:
 *   <CaseStudyFigure
 *     src="/work/olg/olg-hero.png"
 *     alt="…"
 *     caption="Caption text here."
 *     aspect="16/9"
 *   />
 */
export function CaseStudyFigure({
  src,
  alt,
  caption,
  aspect = "16/9",
  objectPosition = "top",
  objectFit = "cover",
  className = "mt-10 md:mt-12",
}: CaseStudyFigureProps) {
  return (
    <figure className={className}>
      <div
        className={[
          "group relative w-full overflow-hidden rounded-2xl bg-neutral-100",
          "border border-neutral-200",
          "shadow-[0_18px_50px_rgba(15,23,42,0.08),0_2px_8px_rgba(15,23,42,0.04)]",
          aspectClasses[aspect],
        ].join(" ")}
      >
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          sizes="(min-width: 1200px) 900px, (min-width: 768px) 88vw, 94vw"
          className={[
            objectFit === "contain" ? "object-contain" : "object-cover",
            objectFit === "contain" ? "object-center" :
              objectPosition === "center" ? "object-center" :
              objectPosition === "bottom" ? "object-bottom" :
              "object-top",
            "transition duration-500 ease-out group-hover:scale-[1.015]",
          ].join(" ")}
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 text-xs leading-relaxed text-neutral-400">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
