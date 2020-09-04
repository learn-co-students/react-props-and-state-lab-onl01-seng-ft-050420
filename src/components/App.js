import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all",
      },
    };
  }

  onChangeType = (value) => {
    this.setState({
      filters: { type: value },
    });
  };

  onFindPetsClick = () => {
    if (this.state.filters.type === "all") {
      fetch("/api/pets")
        .then((res) => res.json())
        .then((json) => {
          this.setState({ pets: json });
        });
    } else {
      fetch(`/api/pets?type=${this.state.filters.type}`)
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            pets: json,
          });
        });
    }
  };

  onAdoptPet = (id) => {
    console.log(this.state.pets.filter((x) => x.id === id)[0]);
    let pet = this.state.pets.filter((x) => x.id === id)[0];
    let index = this.state.pets.indexOf(pet);
    pet.isAdopted = true;

    this.setState((previousState) => {
      previousState.pets.splice(index, 1, pet);
      return {
        pets: [...previousState.pets],
      };
    });
  };

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
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
