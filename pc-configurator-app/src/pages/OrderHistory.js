import '../App.css';
import {TopMenu} from "../Components/TopMenu/TopMenu";
import {TopBanner} from "../Components/TopBanner/TopBanner";
import {Container, Row, Col} from 'reactstrap';
import "./padding.css"
import {OrderHistory} from "../Components/OrderHistory/OrderHistory";

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
                    <OrderHistory/>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
