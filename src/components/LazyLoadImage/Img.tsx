import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface LazyLoadImageProps {
  src: string;
  className?: string;
  alt?: string;
}

const Img = ({ src, className, alt }: LazyLoadImageProps) => {
  return (
    <LazyLoadImage
      className={className || ""}
      alt={alt || ""}
      src={src}
      effect="blur"
    />
  );
};

export default Img;
