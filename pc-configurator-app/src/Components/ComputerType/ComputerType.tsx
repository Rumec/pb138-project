import React from 'react';
import './ComputerType.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ComputerImage from './images/computer.svg';
import BEMHelper from 'react-bem-helper';
import Button from 'react-bootstrap/Button';
import {useHistory} from "react-router-dom";

interface IComputerTypeProps {
    header: string,
    name: string,
    cpuName: string,
    gpuName: string,
    ramName: string,
    diskName: string,
    price: number
}

const classes = new BEMHelper({
    name: 'computer-type',
});

// TODO: Změnit obrázek
export const ComputerType: React.FC<IComputerTypeProps> = (props: IComputerTypeProps) => {
    let history = useHistory();
    return (
        <div {...classes()}>
            <div {...classes('header')}>{props.header}</div>
            <img {...classes('image')} src={ComputerImage} alt={'Computer'}/>
            <div {...classes('name')}>{props.name}</div>
            <div>{props.cpuName}</div>
            <div>{props.gpuName}</div>
            <div>{props.ramName}</div>
            <div>{props.diskName}</div>
            <div {...classes('price-line')}>
                <div {...classes('price')}>{props.price} €</div>
                <Button
                    onClick={() => {
                        console.log()
                        history.push('/ComponentSelector');
                    }}
                >Select</Button>
            </div>

        </div>
    )
};

