import Banner from "./Banner";
import Popular from "./Popular";
import TopRated from "./TopRated";
import Trending from "./Trending";
import "./main.scss";

const Main = () => {
  return (
    <>
      <Banner />
      <Trending />
      <Popular />
      <TopRated />
    </>
  );
};

export default Main;
