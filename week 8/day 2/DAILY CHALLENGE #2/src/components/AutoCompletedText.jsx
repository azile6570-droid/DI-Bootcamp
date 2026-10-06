import { Component, createRef } from "react";
import countries from "../data/countries.js";

export default class AutoCompletedText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: "",
      activeIndex: -1,
      selectedCountry: "",
    };
    this.inputRef = createRef();
  }

  handleChange = (event) => {
    const text = event.target.value;
    const query = text.trim().toLocaleLowerCase();
    const suggestions = query
      ? countries.filter((country) =>
          country.toLocaleLowerCase().startsWith(query),
        )
      : [];

    this.setState({
      text,
      suggestions,
      activeIndex: -1,
      selectedCountry: "",
    });
  };

  selectCountry = (country) => {
    this.setState({
      text: country,
      suggestions: [],
      activeIndex: -1,
      selectedCountry: country,
    });
  };

  handleKeyDown = (event) => {
    const { suggestions, activeIndex } = this.state;

    if (event.key === "ArrowDown" && suggestions.length > 0) {
      event.preventDefault();
      this.setState({
        activeIndex: (activeIndex + 1) % suggestions.length,
      });
    } else if (event.key === "ArrowUp" && suggestions.length > 0) {
      event.preventDefault();
      this.setState({
        activeIndex:
          activeIndex <= 0 ? suggestions.length - 1 : activeIndex - 1,
      });
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      this.selectCountry(suggestions[activeIndex]);
    } else if (event.key === "Escape" && suggestions.length > 0) {
      this.setState({ suggestions: [], activeIndex: -1 });
    }
  };

  render() {
    const { suggestions, text, activeIndex, selectedCountry } = this.state;
    const listId = "country-suggestions";

    return (
      <section className="search-card" aria-label="Country autocomplete">
        <label className="search-label" htmlFor="country-search">
          COUNTRY NAME
        </label>
        <div className="search-control">
          <span className="search-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" focusable="false">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 4.2 4.2" />
            </svg>
          </span>
          <input
            ref={this.inputRef}
            id="country-search"
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={suggestions.length > 0}
            aria-controls={listId}
            aria-activedescendant={
              activeIndex >= 0 ? `country-option-${activeIndex}` : undefined
            }
            autoComplete="off"
            value={text}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            placeholder="Try “Japan” or “Canada”"
          />
          <span className="key-hint" aria-hidden="true">↵</span>
        </div>

        {suggestions.length > 0 && (
          <ul className="suggestion-list" id={listId} role="listbox">
            {suggestions.map((country, index) => (
              <li
                className={`suggestion-item${index === activeIndex ? " is-active" : ""}`}
                id={`country-option-${index}`}
                key={country}
                role="option"
                aria-selected={index === activeIndex}
              >
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => this.selectCountry(country)}
                >
                  <span>{country}</span>
                  <span className="suggestion-arrow" aria-hidden="true">↗</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        <p className="search-note" aria-live="polite">
          {text && suggestions.length > 0
            ? `${suggestions.length} ${suggestions.length === 1 ? "match" : "matches"}`
            : selectedCountry
              ? "Country selected"
              : text
              ? "No matching countries"
              : "Suggestions appear as you type"}
        </p>

        {selectedCountry && (
          <div className="selected-country" role="status">
            <span className="selected-mark" aria-hidden="true">✓</span>
            <div>
              <span className="selected-label">SELECTED COUNTRY</span>
              <strong>{selectedCountry}</strong>
            </div>
          </div>
        )}
      </section>
    );
  }
}
