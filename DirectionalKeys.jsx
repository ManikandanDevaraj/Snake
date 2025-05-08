import React from 'react';


export default function DirectionalKeys({ upEvent, leftEvent, rightEvent, downEvent }) {
    return <div style={{
        height: '35%',
        width: '100%',
        backgroundColor: '#1F1A2B',
        display: 'grid',
        gridTemplateRows: 'repeat(5, 1fr)',
        gridTemplateColumns: 'repeat(5, 1fr)'
    }}>
        <button className="directional-key up" onClick={upEvent}>▲</button>
        <button className="directional-key left" onClick={leftEvent}>◀</button>
        <button className="directional-key right" onClick={rightEvent}>▶</button>
        <button className="directional-key down" onClick={downEvent}>▼</button>
    </div>;
}
