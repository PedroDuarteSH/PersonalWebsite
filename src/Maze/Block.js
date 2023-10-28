import React from 'react';
import './Block.css';

const Block = ({cell, width, height, start, end , pos}) => {
    var border = cell.border;
    var color = "white";


    if(cell.id === start){
        cell.color = "red"
    }

    if(cell.id === end){
        cell.color = "green"
    }
    
    const borderStyles = {
        borderRight: border.right ? `${border.right === 3 ? "1" : "1"}px solid black` : "none",
        borderTop: border.top ? `${border.top === 3 ? "1" : "1"}px solid black` : "none",
        borderBottom: border.bottom ? `${border.bottom === 3 ? "1" : "1"}px solid black` : "none",
        borderLeft: border.left ? `${border.left === 3 ? "1" : "1"}px solid black` : "none",
        width: width + "px",
        height: height + "px",
        backgroundColor: cell.color
    };
 

    return (
            <div style={borderStyles}>
            </div>       
    );
}

export default Block;
