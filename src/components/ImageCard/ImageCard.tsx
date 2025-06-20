import type { UnsplashImage } from "../../types/types";

interface ImageCardProps {
  image: UnsplashImage;
}

export default function ImageCard({ image }: ImageCardProps) {
  return <img src={image.urls.small} alt={image.alt_description || "Image"} />;
}
