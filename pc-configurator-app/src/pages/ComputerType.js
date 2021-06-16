import '../App.css';
import {TopMenu} from "../Components/TopMenu/TopMenu";
import {TopBanner} from "../Components/TopBanner/TopBanner";
import {ComputerTypeChooser} from "../Components/ComputerTypeChooser/ComputerTypeChooser";
import {Container, Row, Col} from 'reactstrap';
import {RecoilRoot} from "recoil";
import {ShoppingCart} from "../Components/ShoppingCart/ShoppingCart";

function App() {
    return (
        <Container fluid={true}>
            <RecoilRoot>

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
                {/*
                <Row>
                    <Col>
                        <ComputerTypeChooser/>
                    </Col>
                </Row>
                */}
                <ShoppingCart/>

                

            </RecoilRoot>
        </Container>
    );
}

export default App;
