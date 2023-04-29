import React, { useState } from "react";
import "./AutoComplete.css";

function AutoComplete({ data }) {
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [options, setOptions] = useState([]);
  const [result, showResult] = useState(false);

  function handleInputChange(event) {
    setInputValue(event.target.value);
    setShowDropdown(true);

    if (event.target.value === "") {
      setShowDropdown(false);
    } else {
      const filteredOptions = data
        .filter((option) =>
          option.first_name
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        )
        .slice(0, 5);
      setOptions(filteredOptions);
      showResult(false);
    }
  }

  function handleClearClick() {
    setInputValue("");
    setShowDropdown(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    showResult(true);
  }

  function handleOptionClick(option) {
    setInputValue(option.first_name);
    setShowDropdown(false);
    showResult(false);
  }

  const highlightMatches = (text, query) => {
    const textArr = text.split(new RegExp(`(${query})`, "gi"));
    return (
      <>
        {textArr.map((part, i) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={i} className="highlight">
              {part}
            </span>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </>
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>AutoComplete Assignment :</h2>
      <div className="autocomplete">
        <input type="text" placeholder="Search here..." value={inputValue} onChange={handleInputChange} />
        {inputValue && (
          <button type="button" onClick={handleClearClick}>
            Clear
          </button>
        )}
        {showDropdown && (
          <ul className="autocomplete-menu">
            {options.length === 0 ? (
              <li className="autocomplete-option">No results found</li>
            ) : (
              options.map((option) => (
                <li
                  key={option.student_id}
                  className="autocomplete-option"
                  onClick={() => handleOptionClick(option)}
                >
                  {highlightMatches(option.first_name, inputValue)}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
        <button className="button" type="submit">
          Search
        </button>
      {result &&
        inputValue &&
        data.find((item) => item.first_name === inputValue) && (
          <div className="card autocomplete-match-info">
            <div className="container">
            <h3>Student Details :</h3>
              <p>
                <b>First Name </b> : {inputValue}
              </p>
              <p>
                <b>Last Name</b> :{" "}
                {data.find((item) => item.first_name === inputValue).last_name}
              </p>
              <p>
                <b>Major</b> :{" "}
                {data.find((item) => item.first_name === inputValue).major}
              </p>
              <p>
                <b>Grad. Date</b> :{" "}
                {data.find((item) => item.first_name === inputValue).graduation_date}
              </p>
            </div>
          </div>
        )}
    </form>
  );
}
export default AutoComplete;
