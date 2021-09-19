import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row} from 'reactstrap'
import './Home.css'

function Home() {
    return (
        <div className="home">
            <Container >
                <Row className="text-center p-5">
                    <h1>Welcome to FlyBuy </h1>
                    <h4>Click Here to Shop</h4>
                    <h2 ><Link to='/shop'><i className="fas fa-store-alt icon"></i></Link></h2>
                </Row>
            </Container>
        </div>
    )
}

export default Home
