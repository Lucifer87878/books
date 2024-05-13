import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Loader/Loader';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { fetchBookDetails } from '../API/api';
import type { BookDetails } from '../API/api';
import Rating from '../Rating/Rating'; // Importera Rating-komponenten
import { MdBookmarkRemove, MdBookmarks } from 'react-icons/md';



const BookDetails = () => {
  const { id } = useParams<{ id?: string }>(); 
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<BookDetails | null>(null);
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0); // Ny state för betyg

  // Funktion för att hantera favoritstatus
  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      localStorage.setItem(id!, JSON.stringify(book)); 
    } else {
      localStorage.removeItem(id!);
    }
  };

  // Funktion för att hantera betygsändringar
 const handleClick = (starIndex: number) => {
    setRating(starIndex + 1);
    localStorage.setItem(`${id}_rating`, String(starIndex + 1)); // Spara betyget i localStorage
  };

  useEffect(() => {
    if (!id) return; 
    setLoading(true);
    
    fetchBookDetails(id).then((bookData) => {
      if (bookData) {
        setBook(bookData);
        const storedRating = localStorage.getItem(`${id}_rating`);
        if (storedRating) {
          setRating(parseInt(storedRating));
        }
        const storedFavorite = localStorage.getItem(id!);
        setIsFavorite(storedFavorite !== null); // Uppdatera favoritstatus baserat på om boken finns i localStorage
      } else {
        setBook(null);
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Loading />;
  if (!book) return <div>No data found for this book.</div>;

  return (
    <section className='book-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/book")}>
          <FaArrowLeft size={22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>
        <div className='book-details-content grid'>
          <div className='book-details-img'>
            <img src={book.cover_img} alt="cover img" />
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='fw-6 fs-24'>{book.title}</span>
            </div>
            <div className='book-details-item description'>
              <span>{book.description}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Places: </span>
              <span className='text-italic'>{book.subject_places}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Times: </span>
              <span className='text-italic'>{book.subject_times}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subjects: </span>
              <span>{book.subjects}</span>
              <div>
                <button className='favorite-button' onClick={handleFavorite}>
                  {isFavorite ? <MdBookmarkRemove /> : <MdBookmarks />}
                </button>
              </div>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Rating: </span>
              <Rating totalStars={5} rating={rating} setRating={setRating} onClick={handleClick} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookDetails;
