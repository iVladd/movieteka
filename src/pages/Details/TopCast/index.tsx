import ContentWrapper from "../../../components/ContentWrapper";
import Img from "../../../components/LazyLoadImage/Img";
import { IMAGES_DB_URL } from "../../../config";
import useFetch from "../../../hooks/useFetch";
import { Credits } from "../../../types/movie";
import noAvatar from "../../../assets/no-avatar.png";
import "./style.scss";

interface TopCastProps {
  id: number | undefined;
  mediaType: string | undefined;
}

const TopCast = ({ id, mediaType }: TopCastProps) => {
  const [cast, isLoading, error] = useFetch<Credits>(
    `https://api.themoviedb.org/3/${mediaType}/${id}/credits`
  );

  if (cast?.cast.length === 0 || error) return null;

  return (
    <section className="top-cast">
      <ContentWrapper>
        <h2 className="top-cast__label">Top Cast</h2>
        <div className="top-cast__wrapper">
          {isLoading &&
            Array.from(Array(6).keys()).map((i) => (
              <div className="cast-skeleton" key={i}>
                <div className="image"></div>
                <div className="one-line"></div>
                <div className="one-line"></div>
              </div>
            ))}
          {cast?.cast.slice(0, 6).map((c) => (
            <div className="person" key={c.id}>
              <div className="person__photo">
                <Img
                  src={
                    c.profile_path
                      ? IMAGES_DB_URL + "/w500" + c.profile_path
                      : noAvatar
                  }
                />
              </div>
              <span className="person__name">{c.name}</span>
              <span className="person__character">{c.character}</span>
            </div>
          ))}
        </div>
      </ContentWrapper>
    </section>
  );
};

export default TopCast;
