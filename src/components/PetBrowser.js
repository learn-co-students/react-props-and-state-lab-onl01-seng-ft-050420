import React from 'react'

import Pet from './Pet'

class PetBrowser extends React.Component {


  render() {
    let thisPet = this
    return <div className="ui cards">
      {this.props.pets.map(p =>
      <Pet onAdoptPet={thisPet.props.onAdoptPet} pet={p} />
      )}

    </div>
  }
}

export default PetBrowser
