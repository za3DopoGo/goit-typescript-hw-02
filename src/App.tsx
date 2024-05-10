import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import { getImagesByQuery } from "./apiServices/api";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { RequestData, RequiredFields } from "./types";

function App() {
  const [images, setImages] = useState<RequiredFields[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [btnLoadMore, setbtnLoadMore] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<RequiredFields[]>([]);

  useEffect(() => {
    if (query.length === 0) return;

    const fetchImages = async (query: string, page: number): Promise<void> => {
      try {
        const data: RequestData = await getImagesByQuery(query, page);

        setImages((prevImages) => [...prevImages, ...data.results]);
        setbtnLoadMore(data.total_pages > page);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages(query, page);
  }, [query, page]);

  const onSetSearchQuery = (searchTerm: string) => {
    setQuery(searchTerm);
    setIsLoading(true);
    setError(false);
    setImages([]);
  };
  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  const openModal = (id: string): void => {
    setModalImage(images.filter((image) => image.id === id));
    setIsOpen(true);
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove("modal-open");
  };

  return (
    <div>
      <SearchBar onSetSearchQuery={onSetSearchQuery} toast={toast} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {btnLoadMore && <LoadMoreBtn loadMore={loadMore} images={images} />}
      <ImageModal
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        modalImage={modalImage}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
