import React, { useState } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import '../App.css';

function UrlForm() {
    const [url, setUrl] = useState('');
    const [displayUrl, setDisplayUrl] = useState(''); // สถานะใหม่สำหรับเก็บ URL ที่จะแสดง
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');
    const defaultProxy = "https://boom-short-url.onrender.com"; //http://localhost:5000 https://boomtanapon.azurewebsites.net

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/shorten', { fullUrl: url });
            setShortUrl(response.data.short);
            setDisplayUrl(url); // อัพเดต URL ที่จะแสดงด้วยค่าปัจจุบันของ url ก่อนเคลียร์ค่าในช่องกรอก
            setError('');
            setUrl(''); // เคลียร์ค่าในช่องกรอกหลังจากย่อ URL สำเร็จ
        } catch (error) {
            console.error('Error shortening URL:', error);
            setError('Error shortening URL');
        }
    };

    return (
        <div className="url-form-container">
            <div className="url-form-title-container">
                <h1 className="url-form-title">Web Short URL</h1>
                <p className="url-form-subtitle">By.NongBoom</p>
            </div>
    
            <form onSubmit={handleSubmit} className="url-form">
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter URL"
                    required
                    className="url-input"
                />
                <button type="submit" className="url-submit-button">
                    Short URL
                </button>
            </form>
            {error && <p className="url-error-message">{error}</p>}
            {shortUrl && (
                <div className="url-result-container">
                    {displayUrl && <p>Original URL: <a href={displayUrl} target="_blank" rel="noopener noreferrer" className="url-link">{displayUrl}</a></p>}
                    <p>Short URL: <a href={`${defaultProxy}/${shortUrl}`} target="_blank" rel="noopener noreferrer" className="url-link">{`${defaultProxy}/${shortUrl}`}</a></p>
                    <QRCode value={`${defaultProxy}/${shortUrl}`} />
                </div>
            )}
        </div>
    );
    
}

export default UrlForm;
