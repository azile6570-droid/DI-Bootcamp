function BootstrapCard({ celebrity }) {
  return (
    <div
      className="card m-5"
      style={{ width: '30rem', maxWidth: 'calc(100vw - 8rem)' }}
    >
      <img
        className="card-img-top"
        src={celebrity.imageUrl}
        alt={celebrity.title}
      />
      <div className="card-body">
        <h5 className="card-title">{celebrity.title}</h5>
        <p className="card-text">{celebrity.description}</p>
        <a className="btn btn-primary" href={celebrity.buttonUrl}>
          {celebrity.buttonLabel}
        </a>
      </div>
    </div>
  )
}

export default BootstrapCard