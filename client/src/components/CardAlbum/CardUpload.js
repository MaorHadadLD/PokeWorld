import React, { useState } from 'react';
import '../../css/CardUpload.css';

const CardUpload = () => {
    const [image, setImage] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewURL(URL.createObjectURL(file));
            setResult(null);
        }
    };

    const handleFakeAnalyze = () => {
        setResult({
            name: 'Fake Card Name',
            description: 'This is a fake card description for testing purposes.',
            image: previewURL,
        });
    };

    return (
        <div className="card-upload-container">
            <h2>Upload a new card</h2>

            <input type="file" accept="image/*" onChange={handleFileChange} />

            {previewURL && (
                <div className="preview-section">
                    <img src={previewURL} alt="preview" className="card-preview" />
                    <button onClick={handleFakeAnalyze}>Analyze card 🔍</button>
                </div>
            )}

            {result && (
                <div className="result-section">
                    <h3>🎉 קלף שזוהה:</h3>
                    <p><strong>שם:</strong> {result.name}</p>
                    <p><strong>סט:</strong> {result.set}</p>
                    <p><strong>נדירות:</strong> {result.rarity}</p>
                    <p><strong>מצב:</strong> {result.condition}</p>
                    <button>➕ הוסף לאוסף</button>
                </div>
            )}

        </div>
    );
};

export default CardUpload;