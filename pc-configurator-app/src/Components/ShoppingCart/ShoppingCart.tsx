import React from 'react';
import './ShoppingCart.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BEMHelper from 'react-bem-helper';
import {Table, Badge, Button, Row, Col} from 'reactstrap';
import {useRecoilState} from "recoil";
import {selectedPcPartsState, userState} from "../../store/atoms";

const classes = new BEMHelper({
    name: 'shopping-cart',
});

const PcPart = (props: any) => {
    return (
        <Col>
            <Row>{props.type}: </Row>
            <Row>{props.manufacturer} {props.name}</Row>
            <Row>{props.mainParameter}</Row>
            <Row>{props.secondaryParameter}</Row>
            <Row>{props.additionalParameter}</Row>
            <Row>{props.price} €</Row>
        </Col>
    )
}

export const ShoppingCart: React.FC = () => {
    const [selectedPcParts] = useRecoilState(selectedPcPartsState);
    const [userInformation] = useRecoilState(userState);

    const orderComputer = () => {
        const loginData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-User': userInformation.data.id.toString()
            },
            body: JSON.stringify(selectedPcParts)
        }

        fetch('http://localhost:5000/api/orders', loginData)
            .then(async response => {
                if (response.status !== 200) {
                    window.alert("Unsuccessful order!");
                    return;
                }
            })
            .catch(err => {
                window.alert('The was an error!\n' + err);
            });
    }

    return (
        <div {...classes()}>
            <PcPart
                type={'CPU'}
                manufacturer={selectedPcParts.cpu.manufacturer}
                name={selectedPcParts.cpu.name}
                mainParameter={selectedPcParts.cpu.frequency + ' GHz'}
                secondaryParameter={selectedPcParts.cpu.core_count + ' cores'}
                additionalParameter={selectedPcParts.cpu.cache + ' MB cache'}
                price={selectedPcParts.cpu.price}
            />

            <PcPart
                type={'Motherboard'}
                manufacturer={selectedPcParts.motherboard.manufacturer}
                name={selectedPcParts.motherboard.name}
                mainParameter={'Socket: ' + selectedPcParts.motherboard.interface}
                price={selectedPcParts.motherboard.price}
            />

            <PcPart
                type={'RAM'}
                manufacturer={selectedPcParts.ram.manufacturer}
                name={selectedPcParts.ram.name}
                mainParameter={selectedPcParts.ram.frequency + ' MHz'}
                secondaryParameter={'Capacty: ' + selectedPcParts.ram.capacity + ' GB'}
                additionalParameter={'Type: ' + selectedPcParts.ram.type}
                price={selectedPcParts.ram.price}
            />

            <PcPart
                type={'Disk'}
                manufacturer={selectedPcParts.disk.manufacturer}
                name={selectedPcParts.disk.name}
                mainParameter={'Capacty: ' + selectedPcParts.disk.capacity + ' GB'}
                secondaryParameter={'Interface: ' + selectedPcParts.disk.interface}
                price={selectedPcParts.disk.price}
            />

            <PcPart
                type={'Graphics card'}
                manufacturer={selectedPcParts.gpu.manufacturer}
                name={selectedPcParts.gpu.name}
                mainParameter={'GPU frequency: ' + selectedPcParts.gpu.core_freq + 'GHz'}
                secondaryParameter={'Memory: ' + selectedPcParts.gpu.mem_capacity + ' GB'}
                additionalParameter={'Memory frequency: ' + selectedPcParts.gpu.mem_freq + 'MHz'}
                price={selectedPcParts.gpu.price}
            />

            <PcPart
                type={'Power supply'}
                manufacturer={selectedPcParts.psu.manufacturer}
                name={selectedPcParts.psu.name}
                mainParameter={'Power: ' + selectedPcParts.psu.power + ' W'}
                price={selectedPcParts.psu.price}
            />

            <PcPart
                type={'Case'}
                manufacturer={selectedPcParts.case.manufacturer}
                name={selectedPcParts.case.name}
                mainParameter={'Format: ' + selectedPcParts.case.format}
                price={selectedPcParts.case.price}
            />

            {(selectedPcParts.monitor.id !== -1) ?
                <PcPart
                    type={'Monitor'}
                    manufacturer={selectedPcParts.monitor.manufacturer}
                    name={selectedPcParts.monitor.name}
                    mainParameter={'Interface: ' + selectedPcParts.monitor.interface}
                    price={selectedPcParts.monitor.price}
                /> : ""}

            {(selectedPcParts.keyboard.id !== -1) ?
                <PcPart
                    type={'Keyboard'}
                    manufacturer={selectedPcParts.keyboard.manufacturer}
                    name={selectedPcParts.keyboard.name}
                    mainParameter={'Interface: ' + selectedPcParts.keyboard.interface}
                    price={selectedPcParts.keyboard.price}
                /> : ""}

            {(selectedPcParts.mouse.id !== -1) ?
                <PcPart
                    type={'Mouse'}
                    manufacturer={selectedPcParts.mouse.manufacturer}
                    name={selectedPcParts.mouse.name}
                    mainParameter={'Interface: ' + selectedPcParts.mouse.interface}
                    price={selectedPcParts.mouse.price}
                /> : ""}

            <h3 id="total">Total price: <Badge
                color="primary">{Object.entries(selectedPcParts).map(([name, values]) => {
                return values.price;
            }).reduce((cumulate, val) => cumulate + val, 0)} €</Badge></h3>

                <Button
                    onClick={orderComputer}
                >
                    Order
                </Button>

        </div>
    )
};
