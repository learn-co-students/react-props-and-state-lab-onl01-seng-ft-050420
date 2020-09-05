import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'
import Pet from './Pet'

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
  componentDidMount(){
    fetch('/api/pets')
    .then(resp => resp.json())
    .then(json => this.setState({
      pets: this.state.pets.push(json)
    }))
  }


  onChangeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  onFindPetsClick = () => {
    if (this.state.filters.type === 'all'){
      fetch('/api/pets')
      .then(resp => resp.json())
      .then(json => this.setState({
        pets: this.state.pets.push(json)
      }))
    } else if (this.state.filters.type === 'cat'){
      fetch('/api/pets?type=cat')
      .then(resp => resp.json())
      .then(json => this.setState({
        pets: this.state.pets.push(json)
      }))
    } else if (this.state.filters.type === 'dog'){
      fetch('/api/pets?type=dog')
      .then(resp => resp.json())
      .then(json => this.setState({
        pets: this.state.pets.push(json)
      }))
    } else if (this.state.filters.type === 'micropig'){
      fetch('/api/pets?type=micropig')
      .then(resp => resp.json())
      .then(json => this.setState({
        pets: this.state.pets.push(json)
      }))
    } 
  }

  onAdoptPet = (id) => {
    let pet = this.state.pets.find(pet=> pet.id == id)
    pet.isAdopted = true;
    pet.save
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
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
