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
            <ComputerType header={"Gaming"} category={'gaming'}/>
            <ComputerType header={"Office"} category={'office'}/>
            <ComputerType header={"Highend"} category={'high-end'}/>
            <ComputerType header={'Custom'} category={''}/>
        </div>
    )
};
