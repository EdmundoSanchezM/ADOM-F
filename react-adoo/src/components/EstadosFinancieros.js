import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Content from 'react-bulma-components/lib/components/content';
import Heading from 'react-bulma-components/lib/components/heading';
import Button from 'react-bulma-components/lib/components/button';
import Section from 'react-bulma-components/lib/components/section';
import axios from 'axios';
import PDFObject from 'pdfobject';
import Box from 'react-bulma-components/lib/components/box';
class Cuentas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Nombre: null
        };
    }

    componentDidMount() {
        let JSON = this.props.location.state;
        let JSONF = JSON.JSONF;
        console.log(JSONF)
        /* axios.post('/GetTodoCuentas', JSONF)
             .then(function (response) {
             })
             .catch(function (error) {
             });*/
        axios('/BalanzadeComprobacionPDF', {
            method: 'GET',
            responseType: 'blob' //Force to receive data in a Blob Format
        })
            .then(response => {
                //Create a Blob from the PDF Stream
                const file = new Blob(
                    [response.data],
                    { type: 'application/pdf' });
                //Build a URL from the file
                const fileURL = URL.createObjectURL(file);
                //Open the URL on new Window
                window.open(fileURL);
            })
            .catch(error => {
                console.log(error);
            });
        const script = document.createElement("script");
        script.src = "https://www.riddle.com/files/js/embed.js";
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdfobject/2.1.1/pdfobject.js"
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdfobject/2.1.1/pdfobject.min.js"
        script.async = true;
        document.body.appendChild(script);
        var options = {
            margin: "0 auto",
            maxWidth: "100%",
            width: "100%",
            height: "500px",
            border: "1px solid #cfcfcf"
        };
        this.setState({
            Nombre: "Balanza de comprobación"
        });
        PDFObject.embed("http://127.0.0.1:5000/BalanzadeComprobacionPDF", `#IDCOINTEINER`, options);
    }
    BalanzaComprobacion = () => {
        this.setState({
            Nombre: "Balanza de comprobación"
        });
        var options = {
            margin: "0 auto",
            maxWidth: "100%",
            width: "100%",
            height: "500px",
            border: "1px solid #cfcfcf"
        };
        PDFObject.embed("http://127.0.0.1:5000/BalanzadeComprobacionPDF", `#IDCOINTEINER`, options);
    }
    EstadoFinanciero = () => {
        var options = {
            margin: "0 auto",
            maxWidth: "100%",
            width: "100%",
            height: "500px",
            border: "1px solid #cfcfcf"
        };
        PDFObject.embed("http://127.0.0.1:5000/EstadoFinancieroPDF", `#IDCOINTEINER`, options);
        this.setState({
            Nombre: "Balance general"
        });
    }
    EstadoResultado = () => {
        this.setState({ Nombre: "Estado de resultados" })
        var options = {
            margin: "0 auto",
            maxWidth: "100%",
            width: "100%",
            height: "500px",
            border: "1px solid #cfcfcf"
        };
        PDFObject.embed("http://127.0.0.1:5000/EstadosdeResultadosPDF", `#IDCOINTEINER`, options);
    }
    render() {
        const iframeStyle = {
            margin: "0 auto",
            maxWidth: "100%",
            width: "100%",
            height: "500px",
            border: "1px solid #cfcfcf"
        };
        return (
            <Section>
                <div className="container has-text-centered">
                    <Heading>
                        Estados Financieros
                </Heading>
                    <Heading subtitle size={5}>
                        {this.state.Nombre}
                    </Heading>
                    <Content>
                        <div style={iframeStyle} id="IDCOINTEINER" />
                        <Box>
                            <Button.Group>
                                <Button renderAs="button" color="success" onClick={this.BalanzaComprobacion}>
                                    Balanza de comprobación
                                </Button>
                                < Button renderAs="button" color="success" onClick={this.EstadoResultado}>
                                    Estados de resultados
                                </Button>
                                < Button renderAs="button" color="success" onClick={this.EstadoFinanciero}>
                                    Balance general
                                </Button>
                            </Button.Group>
                        </Box>
                    </Content>
                    <Content>
                        <p align="left">
                            <Link to={{
                                pathname: '/cuentas',
                                state: {
                                    ValorCuenta: -1
                                }
                            }}>
                                <Button>&#60;&#60;Regresar</Button>
                            </Link>
                        </p>
                    </Content>
                </div >
            </Section >
        )
    }
}


export default Cuentas;
