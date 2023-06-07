import { useNavigate } from "react-router-dom";
import ContentWrapper from "../../../components/ContentWrapper";
import Img from "../../../components/LazyLoadImage/Img";
import { IMAGES_DB_URL } from "../../../config";
import useFetch from "../../../hooks/useFetch";
import { MovieResult } from "../../../types/movie";
import "./style.scss";
import { useState } from "react";
import { useEffect } from "react";

const Banner = () => {
  const [data] = useFetch<MovieResult>(
    "https://api.themoviedb.org/3/movie/upcoming"
  );
  const navigate = useNavigate();
  const [background, setBackground] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (data && !background) {
      const bg = data.results[Math.floor(Math.random() * 20)].backdrop_path;
      setBackground(IMAGES_DB_URL + "/original/" + bg);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search/${searchValue}`);
  };

  return (
    <div className="banner__wrapper">
      {background && (
        <img
          src={background}
          className="banner__background"
          alt="Banner image"
        />
      )}
      <div className="banner__substrate"></div>
      <ContentWrapper>
        <div className="banner">
          <div className="banner__content">
            <h1 className="banner__title">Welcome!</h1>
            <p className="banner__subtitle">
              Millions of movies, TV shows and people to discover. Explore now.
            </p>
            <form className="search" onSubmit={(e) => handleSubmit(e)}>
              <input
                type="text"
                className="search__input"
                placeholder="Search for a movie or tv show...."
                value={searchValue}
                onChange={(e) => setSearchValue(e.currentTarget.value)}
              />
              <button className="search__button" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </ContentWrapper>
      <div className="opacity-layer"></div>
    </div>
  );
};

export default Banner;
