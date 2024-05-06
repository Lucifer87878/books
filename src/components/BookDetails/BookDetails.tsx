import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Loader/Loader';
import coverImg from '../../images/book-no-cover.jpg';
import './BookDetails.scss';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const URL = "https://openlibrary.org/works/";

interface BookDetails {
  description: string;
  title: string;
  cover_img: string;
  subject_places: string;
  subject_times: string;
  subjects: string;
}

const BookDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState<BookDetails | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();

        if (data) {
          const { description, title, covers, subject_places, subject_times, subjects } = data;
          const newBook: BookDetails = {
            description: description ? description.value : "No description found",
            title: title,
            cover_img: covers && covers.length > 0 ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverImg,
            subject_places: subject_places ? subject_places.join(", ") : "No Subject places found",
            subject_times: subject_times ? subject_times.join(", ") : "No Subject times found",
            subjects: subjects ? subjects.join(", ") : "No Subjects found",
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookDetails;
