import { FC } from "react";
import { RequiredFields } from "../../types";
import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  loadMore: () => void;
  images: RequiredFields[];
}
const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ loadMore, images }) => {
  return (
    <div className={css.btnContainer}>
      {images.length > 0 && (
        <button className={css.loadMoreBtn} onClick={loadMore} type="button">
          Load more
        </button>
      )}
    </div>
  );
};

export default LoadMoreBtn;
