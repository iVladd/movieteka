import { useState, useRef, useEffect } from "react";
import { Movie } from "../../types/movie";
import "./style.scss";
import MovieCard from "../MovieCard";
import MovieCardSkeleton from "../MovieCard/MovieCardSkeleton";
import { FaArrowAltCircleLeft } from "@react-icons/all-files/fa/FaArrowAltCircleLeft";
import { FaArrowAltCircleRight } from "@react-icons/all-files/fa/FaArrowAltCircleRight";

interface CarouselProps {
  data: Movie[] | undefined;
}

const Carousel = ({ data }: CarouselProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset(0);
  }, [data]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${offset}px)`;
    }
  }, [offset]);

  const handleArrowClick = (dir: string) => {
    const container = containerRef.current;
    if (container) {
      dir === "left"
        ? setOffset((prev) => prev + container.offsetWidth + 10)
        : setOffset((prev) => prev - container.offsetWidth - 10);
    }
  };

  return (
    <div className="carousel">
      {data && (
        <button
          className="button button__left"
          onClick={() => {
            handleArrowClick("left");
          }}
          disabled={offset === 0}
        >
          <FaArrowAltCircleLeft className="button__icon" />
        </button>
      )}
      <div className="carousel__container" ref={containerRef}>
        {data
          ? data.map((movie) => <MovieCard data={movie} key={movie.id} />)
          : Array.from(Array(5).keys()).map((i) => (
              <MovieCardSkeleton key={i} />
            ))}
      </div>
      {data && (
        <button
          className="button button__right"
          onClick={() => {
            handleArrowClick("right");
          }}
          disabled={offset < -2350}
        >
          <FaArrowAltCircleRight className="button__icon" />
        </button>
      )}
    </div>
  );
};

export default Carousel;
