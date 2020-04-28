import React, {useState, useEffect} from 'react';
import Cell from './Cell';

const LIFE_STATE = {
    DEAD: 0,
    LIVE: 1,
    LIVE_TO_DEAD: 2,
    DEAD_TO_LIVE: 3
};

const Pannel = props => {

    const { rows, cols, update_mSec, init_cell_number, generation } = props;

    const [matrix, setMatrix] = useState(() => {
        const m = [];
        for (let i = 0 ; i < rows ; i++) {
            m[i] = (new Array(cols)).fill(LIFE_STATE.DEAD, 0, cols);
        }

        return m;
    });

    useEffect(() => {
        const cpm = JSON.parse(JSON.stringify(matrix));

        for (let i = 0 ; i < init_cell_number ; i++) {
            const r = ~~(Math.random() * rows);
            const c = ~~(Math.random() * cols);
            cpm[r][c] = LIFE_STATE.LIVE;
        }

        setMatrix(cpm);
    }, []);

    console.log(rows, cols, update_mSec, init_cell_number, generation);

    return (
        <div style={ {
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            marginBottom: '10px',
            width: '100%'
        } }>
            { matrix.map((row, ridx) => <div key={ridx} style={ {display: 'flex', flexDirection: 'row'} }>
                { row.map((col, cidx) => <Cell key={`${ridx}_${cidx}`} width={ 100 / cols } status={col} />) }
            </div>) }
        </div>
    );


};

export default Pannel;