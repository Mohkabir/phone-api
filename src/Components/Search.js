import React from 'react'

const Search = (props) => {

  const handleChange = (key, e) => {
    props.handleChange(key, e.target.value);
  }
  return (
    <div className="search">
      <input 
      type="text" 
      placeholder="search phone"
      onChange={(value) => handleChange("search", value)}
      value={props.search.property}
      className="input"
      />

      <div className="minmax_input">
      <input 
      type="number" 
      placeholder="min price"
      onChange={(value) => handleChange("min", value)}
      value={props.min}
      />

      <input 
      type="number" 
      placeholder="max price"
      onChange={(value) => handleChange("max", value)}
      value={props.max}
      />
      <button onClick={props.handleMaxMinSubmit}>Search</button>
      </div>
    </div>
  )
}

export default Search
