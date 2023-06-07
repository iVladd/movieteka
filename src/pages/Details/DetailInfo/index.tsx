import { IMAGES_DB_URL } from "../../../config";
import useFetch from "../../../hooks/useFetch";
import { Credits, MovieDetail } from "../../../types/movie";
import "./style.scss";
import Genres from "./../../../components/Genres/index";
import CircleRating from "../../../components/CircleRating";
import { transformDate } from "../../../utils/dateTransform";
import PlayIcon from "../../../components/PlayIcon";
import ContentWrapper from "../../../components/ContentWrapper";

interface DetailInfoProps {
  id: number | undefined;
  mediaType: string | undefined;
}

const DetailInfo = ({ id, mediaType }: DetailInfoProps) => {
  const [data, isLoading, error] = useFetch<MovieDetail>(
    `https://api.themoviedb.org/3/${mediaType}/${id}`
  );
  const [credits] = useFetch<Credits>(
    `https://api.themoviedb.org/3/${mediaType}/${id}/credits`
  );

  const director = credits?.crew.filter((f) => f.job === "Director") || [];
  const writer =
    credits?.crew.filter(
      (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
    ) || [];
  const defineTitle = () => {
    if (mediaType === "movie") return data?.title;
    return data?.name;
  };

  if (isLoading)
    return (
      <section className="info-skeleton">
        <ContentWrapper>
          <div className="info-skeleton__wrapper">
            <div className="image"></div>
            <div className="block">
              <div className="one-line"></div>
              <div className="buttons-block">
                <div className="button"></div>
                <div className="button"></div>
              </div>
              <div className="multi-line"></div>
              <div className="one-line long"></div>
              <div className="one-line long"></div>
              <div className="one-line long"></div>
            </div>
          </div>
        </ContentWrapper>
      </section>
    );

  if (error)
    return (
      <section className="info-error">
        <div className="wrapper">
          <h1>{error}</h1>
          <p>Try to refresh page</p>
        </div>
      </section>
    );

  return (
    <section className="details__wrapper">
      {data?.poster_path ? (
        <img
          src={IMAGES_DB_URL + "/original/" + data?.backdrop_path || ""}
          className="details__background"
          alt="Film image"
        />
      ) : (
        <></>
      )}
      <ContentWrapper>
        <div className="film">
          {data?.poster_path && (
            <img
              src={IMAGES_DB_URL + "/w500/" + data?.poster_path}
              alt=""
              className="film__image"
            />
          )}
          <div className="film__info">
            <h3 className="film__info__title">{defineTitle()}</h3>
            {data?.tagline && (
              <p className="film__info__tagline">{data.tagline}</p>
            )}
            <div className="film__info__genres">
              <Genres data={data ? data?.genres.map((g) => g.id) : []} />
            </div>
            <div className="film__info__media">
              <CircleRating
                rating={data?.vote_average.toFixed(1) || "0"}
                bgColor="black"
              />
              <button>
                <PlayIcon />
                <span className="text">Watch trailer</span>
              </button>
            </div>
            {data?.overview && (
              <div className="film__info__overview">
                <span className="label">Overview</span>
                <p className="description">{data.overview}</p>
              </div>
            )}
            <div className="film__info__detail">
              <span className="label">Status: </span>
              <span className="description">
                {data?.status ? data.status : "Unknown"}
              </span>
              {mediaType === "movie" && (
                <>
                  <span className="label">Release Date: </span>
                  <span className="description">
                    {data?.release_date
                      ? transformDate(data.release_date)
                      : "Unknown"}
                  </span>
                  <span className="label">Runtime: </span>
                  <span className="description">
                    {data?.runtime ? data.runtime + "m" : "Unknown"}
                  </span>
                </>
              )}
            </div>
            {mediaType === "movie" ? (
              <>
                <div className="film__info__detail">
                  <span className="label">Director: </span>
                  <span className="description">
                    {director[0] ? director[0].name : "Unknown"}
                  </span>
                </div>
                <div className="film__info__detail">
                  <span className="label">Writer: </span>
                  <span className="description">
                    {writer[0] ? writer[0].name : "Unknown"}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="film__info__detail">
                  <span className="label">Creator: </span>
                  {data && data.created_by.length > 0 ? (
                    data?.created_by.map((creator) => (
                      <span className="description">{creator.name}</span>
                    ))
                  ) : (
                    <span className="description">Unknown</span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </ContentWrapper>
      <div className="details__opacity-layer"></div>
    </section>
  );
};

export default DetailInfo;
