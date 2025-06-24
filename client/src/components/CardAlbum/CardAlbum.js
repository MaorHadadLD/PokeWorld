import React, {useState} from 'react';
import CardUpload from './CardUpload';
// import '../../css/CardAlbum.css';

const CardAlbum = ({ cards }) => {
    const [showUpload, setShowUpload] = useState(false);
    return (
        <div className="collection-placeholder">
            <div className="collection-icon">📖</div>
            <h3>{cards.length === 0 ? 'No Cards Found' : `Found ${cards.length} Cards`} </h3>
                {cards.length > 0 ? (
                    <p>Start to add cards to your collection!</p>

                ) : (
                    <ul>{cards.map(card => <li key ={card._id}>{card.name}</li>)}</ul>
                )}
                <button className="add-card-btn" onClick={() => setShowUpload(prev => !prev)}>
                    {showUpload ? 'Cancel' : 'Add Card'}
                </button>
                {showUpload && <CardUpload />}
        </div>
    );
};

export default CardAlbum;