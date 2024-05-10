import { FC } from "react";
import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import { RequiredFields } from "../../types";

interface ImageGalleryProps {
  images: RequiredFields[];
  openModal: (id: string) => void;
}
const ImageGallery: FC<ImageGalleryProps> = ({ images, openModal }) => {
  return (
    <ul className={css.imagesList}>
      {images.length > 0 &&
        images.map((image) => {
          return (
            <li className={css.imageItem} key={image.id}>
              <ImageCard image={image} openModal={openModal} />
            </li>
          );
        })}
    </ul>
  );
};

export default ImageGallery;
