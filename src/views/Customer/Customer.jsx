import React, { Component } from 'react'
import base from 'firebase/base'

import { Grid, Row, Col, Table, Button } from "react-bootstrap";
import Card from "components/Card/Card.jsx";

import CustomerModal from './CustomerModal'

class Customer extends Component {
  constructor () {
    super()

    this.state = {
      isLoading: true,
      isAuth: false,
      customers: [],

      modal: {
        showModal: false,
        isEdition: false,
        editKey: ''
      }
    }
  }

  close = () => {
    this.setState({
      ...this.state,
      modal: { showModal: false }
    });
  }

  open = () => {
    this.setState({
      ...this.state,
      modal: { showModal: true }
    });
  }

  componentDidMount = () => {
    base.bindToState(`customers`, {
      context: this,
      state: 'customers',
      asArray: false,
      queries: {
        orderByChild: 'name',
        limitToFirst: 10
      }
    })
  }  

  _thArray = () => {
    return (
      <tr>
        <th>Nome</th>
        <th>Celular</th>
        <th>Endereço</th>
      </tr>
    )
  }

  _tdArray = (key, { name, areaCodeMobile, mobile, address }) => {
    const _mobile = areaCodeMobile
      ? `(${areaCodeMobile}) ${mobile}`
      : mobile

    return (
      <tr key={key}>
        <td>{name}</td>
        <td>{_mobile}</td>
        <td>{address}</td>
        <td>
          <Button onClick={() => this.handleEditCustomer(key)}>
            <i className="pe-7s-pen" />
          </Button>
        </td>
      </tr>
    )
  }

  handleEditCustomer = (key) => {
    this.setState({
      ...this.state,
      modal: {
        showModal: true,
        isEdition: true,
        editKey: key
      }
    })
  }

  // handleAddCustomer = () => {
  //   this.setState({
  //     ...this.setState,
  //     modal: {
  //       showModal: true
  //     }
  //   })
  // }

  callbackNewCustomer = (newCustomer, wasEdition) => {
    const { key, name, mobile, phoneCom, phoneRes, postalCode, address, neighborhood, city, provincy, email } = newCustomer

    if (wasEdition) {
      base.update(`customers/${key}`, {
        data: { name, mobile, phoneCom, phoneRes, postalCode, address, neighborhood, city, provincy, email }
      }).then(res => {
        console.log(res)
        this.setState({
          ...this.state,
          modal: { showModal: false },
          // customers: newCustomer
        })
      })
    } else {
      base.push('customers', {
        data: { name, mobile, phoneCom, phoneRes, postalCode, address, neighborhood, city, provincy, email }
      }).then(res => {
        console.log(res)
        this.setState({
          ...this.state,
          modal: { showModal: false },
          // customers: newCustomer
        })
      })

    }


  }

  render () {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Clientes"
                category="Lista de clientes"
                ctTableFullWidth
                ctTableResponsive
                hasOnClick={true}
                handleClick={this.open}
                btnText='Novo'
                content={
                  <Table striped hover>
                    <thead>
                      {this._thArray()}
                    </thead>
                    <tbody>
                      {Object.keys(this.state.customers).map(key => this._tdArray(key, this.state.customers[key]))}
                    </tbody>
                  </Table>
                }
              />
            </Col>


          </Row>
        </Grid>



        {this.state.modal.showModal && 
          <CustomerModal 
            showModal={this.state.modal.showModal}
            isEdition={this.state.modal.isEdition}
            editKey={this.state.modal.editKey}
            onClick={this.close} 
            onHide={this.close} 
            callbackNewCustomer={this.callbackNewCustomer}
          />
        }









      </div>


    )
  }
}

export default Customer
