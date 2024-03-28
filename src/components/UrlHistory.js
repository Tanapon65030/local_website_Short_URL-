import React, { useEffect, useState, useCallback } from 'react';
import QRCode from 'qrcode.react';
import '../App.css';

function UrlHistory() {
    const [urls, setUrls] = useState([]);
    const [isQrModalOpen, setQrModalOpen] = useState(false);
    const [currentQrUrl, setCurrentQrUrl] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const defaultProxy = "https://boom-short-url.onrender.com";

    const fetchUrls = useCallback(() => {
        fetch(`${defaultProxy}/api/urls`)
            .then(response => response.json()) 
            .then(data => setUrls(data))
            .catch(error => console.error('Error fetching URLs:', error));
    }, [defaultProxy]);

    useEffect(() => {
        fetchUrls();
        const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(storedIsLoggedIn);
    }, [fetchUrls]);

    const deleteUrl = (id) => {
        fetch(`${defaultProxy}/api/urls/${id}`, { method: 'DELETE' })
            .then(() => fetchUrls())
            .catch(error => console.error('Error deleting URL:', error));
    };

    const openQrModal = (url) => {
        setCurrentQrUrl(url);
        setQrModalOpen(true);
    };

    const closeQrModal = () => {
        setQrModalOpen(false);
    };

    return (
        <div className="url_History">
            <h1 className="url-form-title">URL History</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {urls.map(url => (
                    <li key={url._id} className="url_History_div">
                        <div style={{ wordBreak: 'break-all', flex: 1, marginRight: '30px' }}>
                            <div><strong>Short URL:</strong> <a href={`${defaultProxy}/${url.short}`} target="_blank" rel="noopener noreferrer">{`${defaultProxy}/${url.short}`}</a></div>
                            <div><strong>Full URL:</strong> <a href={url.full} target="_blank" rel="noopener noreferrer">{url.full}</a></div>
                            <div><strong>Clicks:</strong> {url.clicks}</div>
                        </div>
                        <div className="url_History_div2">
                            <button onClick={() => openQrModal(`${defaultProxy}/${url.short}`)} className="delete-button">Generate QR</button>
                            {isLoggedIn && <button onClick={() => deleteUrl(url._id)} className="delete-button">Delete URL</button>}
                        </div>
                    </li>
                ))}
            </ul>
            {isQrModalOpen && (
                <div className="qr-modal">
                    <QRCode value={currentQrUrl} size={256} />
                    <button onClick={closeQrModal} className="close-qr-button">Close</button>
                </div>
            )}
        </div>
    );
}

export default UrlHistory;
