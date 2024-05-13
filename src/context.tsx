import React, { useState, useContext, useCallback, useEffect, PropsWithChildren } from 'react';

const URL = 'https://openlibrary.org/search.json?title=';

interface Book {
  id: string;
  author: string;
  cover_id: number;
  edition_count: number;
  first_publish_year: number;
  title: string;
}

interface AppContextProps {
  loading: boolean;
  books: Book[];
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  resultTitle: string;
  setResultTitle: React.Dispatch<React.SetStateAction<string>>;
}

const AppContext = React.createContext<AppContextProps | undefined>(undefined);

const AppProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('Atlantis');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState('');

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}${searchTerm}`);
      const data = await response.json();
      const { docs } = data;
  
      if (docs) {
        const newBooks: Book[] = docs
          .slice(0, 20)
          .map((bookSingle: any) => ({
            id: bookSingle.key,
            author: bookSingle.author_name[0],
            cover_id: bookSingle.cover_i,
            edition_count: bookSingle.edition_count,
            first_publish_year: bookSingle.first_publish_year,
            title: bookSingle.title,
          }));
  
        setBooks(newBooks);
  
        if (newBooks.length > 1) {
          setResultTitle('Your Result');
        } else {
          setResultTitle('Sorry, unfortunately the book you are looking for is not available!');
        }
      } else {
        setBooks([]);
        setResultTitle('Sorry, unfortunately the book you are looking for is not available!');
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [searchTerm]);
  
  useEffect(() => {
    fetchBooks();
  }, [searchTerm, fetchBooks]);


  return (
    <AppContext.Provider value={{ loading, books, setSearchTerm, resultTitle, setResultTitle }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within an AppProvider');
  }
  return context;
};

export { AppProvider, useGlobalContext, AppContext };
