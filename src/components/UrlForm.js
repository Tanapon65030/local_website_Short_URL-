import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import '../App.css';

function UrlForm() {
    const [url, setUrl] = useState('');
    const [displayUrl, setDisplayUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');
    const defaultProxy = "https://boom-short-url.onrender.com";

    const isValidUrl = (url) => {
        const urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
                                       '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
                                       '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                                       '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                                       '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                                       '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!urlPattern.test(url);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isValidUrl(url)) {
            setError('Invalid URL');
            return;
        }

        fetch(`${defaultProxy}/api/shorten`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullUrl: url }),
        })
        .then(response => response.json())
        .then(data => {
            setShortUrl(data.short);
            setDisplayUrl(url);
            setError('');
            setUrl(''); 
        })
        .catch(error => {
            console.error('Error shortening URL:', error);
            setError('Error shortening URL');
        });
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
