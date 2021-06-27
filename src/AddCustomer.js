import React, { Component } from 'react'
import { Form, FormGroup, Label, Input } from 'reactstrap';
import 'alertifyjs/build/css/alertify.css';
import alertify from "alertifyjs"
import 'bootstrap/dist/css/bootstrap.min.css';

export default class AddCustomer extends Component {

    state = {
        ad: '',
        soyad: '',
        dt: '',
        ud: ''
    };


    onChangeHandler = (event) => {
        let name = event.target.name;
        let value = event.target.value;

        this.setState({ [name]: value })

    }

    onSubmitHandler = (event) => {
        event.preventDefault();

        fetch("http://localhost:3000/musteriler",
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    "Ad": this.state.ad,
                    "Soyad": this.state.soyad,
                    "DogumT": this.state.dt,
                    "Durum": this.state.ud
                })
            })
            .then(function (res) { console.log(res) })
            .catch(function (res) { console.log(res) })

            alertify.success("Kayıtlar Başarıyla eklendi")


    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmitHandler}>

                    <FormGroup>
                        <Label>Ad : </Label>
                        <Input onChange={this.onChangeHandler} type="text" name="ad" id="ad" />

                        <Label>Soyad : </Label>
                        <Input onChange={this.onChangeHandler} type="text" name="soyad" id="soyad" />

                        <Label>Doğum Tarihi : </Label>
                        <Input onChange={this.onChangeHandler} type="text" name="dt" id="dt" />

                        <Label>Üyelik Durumu : </Label>
                        <Input onChange={this.onChangeHandler} type="select" name="ud" id="ud">
                            <option>Seçiniz</option>
                            <option >Aktif</option>
                            <option >Pasif</option>
                        </Input>
                        <br/>
                        <Input type="submit" value="Kaydet" />
                    </FormGroup>

                </Form>

            </div>
        )
    }
}