import { useParams } from "react-router-dom";
import "./style.scss";
import DetailInfo from "./DetailInfo";
import TopCast from "./TopCast";
import Videos from "./Videos";
import Similar from "./Similar";
import Recommendations from "./Recommendations";

const Details = () => {
  const { id, mediaType } = useParams();

  return (
    <>
      <DetailInfo id={Number(id)} mediaType={mediaType} />
      <TopCast id={Number(id)} mediaType={mediaType} />
      <Videos id={Number(id)} mediaType={mediaType} />
      <Similar id={Number(id)} mediaType={mediaType} />
      <Recommendations id={Number(id)} mediaType={mediaType} />
    </>
  );
};

export default Details;
