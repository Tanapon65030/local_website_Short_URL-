import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';

function UrlHistory() {
    const [urls, setUrls] = useState([]);
    const [isQrModalOpen, setQrModalOpen] = useState(false);
    const [currentQrUrl, setCurrentQrUrl] = useState('');
    const defaultProxy = "https://boomtanapon.azurewebsites.net"; //http://localhost:5000 https://boomtanapon.azurewebsites.net

    const fetchUrls = useCallback(async () => {
        try {
            const response = await axios.get(`${defaultProxy}/api/urls`);
            setUrls(response.data);
        } catch (error) {
            console.error('Error fetching URLs:', error);
        }
    }, [defaultProxy]);

    useEffect(() => {
        fetchUrls();
    }, [fetchUrls]);

    const deleteUrl = async (id) => {
        try {
            await axios.delete(`${defaultProxy}/api/urls/${id}`);
            fetchUrls(); // Re-fetch URLs after deletion
        } catch (error) {
            console.error('Error deleting URL:', error);
        }
    };

    const openQrModal = (url) => {
        setCurrentQrUrl(url);
        setQrModalOpen(true);
    };

    const closeQrModal = () => {
        setQrModalOpen(false);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
            <h1 className="url-form-title">URL History</h1>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {urls.map(url => (
                    <li key={url._id} style={{ background: '#f0f0f0', margin: '10px', padding: '20px', borderRadius: '8px', width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ wordBreak: 'break-all', flex: 1, marginRight: '30px' }}> {/* Added marginRight here */}
                        <div><strong>Short URL:</strong> <a href={`${defaultProxy}/${url.short}`} target="_blank" rel="noopener noreferrer">{`${defaultProxy}/${url.short}`}</a></div>
                        <div><strong>Full URL:</strong> <a href={url.full} target="_blank" rel="noopener noreferrer">{url.full}</a></div>
                        <div><strong>Clicks:</strong> {url.clicks}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <button onClick={() => openQrModal(`${defaultProxy}/${url.short}`)} className="delete-button">Generate QR</button>
                        <button onClick={() => deleteUrl(url._id)} className="delete-button">Delete URL</button>
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
