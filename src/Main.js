import React, { Component } from "react";
import { Container, Row, Col, Nav, Button } from 'reactstrap';
import ShowCustomer from "./ShowCustomer";
import AddCustomer from "./AddCustomer";


export default class Main extends Component {

    state={
        btn:true,
    }
    componentDidMount(){
        this.setState({btn:true});
    }

    render() {
        return (
            <div>

                <Nav horizontal style={{ backgroundColor: "#dbd0e1" }}>

                    <Button color="info" onClick={()=>this.setState({btn:false})}  >Müşteri Ekle</Button>
                    <Button color="success" onClick={()=>this.setState({btn:true})}  >Müşterileri Göster</Button>

                </Nav>

                <Container>
                    <Row>
                        <Col></Col>
                        <Col>
                            {this.state.btn?<ShowCustomer/>:<AddCustomer/>}
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>

            </div>
        )
    }

}