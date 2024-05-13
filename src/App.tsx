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
          <Route path="/" element={<Home />}>
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="book" element={<BookList />} />
            </Route>
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
