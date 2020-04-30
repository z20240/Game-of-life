import React, { useState, useEffect, useRef, useCallback } from 'react';
// import logo from './logo.svg';
import Panel from './components/Panel';
import './App.css';



function App() {

    const gameRule = useRef([
        '如果活細胞周圍八個位置的活細胞少於兩個，則該位置細胞死亡',
        '如果活細胞周圍八個位置有兩個或三個活細胞，則該位置細胞存活',
        '如果活細胞周圍八個位置有超過三個活細胞，則該位置活細胞死亡',
        '如果死細胞周圍正好有三個活細胞，則該位置細胞復活'
    ]);

    const [settings, setSettings] = useState({
        rows: 20,
        cols: 20,
        update_mSec: 1000,
        init_cell_number: 3,
        generation: 0
    });

    const [startGeneration, setStartGeneration] = useState(false);
    const startGenerationRef = useRef(startGeneration);

    const startPlay = useCallback(() => {

        console.log('tttttt', startGenerationRef.current);

        if (!startGenerationRef.current) return;

        setSettings(prev => ({...prev, generation: prev.generation + 1}));

        setTimeout(startPlay, settings.update_mSec);

    }, []);

    useEffect(() => {
        console.log('in useEffect', startGenerationRef.current, startGeneration);
        startGenerationRef.current = startGeneration;
    },[startGeneration]);


    return (
        <div className="App">
            <h1>{'Conway\'s Game of Live'}</h1>

            <h3>Rule</h3>

            {gameRule.current.map(r => <p key={r}>{r}</p>)}

            <header style={ {
                position: 'relative',
                maxWidth: '50%',
                height: '600px',
                margin: '0 auto',
            } }>
                {console.log('render header')}
                <Panel {...settings} />
            </header>

            { JSON.stringify(settings)}

            <section style={{margin: '0 20% 20px  20%'}}>
                <div style={ {display: 'flex', justifyContent: 'space-around'} } >
                    <label htmlFor='rows'>Rows</label>
                    <input type="number" name="rows" placeholder="rows" defaultValue={settings.rows} onChange={e => setSettings({...settings, rows: Number(e.target.value || 0)})} />

                    <label htmlFor='columns'>Columns</label>
                    <input type="number" name="columns" placeholder="columns" defaultValue={settings.cols} onChange={e => setSettings({...settings, cols: Number(e.target.value  || 0)})} />

                    <label htmlFor='updateSeconds'>Update Seconds</label>
                    <input type="number" name="updateSeconds" placeholder="update seconds" defaultValue={settings.update_mSec} onChange={e => setSettings({...settings, update_mSec: Number(e.target.value || 0)})} />

                    <label htmlFor='initialNumberOfCells'>Initial Number Of Cells</label>
                    <input type="number" name="initialNumberOfCells" placeholder=" initial number of cells" defaultValue='3' onChange={e => setSettings({...settings, init_cell_number: Number(e.target.value || 0)})} />

                    <button onClick={() => {
                        console.log('bf set sg');
                        setStartGeneration(sg => !sg);
                        console.log('aft set sg');
                        if (!startGeneration) {
                            console.log('mnl aft set sg');
                            startGenerationRef.current = true;
                            startPlay();
                        }
                    }}>{ startGeneration ? 'Stop' : 'Start' }</button>

                </div>
            </section>
        </div>
    );
}

export default App;
