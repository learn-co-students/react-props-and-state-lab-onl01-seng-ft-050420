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
      }
    }
  }

  onChangeType = (type) => {
    this.setState({
      filters:{
        type: type
      }
    });
  }

  onFindPetsClick = () => {
    let url 
    if(this.state.filters.type === 'all'){
      url = '/api/pets'
    } else {
      url = `/api/pets?type=${this.state.filters.type}`
    }
    fetch(url)
      .then(resp => resp.json())
      .then(json => this.setState({pets: json}))
  }

  onAdoptPet = (petId) => {
    const foundPet = this.state.pets.find(pet => pet.id === petId)
    foundPet.isAdopted = true
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
              <PetBrowser onFindPetsClick={this.onFindPetsClick} onAdoptPet={this.onAdoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
