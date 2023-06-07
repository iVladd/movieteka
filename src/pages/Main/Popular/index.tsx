import Carousel from "../../../components/Carousel";
import ContentWrapper from "../../../components/ContentWrapper";
import Switcher from "../../../components/Switcher";
import useFetch from "../../../hooks/useFetch";
import { MovieResult } from "../../../types/movie";
import "./style.scss";
import { useState } from "react";

const Popular = () => {
  const [switchState, setSwitchState] = useState<boolean>(false);
  const [data] = useFetch<MovieResult>(
    `https://api.themoviedb.org/3/${!switchState ? "movie" : "tv"}/popular`
  );

  const handleSwitch = () => {
    setSwitchState((prev) => !prev);
  };

  return (
    <section className="popular">
      <ContentWrapper>
        <div className="header">
          <h3 className="header__title">What's Popular</h3>
          <Switcher
            id="popular"
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

export default Popular;
