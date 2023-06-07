import Carousel from "../../../components/Carousel";
import ContentWrapper from "../../../components/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import { MovieResult } from "../../../types/movie";
import "./style.scss";

interface RecommendationsProps {
  id: number | undefined;
  mediaType: string | undefined;
}

const Recommendations = ({ id, mediaType }: RecommendationsProps) => {
  const [recommendations] = useFetch<MovieResult>(
    `https://api.themoviedb.org/3/${mediaType}/${id}/recommendations`
  );

  return (
    <section className="recommendations">
      <ContentWrapper>
        <h2 className="recommendations__label">Recommendations Movies</h2>
        <Carousel data={recommendations?.results} />
      </ContentWrapper>
    </section>
  );
};

export default Recommendations;
