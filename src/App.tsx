import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home  from "./pages/Home/Home";
import { Bookmarks } from "./pages/Bookmarks/Bookmarks";
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import { AppProvider } from "./context";

function App() {

  return (
    <>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Home />}>
            <Route path="bookmarks" element = {<Bookmarks />} />
            <Route path="book" element = {<BookList />} />
            <Route path="/book/:id" element = {<BookDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
    </>
  )
}

export default App;
 