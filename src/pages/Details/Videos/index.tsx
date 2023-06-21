import ContentWrapper from "../../../components/ContentWrapper";
import Img from "../../../components/LazyLoadImage/Img";
import PlayIcon from "../../../components/PlayIcon";
import VideoPopup from "../../../components/VideoPopup";
import useFetch from "../../../hooks/useFetch";
import { IVideos } from "../../../types/movie";
import "./style.scss";
import { useState } from "react";

interface VideosProps {
  id: number | undefined;
  mediaType: string | undefined;
}

const Videos = ({ id, mediaType }: VideosProps) => {
  const [videos, isLoading, error] = useFetch<IVideos>(
    `https://api.themoviedb.org/3/${mediaType}/${id}/videos`
  );
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [videoId, setVideoId] = useState("");

  const handleCardClick = (id: string) => {
    setIsPopupOpen(true);
    setVideoId(id);
  };

  console.log(isPopupOpen);

  if (videos?.results.length === 0 || error) return null;

  return (
    <section className="videos">
      {isPopupOpen && (
        <div className="video-popup" onClick={() => setIsPopupOpen(false)}>
          <VideoPopup id={id} mediaType={mediaType} videoId={videoId} />
        </div>
      )}
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
              <div
                key={video.id}
                className="video-card"
                onClick={() => handleCardClick(video.key)}
              >
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
