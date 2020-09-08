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

  onChangeType = (newType) => {
    this.setState({
      filters: {
        type:newType
      }
    })
  }

  onFindPetsClick = (e) => {
    let query = ''
    if (this.state.filters.type !== 'all') {
      query = `?type=${this.state.filters.type}`
    }
    fetch('/api/pets'.concat(query))
      .then(resp => resp.json())
      .then(pets => {
        console.log(pets)
        return this.setState({pets: pets})
      })
  }

  onAdoptPet = (id) => {
    let pets = this.state.pets.map( pet => {
      if (pet.id === id) {
        pet.isAdopted = true;
        return pet
      } 
        return pet
    })
    this.setState({pets: pets})
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
              <PetBrowser onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
