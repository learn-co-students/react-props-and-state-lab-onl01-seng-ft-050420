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

  onChangeType = (event) => {
    let type = event.target.value
    this.setState({
      filters: {
        type: type
      }
    })
  }

  onFindPetsClick = () => {
    let baseurl
    if (this.state.filters.type === 'all' ) {
      baseurl = '/api/pets'
    } else {
      baseurl = `/api/pets?type=${this.state.filters.type}`
    }
    fetch(baseurl)
    .then(resp => resp.json())
    .then(json => this.setState({
      pets: json
    }))
  }

  onAdoptPet = (id) => {
    let allPets = [...this.state.pets]
    let pet = allPets.find(pet => pet.id === id)
    pet.isAdopted = true
    this.setState({
      pets: allPets
    })
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
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
