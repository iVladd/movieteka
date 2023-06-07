import { useState, useEffect } from "react";
import "./style.scss";
import useFetch from "../../hooks/useFetch";
import { Genre, GenreResult, MovieResult } from "../../types/movie";
import MovieCard from "../../components/MovieCard";
import ContentWrapper from "../../components/ContentWrapper";
import { BASE_URL, token } from "../../config";
import Filters from "../../components/Filters";
import MovieCardSkeleton from "../../components/MovieCard/MovieCardSkeleton";
import InfiniteScroll from "react-infinite-scroll-component";

interface IFilter {
  genres: number[];
  order: string | null;
}

const TVExplore = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<IFilter>({
    genres: [],
    order: null,
  });
  const [data, setData] = useState<MovieResult | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [genres] = useFetch<GenreResult>(
    `https://api.themoviedb.org/3/genre/tv/list`
  );

  const defineQueryString = (page: number): string => {
    const genres =
      filters.genres.length > 0 ? `&with_genres=${filters.genres}` : "";
    const order = filters.order ? `&sort_by=${filters.order}` : "";

    return `${BASE_URL}/discover/tv?page=${page}${genres}${order}`;
  };

  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(1);
    setError("");
    fetch(defineQueryString(1), {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Server Error");
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((e: Error) => {
        setError(e.message);
      });
  }, [filters.genres, filters.order]);

  const handleFilters = (type: string, value: any) => {
    if (type === "genres") {
      setFilters((prev) => {
        const genresId = value.map((genre: Genre) => genre.id) || [];
        return { ...prev, genres: genresId };
      });
    } else {
      setFilters((prev) => ({ ...prev, order: value ? value.value : null }));
    }
  };

  const fetchNextPage = () => {
    fetch(defineQueryString(currentPage + 1), {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data: MovieResult) => {
        setCurrentPage((prev) => prev + 1);
        setData((prev) => {
          return {
            ...data,
            results: [...(prev?.results || []), ...data.results],
          };
        });
      });
  };

  return (
    <section className="explore-tv">
      <ContentWrapper>
        <div className="explore-tv__header">
          <h2 className="explore-tv__title">Explore TV Shows</h2>
          <div className="explore-tv__filters">
            <Filters genres={genres?.genres} handler={handleFilters} />
          </div>
        </div>
        {error && (
          <div className="explore-tv__info">
            <h2>{error}</h2>
            <p>Try to refresh page</p>
          </div>
        )}
        {!error && !isLoading && data?.results.length === 0 && (
          <div className="explore-tv__info">
            <h2>Nothing was found for these parameters</h2>
          </div>
        )}
        <InfiniteScroll
          dataLength={data ? data.results.length : 0}
          next={fetchNextPage}
          hasMore={data ? data.results.length >= 20 : false}
          loader={<h4>Loading...</h4>}
        >
          <div className="explore-tv__list">
            {data?.results &&
              data.results.map((movie) => (
                <MovieCard key={movie.id} data={movie} />
              ))}
            {isLoading &&
              Array.from(Array(15).keys()).map((i) => (
                <MovieCardSkeleton key={i} />
              ))}
          </div>
        </InfiniteScroll>
      </ContentWrapper>
    </section>
  );
};

export default TVExplore;
