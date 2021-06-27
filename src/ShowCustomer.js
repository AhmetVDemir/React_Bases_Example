import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap';
import alertify from "alertifyjs"
import 'alertifyjs/build/css/alertify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Badge, Button, Container, Row, Col, Form, FormGroup, Label, Input, ButtonGroup } from 'reactstrap';

export default class ShowCustomer extends Component {

    state = {
        person: [],
        guncelle: false,
        ad: '',
        soyad: '',
        dt: '',
        ud: '',
        uid: null,
    };

    componentDidMount() {

        this.setState({ guncelle: false });
        this.getUser();
    }


    getUser = () => {
        fetch("http://localhost:3000/musteriler")
            .then(response => response.json())
            .then(data => this.setState({ person: data }))
    }

    deleteUser = (id) => {
        fetch("http://localhost:3000/musteriler/" + id, {
            method: "DELETE"
        }).then(res => res.json());

        this.getUser();
        this.showUser();

        alertify.alert("Kişi Başarıyla silindi")

    }

    sendUpdate = (id) => {
        this.setState({ guncelle: true })
        this.setState({ uid: id });
    }



    showUser = () => {

        return (
            <div>

                {this.state.person.map(kisi => (
                    <ListGroup key={kisi.id}>
                        <ListGroup.Item>

                            {kisi.Ad} {kisi.Soyad} {kisi.DogumT} :  {kisi.Durum === "Aktif" ? <Badge color="success">{kisi.Durum}</Badge> : <Badge color="danger">{kisi.Durum}</Badge>}
                            <br />
                            <Button color="danger" onClick={() => this.deleteUser(kisi.id)}>Sil</Button>
                            <Button color="warning" onClick={() => this.sendUpdate(kisi.id)}>Güncelle</Button>


                        </ListGroup.Item>


                    </ListGroup>
                ))}

            </div>
        )




    }

    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        this.setState({ [name]: value })

    }

    onSubmitHandler = (event) => {
        event.preventDefault();


        fetch("http://localhost:3000/musteriler/" + this.state.uid,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "PATCH",
                body: JSON.stringify({
                    "Ad": this.state.ad,
                    "Soyad": this.state.soyad,
                    "DogumT": this.state.dt,
                    "Durum": this.state.ud
                })
            })
            .then(function (res) { console.log(res) })
            .catch(function (res) { console.log(res) })

        alertify.warning("Kayıtlar Başarıyla güncellendi")
        this.setState({ guncelle: false });

    }

    updateUser = () => {

        return (
            <div>
                <Form onSubmit={this.onSubmitHandler}>
                    <FormGroup>
                        <Label>İsim</Label>
                        <Input onChange={this.onChangeHandler} type="text" name="ad" id="ad" />
                        <Label>Soy İsim</Label>
                        <Input onChange={this.onChangeHandler} type="text" name="soyad" id="soyad" />
                        <Label>Doğum Tarihi</Label>
                        <Input onChange={this.onChangeHandler} type="text" name="dt" id="dt" />
                        <Label>Üyelik Durumu</Label>
                        <Input onChange={this.onChangeHandler} type="select" name="ud" id="ud">
                            <option>Seçiniz</option>
                            <option >Aktif</option>
                            <option >Pasif</option>
                        </Input>
                    </FormGroup>
                    <ButtonGroup>
                        <Button color="warning" onClick={() => this.setState({ guncelle: false })} >İptal</Button>
                        <Input type="submit" className={"btn btn-success"} value="Güncelle" />
                    </ButtonGroup>
                </Form>

            </div>
        )

    }
    render() {
        return (
            <div>

                <Container>
                    <Row>

                        <Col>
                            {this.state.guncelle ? this.updateUser() : this.showUser()}
                        </Col>

                    </Row>
                </Container>

            </div>
        )
    }



}
