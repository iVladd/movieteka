import { useState, useEffect } from "react";
import ContentWrapper from "../ContentWrapper";
import logo from "../../assets/logo.svg";
import search from "../../assets/search.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import "./style.scss";

const Header = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setShowSearchBar(false);
  }, [location.pathname]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.length > 0) {
      navigate(`/search/${inputValue}`);
      setShowSearchBar(false);
      setInputValue("");
    } else if (event.key === "Escape") {
      setShowSearchBar(false);
    }
  };

  return (
    <header>
      <ContentWrapper>
        <div className="container">
          <Link to={"/"}>
            <div className="logo">
              <img src={logo} alt="Logo image" className="logo__image" />
              <span className="logo__text">MOVIETEKA</span>
            </div>
          </Link>

          <div className="buttons">
            <Link to={"/explore/movie"} className="buttons__link">
              Movies
            </Link>
            <Link to={"/explore/tv"} className="buttons__link">
              TV Shows
            </Link>
            <button
              className="buttons__search"
              onClick={() => setShowSearchBar((prev) => !prev)}
            >
              <img src={search} alt="Search icon" />
            </button>
          </div>
        </div>
      </ContentWrapper>
      {showSearchBar && (
        <div className="header__search-bar">
          <ContentWrapper>
            <div className="header__input-container">
              <input
                type="text"
                placeholder="Search for a movie or tv show..."
                autoFocus
                value={inputValue}
                onChange={(e) => handleInput(e)}
                onKeyUp={(e) => handleEnterPress(e)}
              />
              <button
                onClick={() => {
                  setShowSearchBar(false);
                }}
              >
                <AiOutlineClose />
              </button>
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
