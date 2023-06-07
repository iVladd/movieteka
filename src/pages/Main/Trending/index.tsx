import Carousel from "../../../components/Carousel";
import ContentWrapper from "../../../components/ContentWrapper";
import Switcher from "../../../components/Switcher";
import useFetch from "../../../hooks/useFetch";
import { MovieResult } from "../../../types/movie";
import "./style.scss";
import { useState } from "react";

const Trending = () => {
  const [switchState, setSwitchState] = useState<boolean>(false);
  const [data] = useFetch<MovieResult>(
    `https://api.themoviedb.org/3/trending/movie/${
      !switchState ? "day" : "week"
    }`
  );

  const handleSwitch = () => {
    setSwitchState((prev) => !prev);
  };

  return (
    <section className="trending">
      <ContentWrapper>
        <div className="header">
          <h3 className="header__title">Trending</h3>
          <Switcher
            id="trending"
            handler={handleSwitch}
            labels={["Day", "Week"]}
            isChecked={switchState}
          />
        </div>
        <Carousel data={data?.results} />
      </ContentWrapper>
    </section>
  );
};

export default Trending;
