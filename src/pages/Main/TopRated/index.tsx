import Carousel from "../../../components/Carousel";
import ContentWrapper from "../../../components/ContentWrapper";
import Switcher from "../../../components/Switcher";
import useFetch from "../../../hooks/useFetch";
import { MovieResult } from "../../../types/movie";
import "./style.scss";
import { useState } from "react";

const TopRated = () => {
  const [switchState, setSwitchState] = useState<boolean>(false);
  const [data] = useFetch<MovieResult>(
    `https://api.themoviedb.org/3/${!switchState ? "movie" : "tv"}/top_rated`
  );

  const handleSwitch = () => {
    setSwitchState((prev) => !prev);
  };

  return (
    <section className="top-rated">
      <ContentWrapper>
        <div className="header">
          <h3 className="header__title">Top rated</h3>
          <Switcher
            id="topRated"
            handler={handleSwitch}
            labels={["Movies", "TV Shows"]}
            isChecked={switchState}
          />
        </div>
        <Carousel data={data?.results} />
      </ContentWrapper>
    </section>
  );
};

export default TopRated;
