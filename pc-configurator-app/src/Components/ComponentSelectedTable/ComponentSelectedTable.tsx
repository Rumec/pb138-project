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
import {useRecoilState} from "recoil";
import {selectedPcPartsState} from "../../store/atoms";

const classes = new BEMHelper({
    name: 'component-table',
});

interface IComponentSelectedTableItem {
    name: string,
    img: typeof Case
    chosen: boolean
}

const ComponentSelectedTableItem: React.FC<IComponentSelectedTableItem> = (props: IComponentSelectedTableItem) => {
    return (
        <div {...classes('item')}>
            <img {...classes('picture')} src={props.img} alt={"Computer component "}/>
            <div {...classes('text ')}>{props.name} <img {...classes('chosen')} src={Chosen} style={{display: (props.chosen)? "" : "None"}} alt={"Component is chosen"}/> </div>
        </div>
    )
}

export const ComponentSelectedTable: React.FC = () => {
    const [selectedPcParts, setSelectedPcParts] = useRecoilState(selectedPcPartsState);

    const computerComponentItems = [
        {name: "CPU", img: Cpu, chosen: selectedPcParts.cpu.id !== -1},
        {name: "Motherboard", img: Motherboard, chosen: selectedPcParts.motherboard.id !== -1},
        {name: "RAM", img: Ram, chosen: selectedPcParts.ram.id !== -1},
        {name: "Disk", img: Disk, chosen: selectedPcParts.disk.id !== -1},
        {name: "GPU", img: Gpu, chosen: selectedPcParts.gpu.id !== -1},
        {name: "PSU", img: Psu, chosen: selectedPcParts.psu.id !== -1},
        {name: "Case", img: Case, chosen: selectedPcParts.case.id !== -1},
        {name: "Monitor", img: Monitor, chosen: selectedPcParts.monitor.id !== -1},
        {name: "Keyboard", img: Keyboard, chosen: selectedPcParts.keyboard.id !== -1},
        {name: "Mouse", img: Mouse, chosen: selectedPcParts.mouse.id !== -1},
    ];

    const computerComponentItemsComponent = computerComponentItems.map(item => <ComponentSelectedTableItem name={item.name} img={item.img} chosen={item.chosen} />);

    return (
        <div {...classes()}>
            {computerComponentItemsComponent}
        </div>
    )
};