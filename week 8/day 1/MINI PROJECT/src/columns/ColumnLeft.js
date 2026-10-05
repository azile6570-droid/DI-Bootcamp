import { Component } from "react";

export default class ColumnLeft extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
  };

  fetchImages = async () => {
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(
        "https://picsum.photos/v2/list?page=0&limit=2",
      );

      if (!response.ok) {
        throw new Error(`Image request failed with status ${response.status}`);
      }

      const images = await response.json();
      this.setState({ images, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  };

  render() {
    const { images, loading, error } = this.state;

    return (
      <section className="column-left">
        <div className="column-heading">
          <span className="column-number">01 / ASYNC</span>
          <h2>Left column</h2>
          <p>Load a couple of images from the Picsum API.</p>
        </div>

        <button
          className="button button-primary"
          disabled={loading}
          onClick={this.fetchImages}
          type="button"
        >
          {loading ? "Getting images…" : "Get images"}
          {!loading && <span aria-hidden="true">↗</span>}
        </button>

        {error && (
          <p className="request-error" role="alert">
            Could not load images: {error.message}
          </p>
        )}

        {images.length > 0 && (
          <div className="images">
            {images.map(({ id, author, download_url }) => (
              <figure className="image-card" key={id}>
                <img src={download_url} alt={`Photo by ${author}`} />
                <figcaption>
                  <span>PHOTO</span>
                  {author}
                </figcaption>
              </figure>
            ))}
          </div>
        )}

        {images.length === 0 && !loading && !error && (
          <div className="image-placeholder" aria-hidden="true">
            <span>IMAGES WILL APPEAR HERE</span>
            <div className="placeholder-shapes">
              <i />
              <i />
            </div>
          </div>
        )}
      </section>
    );
  }
}
