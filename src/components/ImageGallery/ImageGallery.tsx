import type { UnsplashImage } from "../../types/types";
import ImageCard from "../ImageCard/ImageCard";

interface Props {
  images: UnsplashImage[];
  onImageClick: (img: UnsplashImage) => void;
}

export default function ImageGallery({ images, onImageClick }: Props) {
  if (!images.length) return null;

  return (
    <ul>
      {images.map((img) => (
        <li key={img.id}>
          <div onClick={() => onImageClick(img)}>
            <ImageCard image={img} />
          </div>
        </li>
      ))}
    </ul>
  );
}
