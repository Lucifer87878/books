import "./Header.scss";
import Navbar from "../Navbar/Navbar";
import SearchForm from "../SearchForm/SearchForm";

const Header = () => {
  return (
    <div className="holder">
      <header className="header">
        <Navbar />
        <div className="header-content flex flex-c text-conter text-white">
          <h2 className="header-titel text-capitalize">find your book </h2>
          <br />
          <p className="header-text fs-18 fw-3">Lorem ipsum dolor sit amet, 
          consectetur adipisicing elit. 
          Saepe totam ex iste quod, modi suscipit.</p>
          <SearchForm />
        </div>
      </header>
    </div>
  );
};

export default Header;

