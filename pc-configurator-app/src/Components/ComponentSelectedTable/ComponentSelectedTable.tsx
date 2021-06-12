import React from 'react';
import './ComponentSelectedTable.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BEMHelper from 'react-bem-helper';
import {
    Case,
    Chosen,
    Cpu,
    Disk,
    Gpu,
    Keyboard,
    Monitor,
    Motherboard,
    Mouse,
    Psu,
    Ram
} from './images/index';

const classes = new BEMHelper({
    name: 'component-table',
});

interface IComponentSelectedTableItem {
    name: string,
    img: typeof Case
    chosen: boolean
}

// TODO: Dojít na to, jak toto udělat líp
interface IComponentSelectedTable {
    selectedComponents: {
        case: {
            id: number,
            name: string,
            price: number
        }
        cpu: {
            id: number,
            name: string,
            price: number
        }
        disk: {
            id: number,
            name: string,
            price: number
        }
        gpu: {
            id: number,
            name: string,
            price: number
        }
        keyboard: {
            id: number,
            name: string,
            price: number
        }
        monitor: {
            id: number,
            name: string,
            price: number
        }
        motherboard: {
            id: number,
            name: string,
            price: number
        }
        mouse: {
            id: number,
            name: string,
            price: number
        }
        psu: {
            id: number,
            name: string,
            price: number
        }
        ram:{
            id: number,
            name: string,
            price: number
        }
    }
}

const ComponentSelectedTableItem: React.FC<IComponentSelectedTableItem> = (props: IComponentSelectedTableItem) => {
    return (
        <div {...classes('item')}>
            <img {...classes('picture')} src={props.img} alt={"Computer component "}/>
            <div {...classes('text ')}>{props.name} <img {...classes('chosen')} src={Chosen} style={{display: (props.chosen)? "" : "None"}} alt={"Component is chosen"}/> </div>
        </div>
    )
}

export const ComponentSelectedTable: React.FC<IComponentSelectedTable> = (props: IComponentSelectedTable) => {
    const computerComponentItems = [
        {name: "CPU", img: Cpu, chosen: props.selectedComponents.cpu.id !== -1},
        {name: "Motherboard", img: Motherboard, chosen: props.selectedComponents.motherboard.id !== -1},
        {name: "RAM", img: Ram, chosen: props.selectedComponents.ram.id !== -1},
        {name: "Disk", img: Disk, chosen: props.selectedComponents.disk.id !== -1},
        {name: "GPU", img: Gpu, chosen: props.selectedComponents.gpu.id !== -1},
        {name: "PSU", img: Psu, chosen: props.selectedComponents.psu.id !== -1},
        {name: "Case", img: Case, chosen: props.selectedComponents.case.id !== -1},
        {name: "Monitor", img: Monitor, chosen: props.selectedComponents.monitor.id !== -1},
        {name: "Keyboard", img: Keyboard, chosen: props.selectedComponents.keyboard.id !== -1},
        {name: "Mouse", img: Mouse, chosen: props.selectedComponents.mouse.id !== -1},
    ];

    const computerComponentItemsComponent = computerComponentItems.map(item => <ComponentSelectedTableItem name={item.name} img={item.img} chosen={item.chosen} />);

    return (
        <div {...classes()}>
            {computerComponentItemsComponent}
        </div>
    )
};