import { useDispatch, useSelector } from "react-redux";
import { ageDownAsync, ageUpAsync } from "../app/ageSlice.js";

export default function AgeControls() {
  const dispatch = useDispatch();
  const { age, loading } = useSelector((state) => state.age);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form className="age-controls" onSubmit={handleSubmit}>
      <button
        className="control-button control-button-secondary"
        type="button"
        onClick={() => dispatch(ageDownAsync())}
        disabled={loading || age === 0}
      >
        <span aria-hidden="true">−</span>
        Age Down
      </button>
      <button
        className="control-button control-button-primary"
        type="button"
        onClick={() => dispatch(ageUpAsync())}
        disabled={loading}
      >
        <span aria-hidden="true">+</span>
        Age Up
      </button>
    </form>
  );
}
