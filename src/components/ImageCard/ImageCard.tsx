import { FC } from "react";
import { RequiredFields } from "../../types";
import css from "./ImageCard.module.css";

interface ImageCardProps {
  image: RequiredFields;
  openModal: (id: string) => void;
}
const ImageCard: FC<ImageCardProps> = ({ image, openModal }) => {
  return (
    <div className={css.imgContainer}>
      <img
        onClick={() => openModal(image.id)}
        className={css.image}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
};

export default ImageCard;
