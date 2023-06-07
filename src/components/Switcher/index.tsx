import "./style.scss";

interface SwitcherProps {
  id: string;
  handler: () => void;
  labels: [string, string];
  isChecked: boolean;
}

const Switcher = ({ id, handler, labels, isChecked }: SwitcherProps) => {
  return (
    <div>
      <input
        className="check"
        type="checkbox"
        id={`${id}-checkbox_toggle`}
        checked={isChecked}
        onChange={handler}
      />
      <div className="checkbox">
        <label htmlFor={`${id}-checkbox_toggle`} className="slide">
          <label htmlFor={`${id}-checkbox_toggle`} className="toggle"></label>
          <label htmlFor={`${id}-checkbox_toggle`} className="text">
            {labels[0]}
          </label>
          <label htmlFor={`${id}-checkbox_toggle`} className="text">
            {labels[1]}
          </label>
        </label>
      </div>
    </div>
  );
};

export default Switcher;
