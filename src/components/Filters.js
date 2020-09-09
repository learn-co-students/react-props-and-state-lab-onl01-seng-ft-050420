import React from 'react'

class Filters extends React.Component {
  handleTypeChange = (e) => {
    const type = e.target.value
    this.props.onChangeType(type)
  }

  render() {
    return (
      <div className="ui form">
        <h3>Animal type</h3>
        <div className="field">
          <select name="type" onChange={this.handleTypeChange} id="type">
            <option value="all">All</option>
            <option value="cat">Cats</option>
            <option value="dog">Dogs</option>
            <option value="micropig">Micropigs</option>
          </select>
        </div>

        <div className="field">
          <button className="ui secondary button" onClick={this.props.onFindPetsClick}>Find pets</button>
        </div>
      </div>
    )
  }
}

export default Filters
