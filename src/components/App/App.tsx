import { useState } from "react";
import { searchImages } from "../../api";
import type { UnsplashImage } from "../../types/types";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { Toaster } from "react-hot-toast";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<UnsplashImage | null>(
    null
  );

  const handleSearch = async (newQuery: string) => {
    if (!newQuery.trim()) return;

    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);

    try {
      setIsLoading(true);
      const data = await searchImages(newQuery, 1);
      setImages(data.results);
    } catch {
      setError("Не вдалося завантажити зображення.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setIsLoading(true);
      const nextPage = page + 1;
      const data = await searchImages(query, nextPage);
      setImages((prev) => [...prev, ...data.results]);
      setPage(nextPage);
    } catch {
      setError("Помилка при завантаженні додаткових зображень.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <SearchBar onSearch={handleSearch} />

      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <ImageGallery images={images} onImageClick={setSelectedImage} />
          {isLoading && <Loader />}
          {images.length > 0 && !isLoading && (
            <LoadMoreBtn onClick={handleLoadMore} />
          )}
        </>
      )}

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
}
