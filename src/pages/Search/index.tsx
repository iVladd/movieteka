import { useParams } from "react-router-dom";
import ContentWrapper from "../../components/ContentWrapper";
import { MovieResult } from "../../types/movie";
import MovieCard from "../../components/MovieCard";
import { useState, useEffect } from "react";
import { token } from "../../config";

import "./style.scss";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCardSkeleton from "../../components/MovieCard/MovieCardSkeleton";

const Search = () => {
  const { query } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<MovieResult | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setCurrentPage(1);
    setError("");
    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${query}&page=${currentPage}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
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
  }, [query]);

  console.log(data);

  const fetchNextPage = () => {
    fetch(
      `https://api.themoviedb.org/3/search/multi?query=${query}&page=${
        currentPage + 1
      }`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
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
    <section className="search-section">
      <ContentWrapper>
        <h2 className="search-section__label">Search results for '{query}'</h2>
        {error && (
          <div className="search-section__info">
            <h2>{error}</h2>
            <p>Try to refresh page</p>
          </div>
        )}
        {!error && !isLoading && data?.results.length === 0 && (
          <div className="search-section__info">
            <h2>Nothing was found for this query</h2>
          </div>
        )}
        <InfiniteScroll
          dataLength={data ? data.results.length : 0}
          next={fetchNextPage}
          hasMore={data ? data.results.length >= 20 : false}
          loader={<h4>Loading...</h4>}
        >
          <div className="search-section__list">
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

export default Search;
