import { useGlobalContext } from '../../context';
import Book from "./Book";
import Loading from '../Loader/Loader';
import coverImg from '../../images/book-no-cover.jpg';
import './BookList.scss';



const BookList = () => {
  const {books, loading, resultTitle} = useGlobalContext();
  const booksWithCovers = books.map((singelBook) => {
    return {
      ...singelBook,
      // remowing /works/ to get only id
      id: (singelBook.id).replace("/works/", ""),
      cover_img: singelBook.cover_id ? `https://covers.openlibrary.org/b/id/${singelBook.cover_id}-L.jpg` : coverImg
    }
  });

  console.log(booksWithCovers);

  if(loading) return <Loading />;

  return (
    <section className='booklist'>
      <div className='container'>
        <div className='section-title'>
          <h2>{resultTitle}</h2>
        </div>
        <div className='booklist-content grid'>
          {booksWithCovers.slice(0, 30).map((item, index) => {
            return (
              <Book key = {index} {...item} />
            )
          })
          }

        </div>
      </div>
    </section>
  )
}

export default BookList