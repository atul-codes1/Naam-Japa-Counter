import React, { useState, useEffect } from 'react';

const QUOTES = [
    "राधे राधे जपो चले आएंगे बिहारी, आएंगे बिहारी चले आएंगे बिहारी।",
    "श्री राधा नाम की महिमा अपरंपार है, जो इसका आश्रय लेता है, उसका बेड़ा पार है।",
    "हे राधे! मेरी हर सांस में तेरा ही नाम हो, मेरा हर कदम तेरे चरणों की ओर हो।",
    "राधा रानी के चरणों में ही सच्चा सुख है, बाकी सब तो बस दुख ही दुख है।",
    "जैसे चकोर को चाँद और मीन को पानी, वैसे ही मेरे मन को भाती है श्यामा प्यारी।",
    "श्री कृष्ण को पाने का सबसे सरल मार्ग श्री राधा का प्रेम है।",
    "राधा नाम सुखदाई, भजो नित राधा राधा।",
    "जिस पर राधा रानी की कृपा हो जाए, उसे तीनों लोकों का सुख मिल जाता है।",
    "मेरी विनती यही है राधा रानी, कृपा बरसाए रखना, अपनी चाकरी में लगाए रखना।",
    "प्रेम की उच्चतम सीमा राधा है, भक्ति का दूसरा नाम राधा है।",
    "जो राधा नाम गाते हैं, वो कृष्ण को स्वतः ही पा जाते हैं।",
    "सांवरे की बंसी भी 'राधे-राधे' पुकारती है।"
];

const RadhaRaniQuote = () => {
    const [quote, setQuote] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);

    const generateQuote = () => {
        setIsAnimating(true);
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * QUOTES.length);
            setQuote(QUOTES[randomIndex]);
            setIsAnimating(false);
        }, 300);
    };

    useEffect(() => {
        generateQuote();
    }, []);

    return (
        <div className="quote-card-container">
            <div className="drawer-section-title" style={{ marginTop: '24px' }}>
                Today's Inspiration
            </div>

            <div className="quote-card">
                <div className={`quote-text ${isAnimating ? 'fade-out' : 'fade-in'}`}>
                    "{quote}"
                </div>

                <button
                    className="generate-quote-btn"
                    onClick={generateQuote}
                    disabled={isAnimating}
                >
                    <span>✨</span> New Quote
                </button>
            </div>


        </div>
    );
};

export default RadhaRaniQuote;
