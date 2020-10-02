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
  // ✓ should change filter type
  handleChangeType = e => {
    this.setState({
      filters: {
        type: e.target.value
      }
    })
  }
  // ✓ should fetch all pets by default
  // ✓ should fetch pet types using the type parameter based on the filter
  handleFindPetsClick = () => {
    let url;
    if (this.state.filters.type === 'all') {
      url = `/api/pets`;
    } else {
      url = `/api/pets?type=${this.state.filters.type}`;
    }

    fetch(url)
      .then(resp => resp.json())
      .then(json => this.setState({pets: json}))
  }
  // ✓ should set a pet's adopted status to true
  handleAdoptPet = id => {
    this.setState(previousState => {
      return {
        pets: previousState.pets.map(
          pet => (pet.id === id ? {...pet, isAdopted: true} : pet)
        )
      }
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
              <Filters 
                onChangeType={this.handleChangeType}
                onFindPetsClick={this.handleFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser 
                pets={this.state.pets}
                onAdoptPet={this.handleAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App