import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Card({ id, title, icon, description, shaded }) {
  return (
    <article
      className={`feature-row row g-0${shaded ? ' feature-row--shaded' : ''}`}
      id={id}
    >
      <div className="col-12 col-md-3 feature-icon" aria-hidden="true">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="col-12 col-md-9 feature-copy">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </article>
  )
}

export default Card