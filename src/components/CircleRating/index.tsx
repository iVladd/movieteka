import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

interface CircleRatingProps {
  rating: string;
  bgColor: "white" | "black";
}

const CircleRating = ({ rating, bgColor }: CircleRatingProps) => {
  const num = Number(rating);

  return (
    <div className={`circleRating ${bgColor === "black" && "black"}`}>
      <CircularProgressbar
        value={num}
        maxValue={10}
        text={rating.toString()}
        styles={buildStyles({
          pathColor: num < 5 ? "red" : num < 7 ? "orange" : "green",
        })}
      />
    </div>
  );
};

export default CircleRating;
