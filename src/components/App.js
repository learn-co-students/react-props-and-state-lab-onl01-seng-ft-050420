import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      },
      isAdopted: false 
    }
  }

  handleFilterChange = (event) => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: event.target.value 
      }
    })
  }

  fetchPets = () => {
    let searchedPets = ''

    if(this.state.filters.type === 'all'){
      searchedPets = fetch('/api/pets')
    } else {
      searchedPets = fetch(`/api/pets?type=${this.state.filters.type}`)
    }

    searchedPets.then(resp => resp.json())
    .then(pets => {
      this.setState({
        pets: pets 
      })
    })
  }

  handleAdopt = petId => {
    const pet = this.state.pets.map(pet => {
      return pet.id === petId ? {...pet, isAdopted: true } : pet
    })

    this.setState({
      pets: pet
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
              <Filters onChangeType={this.handleFilterChange} onFindPetsClick={this.fetchPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.handleAdopt} pets={this.state.pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
