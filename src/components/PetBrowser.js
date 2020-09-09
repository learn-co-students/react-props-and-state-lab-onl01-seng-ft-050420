import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {

  showPets(){
    let allPets = this.props.arrPets;
    //debugger
    return allPets.map(pet=>{
      return <Pet id={pet.id} age={pet.age} gender={pet.gender} name={pet.name} type={pet.type} weight={pet.weight} isAdopted={pet.isAdopted} onAdoptPet={this.props.onAdoptPet}/>
    })
  }

  render() {
  return <div className="ui cards">{this.showPets()}</div>
  }
}

export default PetBrowser
