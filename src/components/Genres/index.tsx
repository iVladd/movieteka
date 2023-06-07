import { useSelector } from "react-redux";
import "./style.scss";
import { selectGenresById } from "../../redux/genres/genresSelectors";
import { RootState } from "../../redux/store";

const Genres = ({ data }: { data: number[] }) => {
  const genres = useSelector((state: RootState) =>
    selectGenresById(state, data)
  );

  if (genres[0] === undefined) return null;

  return (
    <div className="genres">
      {genres.map((genre, i) => (
        <span className="genres__item" key={i}>
          {genre}
        </span>
      ))}
    </div>
  );
};

export default Genres;
