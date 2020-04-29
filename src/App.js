import React, { useState, useEffect, useRef } from 'react';
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
        rows: 10,
        cols: 10,
        update_mSec: 1000,
        init_cell_number: 3,
        generation: 0
    });

    const startGenerationRef = useRef(false);

    let id = null;
    const MAX_COUNT = 1000;

    const startPlay = () => {

        if (!startGenerationRef.current) return;

        if (settings.generation > MAX_COUNT) clearTimeout(id);

        console.log('startPlay -> settings', settings);
        setSettings(prev => ({...prev, generation: prev.generation + 1}));

        setTimeout(startPlay, settings.update_mSec);

    };

    useEffect(() => {
        console.log('settings.generation',settings.generation);
    },[settings]);


    return (
        <div className="App">
            <h1>Conway's Game of Live</h1>

            <h3>Rule</h3>

            {gameRule.current.map(r => <p key={r}>{r}</p>)}

            <header style={ {
                position: 'relative',
                maxWidth: '50%',
                maxHeight: '50%',
                margin: '0 auto',
            } }>
                {console.log('render header')}
                <Panel {...settings} />
            </header>

            { JSON.stringify(settings)}

            <section style={{margin: '0 20% 20px  20%'}}>
                <div style={ {display: 'flex', justifyContent: 'space-around'} } >
                    <label htmlFor='rows'>Rows</label>
                    <input type="number" name="rows" placeholder="rows" defaultValue='50' onChange={e => setSettings({...settings, rows: Number(e.target.value)})} />

                    <label htmlFor='columns'>Columns</label>
                    <input type="number" name="columns" placeholder="columns" defaultValue='50' onChange={e => setSettings({...settings, cols: Number(e.target.value)})} />

                    <label htmlFor='updateSeconds'>Update Seconds</label>
                    <input type="number" name="updateSeconds" placeholder="update seconds" defaultValue='500' onChange={e => setSettings({...settings, update_mSec: Number(e.target.value)})} />

                    <label htmlFor='initialNumberOfCells'>Initial Number Of Cells</label>
                    <input type="number" name="initialNumberOfCells" placeholder=" initial number of cells" defaultValue='3' onChange={e => setSettings({...settings, init_cell_number: Number(e.target.value)})} />

                    <button onClick={() => (startGenerationRef.current = !startGenerationRef.current) && startPlay()}>reset</button>
                </div>
            </section>
        </div>
    );
}

export default App;
