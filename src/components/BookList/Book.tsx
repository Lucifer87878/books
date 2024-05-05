import { Link } from "react-router-dom";
import "./BookList.scss";

interface BookProps {
  book: {
    id: string;
    cover_img: string;
    title: string;
    author: string | string[];
    edition_count: number;
    first_publish_year: number;
  };
  toggleFavorite: (id: string) => void;
  toggleRead: (id: string) => void;
}


const Book: React.FC<BookProps> = ({ book, toggleFavorite, toggleRead }) => {
  const handleToggleFavorite = () => {
    toggleFavorite(book.id);
  };

  const handleToggleRead = () => {
    toggleRead(book.id);
  };

  return (
    <div className="book-item flex flex-column flex-sb">
      <div className="book-item-img">
        <img src={book.cover_img} alt="cover" />
      </div>
      <div className="book-item-info text-center">
        <Link to={`/book/${book.id}`} {...book}>
          <div className="book-item-info-item title fw-7 fs-18">
            <span>{book.title}</span>
          </div>
        </Link>

        <div className="book-item-info-item author fs-15">
          <span className="text-capitalize fw-7">Author: </span>
          <span>{Array.isArray(book.author) ? book.author.join(", ") : book.author}</span>
        </div>

        <div className="book-item-info-item edition-count fs-15">
          <span className="text-capitalize fw-7">Total Editions: </span>
          <span>{book.edition_count}</span>
        </div>

        <div className="book-item-info-item publish-year fs-15">
          <span className="text-capitalize fw-7">First Publish Year: </span>
          <span>{book.first_publish_year}</span>
        </div>

        <button onClick={handleToggleFavorite}>Toggle Favorite</button>
        <button onClick={handleToggleRead}>Toggle Read</button>
      </div>
    </div>
  );
};

export default Book;