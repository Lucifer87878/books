import BookDetails from "../../components/BookDetails/BookDetails";

const Bookmarks = () => {
  const favoriteBooks = Object.values(localStorage).map((item: any) =>
    JSON.parse(item)
  );

  return (
    <div>
      <h2>Favorite Books</h2>
      {favoriteBooks.length === 0 ? (
        <p>No favorite books yet.</p>
      ) : (
        <ul>
          {favoriteBooks.map((book: BookDetails, index: number) => (
            <li key={index}>
              <div className="content">
                <div className='book-details-content grid'>
                  <div className='book-details-img'>
                    <img src={book.cover_img} alt={book.title} />
                  </div>
                  <div className="book-details-item">
                    <h3 className='fw-6 fs-24'>{book.title}</h3>
                    <p className="book-details-item description">{book.description}</p>
                    <p className='fw-6 text-italic'>{book.subject_places}</p>
                    <p className="Favo_times">{book.subject_times}</p>
                    <p className="Favo_subjects">{book.subjects}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookmarks;
