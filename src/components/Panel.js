import React, { useState, useEffect, useRef } from 'react';
import {LIFE_STATE} from '../constant';
import Cell from './Cell';

const Pannel = props => {

    const { rows, cols, update_mSec, init_cell_number, generation } = props;

    const checkAlive = (matrix, r, c) => {

        if (!matrix[r] || !matrix[r][c]) return LIFE_STATE.DEAD;

        if ([LIFE_STATE.DEAD_TO_LIVE, LIFE_STATE.LIVE].includes(matrix[r][c])) return true;
    };

    const setStatusToMatrix = m => {
        for (let i = 0; i < init_cell_number; i++) {
            const r = ~~(Math.random() * rows);
            const c = ~~(Math.random() * cols);
            m[r][c] = LIFE_STATE.LIVE;
        }

        return m;
    };

    const createMatrix = (r, c) => {
        const m = [];
        for (let i = 0; i < r; i++) {
            m[i] = (new Array(c)).fill(LIFE_STATE.DEAD, 0, c);
        }

        return m;
    };

    const [matrix, setMatrix] = useState(() => createMatrix(rows, cols));

    const matrixRef = useRef(matrix);

    // set status on mounted
    useEffect(() => {
        const m = createMatrix(rows, cols);

        setStatusToMatrix(m);

        setMatrix(m);
    }, [rows, cols, update_mSec, init_cell_number]);

    useEffect(() => {
        matrixRef.current = matrix;
    }, [matrix]);

    // update for each generation
    useEffect(() => {

        if (generation === 0) return;

        const m = JSON.parse(JSON.stringify(matrixRef.current));

        for (let i = 0; i < rows ; i++) {
            for (let j = 0; j < rows ; j++) {

                let alive_neibor_number = 0;

                if (checkAlive(m, i-1, j-1)) alive_neibor_number++;
                if (checkAlive(m, i, j-1)) alive_neibor_number++;
                if (checkAlive(m, i+1, j-1)) alive_neibor_number++;

                if (checkAlive(m, i-1, j)) alive_neibor_number++;
                if (checkAlive(m, i+1, j)) alive_neibor_number++;

                if (checkAlive(m, i+1, j+1)) alive_neibor_number++;
                if (checkAlive(m, i+1, j+1)) alive_neibor_number++;
                if (checkAlive(m, i+1, j+1)) alive_neibor_number++;

                if (alive_neibor_number < 2 && alive_neibor_number > 3 && m[i][j] % 2) m[i][j] = LIFE_STATE.LIVE_TO_DEAD;
                if (alive_neibor_number === 3 && !(m[i][j] % 2)) m[i][j] = LIFE_STATE.DEAD_TO_LIVE;
                console.log(i, j, 'alive_neibor_number', alive_neibor_number);
            }
        }

        setMatrix(() => m);

    }, [generation]);

    console.log(rows, cols, update_mSec, init_cell_number, generation, matrix);

    return (
        <div style={{
            display: 'flex',
            position: 'relative',
            flexDirection: 'column',
            marginBottom: '10px',
            width: '100%'
        }}>
            {matrix.map((row, ridx) => <div key={ridx} style={{ display: 'flex', flexDirection: 'row' }}>
                {row.map((col, cidx) => <Cell key={`${ridx}_${cidx}`} width={100 / cols} status={col} />)}
            </div>)}
        </div>
    );


};

export default Pannel;