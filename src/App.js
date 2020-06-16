import React, { Fragment, Component } from "react";
import "./skeleton/normalize.css";
import "./skeleton/skeleton.css";
import Formulario from "./componentes/Formulario";
import Resultado from "./componentes/Resultado";
import Mensaje from "./componentes/Mensaje";
import Spinner from "./componentes/Spinner";
import { calcularTotal } from "./helpers";

class App extends Component {
  state = {
    total: "",
    cantidad: "",
    plazo: "",
    cargando: false,
  };

  datosPrestamo = (cantidad, plazo) => {
    const total = calcularTotal(cantidad, plazo);
    this.setState(
      {
        cargando: true,
      },
      () => {
        setTimeout(() => {
          this.setState({
            total,
            cantidad,
            plazo,
            cargando: false,
          });
        }, 3000);
      }
    );
  };
  render() {
    const { total, cantidad, plazo, cargando } = this.state;
    let componente;
    if (total === "" && !cargando) {
      componente = <Mensaje />;
    } else if (cargando) {
      componente = <Spinner />;
    } else {
      componente = (
        <Resultado total={total} cantidad={cantidad} plazo={plazo} />
      );
    }
    return (
      <Fragment>
        <h1>Cotizador de Prestamos</h1>
        <div className="container">
          <Formulario datosPrestamo={this.datosPrestamo} />
          <div className="mensajes">{componente}</div>
        </div>
      </Fragment>
    );
  }
}

export default App;
