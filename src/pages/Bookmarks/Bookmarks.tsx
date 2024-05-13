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
          {favoriteBooks.map((book: BookDetails) => (
            <li key={book.title}>
              <div>
                <img src={book.cover_img} alt={book.title} />
              </div>
              <div>
                <h3>{book.title}</h3>
                <p>{book.description}</p>
                <p>Subject Places: {book.subject_places}</p>
                <p>Subject Times: {book.subject_times}</p>
                <p>Subjects: {book.subjects}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookmarks;