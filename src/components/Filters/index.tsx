import Select from "react-select";
import { Genre } from "../../types/movie";
import "./style.scss";

interface FiltersProps {
  genres: Genre[] | undefined;
  handler: (type: string, value: any) => void;
}

const orderOptions = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const Filters = ({ genres, handler }: FiltersProps) => {
  return (
    <>
      <Select
        isMulti
        isSearchable={false}
        name="genres"
        placeholder="Select genres"
        closeMenuOnSelect={false}
        onChange={(value) => handler("genres", value)}
        options={genres}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => String(option.id)}
        className="react-select-container"
        classNamePrefix="react-select"
      />
      <Select
        name="order"
        isClearable
        options={orderOptions}
        onChange={(value) => handler("order", value)}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </>
  );
};

export default Filters;
