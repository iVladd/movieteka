import { useNavigate } from "react-router-dom";
import { IMAGES_DB_URL } from "../../config";
import { Movie } from "../../types/movie";
import Genres from "../Genres";
import Img from "../LazyLoadImage/Img";
import noPoster from "../../assets/no-poster.png";
import CircleRating from "../CircleRating";
import { transformDate } from "../../utils/dateTransform";
import "./style.scss";

interface MovieCardProps {
  data: Movie;
}

const MovieCard = ({ data }: MovieCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => {
        navigate(`/explore/${data.title ? "movie" : "tv"}/${data.id}`);
      }}
    >
      {data.poster_path ? (
        <Img
          src={IMAGES_DB_URL + "/w500/" + data.poster_path}
          className="card__img"
          alt={data.title}
        />
      ) : (
        <img src={noPoster} alt="No poster available" className="card__img" />
      )}
      {data.genre_ids && (
        <div className="card__genres">
          <Genres data={data.genre_ids.slice(0, 2)} />
        </div>
      )}
      <CircleRating
        rating={data.vote_average ? data.vote_average.toFixed(1) : "0.0"}
        bgColor="white"
      />
      <span className="card__title">{data.title || data.name}</span>
      <span className="card__date">
        {(data.release_date || data.first_air_date) &&
          transformDate(data.release_date || data.first_air_date)}
      </span>
    </div>
  );
};

export default MovieCard;
