import Modal from "react-modal";
import { useEffect } from "react";
import styles from "./ImageModal.module.css";
import type { UnsplashImage } from "../../types/types";

interface Props {
  image: UnsplashImage;
  onClose: () => void;
}

export default function ImageModal({ image, onClose }: Props) {
  useEffect(() => {
    Modal.setAppElement("#root");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <Modal
      isOpen={!!image}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
      onAfterOpen={() => (document.body.style.overflow = "hidden")}
      onAfterClose={() => (document.body.style.overflow = "auto")}
    >
      <div onClick={handleBackdropClick} className={styles["modal-content"]}>
        <img src={image.urls.regular} alt={image.alt_description || "Image"} />
      </div>
    </Modal>
  );
}
