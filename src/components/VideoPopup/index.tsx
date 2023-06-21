import ReactPlayer from "react-player";
import useFetch from "../../hooks/useFetch";
import { IVideos } from "../../types/movie";
import "./styles.scss";

interface VideoPopupProps {
  id: number | undefined;
  mediaType: string | undefined;
  videoId?: string | undefined;
}

const VideoPopup = ({ id, mediaType, videoId }: VideoPopupProps) => {
  const [videos] = useFetch<IVideos>(
    `https://api.themoviedb.org/3/${mediaType}/${id}/videos`
  );

  const trailerId = videos?.results.find(
    (video) => video.type === "Trailer"
  )?.key;

  const youtubeId = videoId || trailerId;

  console.log("videoId", videoId);
  console.log("trailer", youtubeId);

  return (
    <div className="player-wrapper">
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${youtubeId}`}
        width="100%"
        height="100%"
        className="react-player"
      />
    </div>
  );
};

export default VideoPopup;
