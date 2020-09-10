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
  onChangeType=(value)=>{
    this.setState({
     filters: { 
       type: value
     }
    })
  }

  onFindPetsClick=()=>{
    if(this.state.filters.type === "all"){
      fetch('/api/pets')
      .then(resp => resp.json())
      .then(json =>{
      //debugger
      this.setState({
        pets: json
      })
    })
    //debugger
    }
    else if (this.state.filters.type === "cat"){
        fetch('/api/pets?type=cat')
        .then(resp => resp.json())
        .then(json =>{
      //debugger
        this.setState({
          pets: json
        })
      })
    }else if(this.state.filters.type === "dog"){
      fetch("/api/pets?type=dog")
      .then(resp => resp.json())
        .then(json =>{
      //debugger
        this.setState({
          pets: json
        })
      })
    }else if (this.state.filters.type === "micropig"){
      fetch("/api/pets?type=micropig")
      .then(resp => resp.json())
        .then(json =>{
      //debugger
        this.setState({
          pets: json
        })
      })
    }
  }
       
  onAdoptPet=(id)=>{
    //debugger
    //let pet = this.state.pets.find(pet=> pet.id === id)
    this.setState((previousState)=>{
      let newState = previousState.pets.map( pet=>{
          if(pet.id===id){
            return {...pet, isAdopted: true}
          } else{
            return pet
          }
      }
      )
      return {pets: newState }
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
              <Filters onChangeType = {this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
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
