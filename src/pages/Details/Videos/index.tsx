import ContentWrapper from "../../../components/ContentWrapper";
import Img from "../../../components/LazyLoadImage/Img";
import PlayIcon from "../../../components/PlayIcon";
import useFetch from "../../../hooks/useFetch";
import "./style.scss";

interface VideosProps {
  id: number | undefined;
  mediaType: string | undefined;
}

interface Videos {
  id: number;
  results: {
    id: string;
    key: string;
    name: string;
    site: string;
    size: number;
  }[];
}

const Videos = ({ id, mediaType }: VideosProps) => {
  const [videos, isLoading, error] = useFetch<Videos>(
    `https://api.themoviedb.org/3/${mediaType}/${id}/videos`
  );

  if (videos?.results.length === 0 || error) return null;

  return (
    <section className="videos">
      <ContentWrapper>
        <h2 className="videos__label">Official Videos</h2>
        <div className="videos__container">
          {isLoading &&
            Array.from(Array(4).keys()).map((i) => (
              <div className="video-skeleton" key={i}>
                <div className="image"></div>
                <div className="one-line"></div>
              </div>
            ))}
          {videos?.results &&
            videos.results.slice(0, 4).map((video) => (
              <div key={video.id} className="video-card">
                <div className="video-card__image">
                  <Img
                    src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                  />
                  <PlayIcon />
                </div>
                <span className="video-card__title">{video.name}</span>
              </div>
            ))}
        </div>
      </ContentWrapper>
    </section>
  );
};

export default Videos;
