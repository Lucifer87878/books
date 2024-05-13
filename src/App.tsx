import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import { AppProvider } from "./context";
import Bookmarks from "./pages/Bookmarks/Bookmarks";

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          {/* Huvudroute för att omsluta alla andra rutter */}
          <Route path="/" element={<Home />}>

            {/* Route för bokmärken */}
            <Route path="bookmarks" element={<Bookmarks />} />

            {/* Route för att visa en lista över böcker */}
            <Route path="book" element={<BookList />} />

          </Route>

          {/* Oberoende route för att visa detaljer om en specifik bok */}
          <Route path="/book/:id" element={<BookDetails />} />
          
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
