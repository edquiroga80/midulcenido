import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return (
    <Nav className='justify-content-center mb-4'>
        <Nav.Item>
            { step1 ? (
                <LinkContainer to='/login'>
                    <Nav.Link>Iniciar Sesión</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Iniciar Sesión</Nav.Link>
            ) }
        </Nav.Item>

        <Nav.Item>
            { step2 ? (
                <LinkContainer to='/shipping'>
                    <Nav.Link>Envíos</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Envíos</Nav.Link>
            ) }
        </Nav.Item>

        <Nav.Item>
            { step3 ? (
                <LinkContainer to='/payment'>
                    <Nav.Link>Pagos</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Pagos</Nav.Link>
            ) }
        </Nav.Item>

        <Nav.Item>
            { step1 ? (
                <LinkContainer to='/placeorder'>
                    <Nav.Link>Realizar pedido</Nav.Link>
                </LinkContainer>
            ) : (
                <Nav.Link disabled>Realizar pedido</Nav.Link>
            ) }
        </Nav.Item>
    </Nav>
  )
}
export default CheckoutSteps