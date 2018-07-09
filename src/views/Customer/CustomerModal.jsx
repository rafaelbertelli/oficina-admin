import React, { Component } from 'react'
import base from '../../firebase/base'

import { Modal } from "react-bootstrap";
import { Grid, Row, Col } from "react-bootstrap";
import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

class CustomerModal extends Component {
  constructor (props) {
    super(props)

    this.state = {
      customer: {
        key: '',
        name: '',
        mobile: '',
        phoneCom: '',
        phoneRes: '',
        postalCode: '',
        address: '',
        neighborhood: '',
        city: '',
        provincy: '',
        email: '',
      }
    }
  }

  handleOnChange = (e) => {
    this.setState({ customer: { ...this.state.customer, [e.target.name] : e.target.value} })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const wasEdition = this.props.isEdition
    const newCustomer = this.state.customer
    this.props.callbackNewCustomer(newCustomer, wasEdition)
  }

  componentDidMount () {
    if (this.props.isEdition) {
      base.fetch(`customers/${this.props.editKey}`, {
        context: this,
        asArray: false
      }).then(customer => {
        const { name, mobile, phoneCom, phoneRes, postalCode, address, neighborhood, city, provincy, email } = customer
        this.setState({
          ...this.state,
          customer: {
            key: this.props.editKey,
            name,
            mobile,
            phoneCom,
            phoneRes,
            postalCode,
            address,
            neighborhood,
            city,
            provincy,
            email,
          }
        })

      }).catch(err => {
        console.log(err)
      })
    }
  }

  render () {
    return (
      <Modal show={this.props.showModal} onHide={this.props.onHide} bsSize="large">
        <Modal.Header closeButton>
          <Modal.Title>Cadastro de cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>



          <div className="content">
            <Grid fluid>
              <Row>
                <Col md={12}>
                  <Card
                    ctTableResponsive
                    content={
                      <form onSubmit={this.handleSubmit} method='post'>
                        <FormInputs
                          ncols={["col-md-6", "col-md-2", "col-md-2", "col-md-2"]}
                          proprieties={[
                            {
                              label: "Nome",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Nome",
                              name: 'name',
                              value: this.state.customer.name,
                              onChange: this.handleOnChange
                            },
                            {
                              label: "Celular",
                              type: "tel",
                              bsClass: "form-control",
                              placeholder: "Celular",
                              name: 'mobile',
                              value: this.state.customer.mobile,
                              onChange: this.handleOnChange
                            },
                            {
                              label: "Tel.Comercial",
                              type: "tel",
                              bsClass: "form-control",
                              placeholder: "Comercial",
                              name: 'phoneCom',
                              value: this.state.customer.phoneCom,
                              onChange: this.handleOnChange
                            },
                            {
                              label: "Tel.Residencial",
                              type: "tel",
                              bsClass: "form-control",
                              placeholder: "Residencial",
                              name: 'phoneRes',
                              value: this.state.customer.phoneRes,
                              onChange: this.handleOnChange
                            }
                          ]}
                        />
                        <FormInputs
                          ncols={["col-md-2", "col-md-10"]}
                          proprieties={[
                            {
                              label: "CEP",
                              type: "number",
                              bsClass: "form-control",
                              placeholder: "CEP",
                              pattern: "^\s*?\d{5}(?:[-\s]\d{4})?\s*?$",
                              name: 'postalCode',
                              value: this.state.customer.postalCode,
                              onChange: this.handleOnChange
                            },
                            {
                              label: "Endereço",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Endereço",
                              name: 'address',
                              value: this.state.customer.address,
                              onChange: this.handleOnChange
                            }
                          ]}
                        />
                        <FormInputs
                          ncols={["col-md-4", "col-md-4", "col-md-4"]}
                          proprieties={[
                            {
                              label: "Bairro",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Bairro",
                              name: 'neighborhood',
                              value: this.state.customer.neighborhood,
                              onChange: this.handleOnChange
                            },
                            {
                              label: "Cidade",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Cidade",
                              name: 'city',
                              value: this.state.customer.city,
                              onChange: this.handleOnChange
                            },
                            {
                              label: "Estado",
                              type: "text",
                              bsClass: "form-control",
                              placeholder: "Estado",
                              name: 'provincy',
                              value: this.state.customer.provincy,
                              onChange: this.handleOnChange
                            },
                          ]}
                        />
                        <FormInputs
                          ncols={["col-md-12"]}
                          proprieties={[
                            {
                              label: "Email",
                              type: "email",
                              bsClass: "form-control",
                              placeholder: "Email",
                              name: 'email',
                              value: this.state.customer.email,
                              onChange: this.handleOnChange
                            }
                          ]}
                        />

                        <div className='clear-fix'></div>
                        <Button onClick={this.props.onClick}>Close</Button>
                        <Button bsStyle="info" pullRight fill type="submit">
                          Update Profile
                        </Button>
                      </form>
                    }
                  />
                </Col>
              </Row>
            </Grid>
          </div>

        </Modal.Body>
      </Modal>
    )
  }
}

export default CustomerModal
