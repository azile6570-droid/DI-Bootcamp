import { useSelector } from "react-redux";

export default function AgeDisplay() {
  const { age, loading } = useSelector((state) => state.age);

  return (
    <div className="age-display" aria-live="polite" aria-busy={loading}>
      <p className="age-label">YOUR AGE</p>
      <div className="age-value">
        {loading ? (
          <span className="spinner" role="status" aria-label="Updating age" />
        ) : (
          <>
            <span className="age-number">{age}</span>
            <span className="age-unit">{age === 1 ? "year" : "years"}</span>
          </>
        )}
      </div>
      <p className="age-hint">
        {loading ? "Updating your age…" : "A new year, a new chapter."}
      </p>
    </div>
  );
}
