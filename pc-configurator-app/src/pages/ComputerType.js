import '../App.css';
import {TopMenu} from "../Components/TopMenu/TopMenu";
import {TopBanner} from "../Components/TopBanner/TopBanner";
import {ComputerTypeChooser} from "../Components/ComputerTypeChooser/ComputerTypeChooser";
import {Container, Row, Col} from 'reactstrap';
import {RecoilRoot} from "recoil";
import {ShoppingCart} from "../Components/ShoppingCart/ShoppingCart";
import "./padding.css"

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
                    <ComputerTypeChooser/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
