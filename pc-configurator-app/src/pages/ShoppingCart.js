import '../App.css';
import {TopMenu} from "../Components/TopMenu/TopMenu";
import {TopBanner} from "../Components/TopBanner/TopBanner";
import {Container, Row, Col} from 'reactstrap';
import {RecoilRoot} from "recoil";
import {UserRegistration} from "../Components/UserRegistration/UserRegistration";
import {ShoppingCart} from "../Components/ShoppingCart/ShoppingCart";

function App() {
    return (
        <Container fluid={true}>
            <Row>
                <Col>
                    <TopMenu/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <TopBanner header={"PC configurator"}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ShoppingCart/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
