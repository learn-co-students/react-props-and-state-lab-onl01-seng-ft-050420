import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  changeType = (event) => {
    this.setState({filters: {type: event.target.value} })
  }

  findPetsClick = (event) => {
    let fetchString = this.state.filters.type==='all' ? "" : `?type=${this.state.filters.type}`
    fetch(`/api/pets${fetchString}`)
      .then(res => res.json())
      .then(json => this.setState({pets: json}))
  }

  adoptPet = (id) => {
    debugger
    let adopted = this.state.pets.find(e => e.id === id)
    adopted.isAdopted = true;
  }

  render() {

    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeType} onFindPetsClick={this.findPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.adoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
