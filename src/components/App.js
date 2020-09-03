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

  handleChangeType = () => {
    this.setState({
      filters: {
        type: e.target.value
      }
    })
  }

  handleFindPetsClick = () => {
    let url
    if (this.state.filters.type === 'all'){
      url = `/api/pets`
    } else {
      url = `/api/pets?type=${this.state.filters.type}`
    }

    fetch(url)
      .then(res => res.json())
      .then(json => this.setState({pets: json}))
  }

  handleAdoptPet = (petId) => {
    const pets = this.state.pets.map(pet => {
      return pet.id == petId ? {...pet, isAdopted: true} : pet
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
              <Filters 
              onChangeType={this.handleChangeType} 
              onFindPetsClick={this.handleFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser 
              pets={this.state.pets}
              onAdoptPet={this.handleAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
