import React from "react";
import "./App.css";

//* Convertir a clase
//* State (top y bottom)
//* Handle change method (event.target.name y event.target.value)
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      top: "",
      bottom: "",
      memes: [],
      plantilla:
        "https://i1.wp.com/www.sopitas.com/wp-content/uploads/2018/11/plantillas-memes-internet-47.jpg",
    };
  }

  componentDidMount() {
    //Recibe el la URL de la API como paramtetro
    fetch("https://api.imgflip.com/get_memes")
      //Las promesas van encadenadas
      .then((response) => response.json())
      //Aqui ya se puede trabajar con la API
      .then((memesJson) => {
        this.setState({ memes: memesJson.data.memes });
      })
      //Para en caso de errores
      .catch((error) => {
        console.log(error);
        console.log("Hubo un error");
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <h1 className="title">¡Genera tu meme, es gratis!</h1>
          <Meme
            top={this.state.top}
            bottom={this.state.bottom}
            plantilla={this.state.plantilla}
          />
          <MemeForm values={this.state} onChange={this.handleChange} />
          {this.state.memes.map((item) => {
            return (
              <img
                src={item.url}
                className="image-memes"
                onClick={() => {
                  this.setState({ plantilla: item.url });
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

//* Pasar los textos como props
function Meme(props) {
  return (
    <div className="meme-template">
      <img src={props.plantilla} alt="PlantillaDeMeme" className="image" />
      <h2 className="top-text">{props.top}</h2>
      <h2 className="bottom-text">{props.bottom}</h2>
    </div>
  );
}

// Pasar value por props
// On change por props
function MemeForm(props) {
  return (
    <form>
      <input
        name="top"
        value={props.values.top}
        placeholder="Texto superior"
        className="form-input"
        onChange={props.onChange}
      />
      <input
        name="bottom"
        value={props.values.bottom}
        placeholder="Texto inferior"
        className="form-input"
        onChange={props.onChange}
      />
    </form>
  );
}

export default App;
