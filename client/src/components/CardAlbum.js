import React from 'react';

const CardAlbum = ({cards}) => {
    return (
        <div className="collection-placeholder">
            <div className="collection-icon">📖</div>
            <h3>{cards.length === 0 ? 'No Cards Found' : `Found ${cards.length} Cards`} </h3>
                {cards.length > 0 ? (
                    <p>Start to add cards to your collection!</p>

                ) : (
                    <ul>{cards.map(card => <li key ={card._id}>{card.name}</li>)}</ul>
                )}
                <button className="add-card-btn">Add Card</button>

        </div>
    );
};

export default CardAlbum;