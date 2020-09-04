import React from "react";

import Pet from "./Pet";

class PetBrowser extends React.Component {
  render() {
    return (
      <div className="ui cards">
        {this.props.pets.map((x) => (
          <Pet onAdoptPet={this.props.onAdoptPet} pet={x} />
        ))}
      </div>
    );
  }
}

export default PetBrowser;
