import React from 'react';
import './ComputerTypeChooser.css';
import BEMHelper from 'react-bem-helper';
import {ComputerType} from "../ComputerType/ComputerType";

const classes = new BEMHelper({
    name: 'chooser',
});

// TODO: Natahovat sestavy z DB
export const ComputerTypeChooser: React.FC = () => {
    return (
        <div {...classes()}>
            <ComputerType header={"Gaming"} name={"Herní pc"} cpuName={"Intel i9 9900k"} gpuName={"GeForce RTX 3090"} ramName={"Corsair Dominator 64 GB"} diskName={"Samsung Evo 500 GB"} price={1730}/>
            <ComputerType header={"Office"} name={"Kancelářské pc"} cpuName={"Intel i3 11000"} gpuName={"Intel HD shit"} ramName={"Kingston 8 GB"} diskName={"WD 500 GB"} price={369}/>
            <ComputerType header={"Workstation"} name={"Pro náročné"} cpuName={"AMD ThreadRipper XYZ"} gpuName={"GeForce RTX 3090"} ramName={"Corsair Dominator 256 GB"} diskName={"Intel Optane 1 TB"} price={4666}/>
        </div>
    )
};
