import "./style.scss";

const MovieCardSkeleton = () => {
  return (
    <div className="card-skeleton">
      <div className="card-skeleton__img"></div>
      <div className="card-skeleton__title"></div>
      <div className="card-skeleton__date"></div>
    </div>
  );
};

export default MovieCardSkeleton;
