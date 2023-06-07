import Carousel from "../../../components/Carousel";
import ContentWrapper from "../../../components/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import { MovieResult } from "../../../types/movie";
import "./style.scss";

interface SimilarProps {
  id: number | undefined;
  mediaType: string | undefined;
}

const Similar = ({ id, mediaType }: SimilarProps) => {
  const [similar] = useFetch<MovieResult>(
    `https://api.themoviedb.org/3/${mediaType}/${id}/similar`
  );

  return (
    <section className="similar">
      <ContentWrapper>
        <h2 className="similar__label">Similar Movies</h2>
        <Carousel data={similar?.results}></Carousel>
      </ContentWrapper>
    </section>
  );
};

export default Similar;
