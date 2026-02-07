import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';


const MobileDrawer = ({ isOpen, activeNaam, onClose, deferredPrompt, isPWAInstalled }) => {
    const { user, isAuthenticated, openLogin } = useAuth();
    const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
    const [reminderTime, setReminderTime] = React.useState('05:00');
    const [showPermissionHelp, setShowPermissionHelp] = React.useState(false);
    const [showIOSInstallGuide, setShowIOSInstallGuide] = React.useState(false);
    const [isIOS, setIsIOS] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Load notification settings
    React.useEffect(() => {
        const enabled = localStorage.getItem('notificationsEnabled') === 'true';
        const time = localStorage.getItem('reminderTime') || '05:00';
        setNotificationsEnabled(enabled);
        setReminderTime(time);

        // Detect iOS
        const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        setIsIOS(isIOSDevice);
    }, []);

    // Helper for IndexedDB access
    const writeToIDB = (key, value) => {
        return new Promise((resolve) => {
            const request = indexedDB.open('japa-settings', 1);
            request.onupgradeneeded = (e) => e.target.result.createObjectStore('settings');
            request.onsuccess = (e) => {
                const db = e.target.result;
                const transaction = db.transaction('settings', 'readwrite');
                const store = transaction.objectStore('settings');
                store.put(value, key);
                transaction.oncomplete = () => resolve(true);
            };
        });
    };

    // Save notification settings
    React.useEffect(() => {
        localStorage.setItem('notificationsEnabled', notificationsEnabled);
        localStorage.setItem('reminderTime', reminderTime);

        // Save to IndexedDB for Service Worker access (Best Practice)
        writeToIDB('notificationSettings', {
            enabled: notificationsEnabled,
            time: reminderTime
        });

        // Signal service worker if it exists
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({
                type: 'SCHEDULE_NOTIFICATION',
                enabled: notificationsEnabled,
                time: reminderTime
            });
        }
    }, [notificationsEnabled, reminderTime]);

    const toggleNotifications = async () => {
        if (!notificationsEnabled) {
            // Check if browser supports notifications
            if (!('Notification' in window)) {
                alert('This browser does not support desktop notifications.');
                return;
            }

            // Check existing permission state
            const currentPermission = Notification.permission;

            if (currentPermission === 'denied') {
                setShowPermissionHelp(true);
                return;
            }

            if (currentPermission === 'granted') {
                setNotificationsEnabled(true);
                return;
            }

            // Request permission (if current state is 'default')
            try {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    setNotificationsEnabled(true);
                    // Show a quick test notification to confirm
                    new Notification('Naam Japa Counter', {
                        body: 'Notifications enabled! You will receive reminders at your scheduled time.',
                        icon: '/icon.svg'
                    });
                } else {
                    console.warn('Permission denied by user');
                }
            } catch (err) {
                console.error('Error requesting notification permission:', err);
                alert('There was an error enabling notifications. Please ensure you are viewing this via a secure (HTTPS) connection.');
            }
        } else {
            setNotificationsEnabled(false);
            setShowPermissionHelp(false);
        }
    };

    // Helper to format 24h to 12h components
    const get12HourComponents = (time24) => {
        const [hours, minutes] = time24.split(':');
        let h = parseInt(hours, 10);
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12;
        h = h ? h : 12;
        return { hour: h.toString(), minute: minutes, period: ampm };
    };

    // Helper to convert components back to 24h string
    const updateReminderFromComponents = (h, m, p) => {
        let hours = parseInt(h, 10);
        if (p === 'PM' && hours < 12) hours += 12;
        if (p === 'AM' && hours === 12) hours = 0;
        const time24 = `${hours.toString().padStart(2, '0')}:${m}`;
        setReminderTime(time24);
    };

    const timeComponents = get12HourComponents(reminderTime);

    // Lock body scroll when drawer is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Get user display name
    const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'Devotee';
    const userInitial = userName.charAt(0).toUpperCase();

    const handleLogout = () => {
        // Clear Supabase keys
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('sb-')) {
                localStorage.removeItem(key);
            }
        });
        window.location.href = '/';
    };

    const handleLeaderboardClick = () => {
        onClose();
        if (isAuthenticated) {
            navigate('/leaderboard');
        } else {
            console.log("Global Rank clicked -> Guest -> Opening Login");
            openLogin();
        }
    };

    const handleAndroidInstall = async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response to the install prompt: ${outcome}`);
        } else {
            alert('To install on Android, please use the "Install app" option in your browser menu (⋮).');
        }
    };

    const handleIOSInstall = () => {
        setShowIOSInstallGuide(true);
    };


    return (
        <>
            <div
                className={`drawer-overlay ${isOpen ? 'open' : ''}`}
                onClick={onClose}
            />
            <div className={`drawer ${isOpen ? 'open' : ''}`}>

                {/* 1. Modern Header */}
                <div className="drawer-header-modern">
                    <div className="drawer-user-info">
                        <div className="drawer-avatar">
                            {isAuthenticated ? userInitial : '🕉️'}
                        </div>
                        <div className="drawer-user-text">
                            <div className="drawer-greeting">Radhe Radhe</div>
                            <div className="drawer-username">
                                {isAuthenticated ? userName : 'Guest'}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Navigation Content */}
                <div className="drawer-content">
                    <div className="drawer-section-title">Menu</div>

                    <DrawerLink
                        to="/"
                        icon="🏠"
                        label="Home"
                        isActive={location.pathname === '/'}
                        onClick={onClose}
                    />
                    <DrawerLink
                        to="/premanand-ji-maharaj"
                        icon="🙏"
                        label="Premanand Ji"
                        isActive={location.pathname === '/premanand-ji-maharaj'}
                        onClick={onClose}
                    />
                    <DrawerLink
                        to="/naam-japa-counter"
                        icon="📿"
                        label="Naam Library"
                        isActive={location.pathname.startsWith('/naam-japa-counter')}
                        onClick={onClose}
                    />

                    <div className="drawer-divider-modern" />

                    <div className="drawer-section-title">Progress</div>

                    <DrawerLink
                        to="/statistics"
                        icon="📈"
                        label="My Journey"
                        isActive={location.pathname === '/statistics'}
                        onClick={onClose}
                    />
                    <DrawerLink
                        // No 'to' means it acts as a button
                        icon="🏆"
                        label="My Rank"
                        isActive={location.pathname === '/leaderboard'}
                        onClick={handleLeaderboardClick}
                    />

                    <div className="drawer-divider-modern" />

                    <div className="drawer-section-title">Daily Reminder</div>
                    <div className="drawer-reminder-settings">
                        <div className="reminder-toggle-row">
                            <span className="reminder-label">Enable Notification</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={notificationsEnabled}
                                    onChange={toggleNotifications}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                        {notificationsEnabled && (
                            <div className="reminder-time-row v2 animate-fade-in">
                                <div className="custom-time-picker">
                                    <select
                                        value={timeComponents.hour}
                                        onChange={(e) => updateReminderFromComponents(e.target.value, timeComponents.minute, timeComponents.period)}
                                        className="time-select"
                                    >
                                        {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                                            <option key={h} value={h}>{h}</option>
                                        ))}
                                    </select>
                                    <span className="time-separator">:</span>
                                    <select
                                        value={timeComponents.minute}
                                        onChange={(e) => updateReminderFromComponents(timeComponents.hour, e.target.value, timeComponents.period)}
                                        className="time-select"
                                    >
                                        {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map(m => (
                                            <option key={m} value={m}>{m}</option>
                                        ))}
                                    </select>
                                    <div className="ampm-toggle">
                                        <button
                                            className={`ampm-btn ${timeComponents.period === 'AM' ? 'active' : ''}`}
                                            onClick={() => updateReminderFromComponents(timeComponents.hour, timeComponents.minute, 'AM')}
                                        >AM</button>
                                        <button
                                            className={`ampm-btn ${timeComponents.period === 'PM' ? 'active' : ''}`}
                                            onClick={() => updateReminderFromComponents(timeComponents.hour, timeComponents.minute, 'PM')}
                                        >PM</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="drawer-divider-modern" />

                    <div className="drawer-section-title">Download App</div>
                    <div className="download-options-grid">
                        <div
                            className="download-badge-container android"
                            onClick={handleAndroidInstall}
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                                alt="Get it on Google Play"
                                className="official-badge"
                            />
                        </div>
                        <div
                            className="download-badge-container ios"
                            onClick={handleIOSInstall}
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                                alt="Download on the App Store"
                                className="official-badge"
                            />
                        </div>
                    </div>
                </div>

                {/* 3. Footer Actions */}
                <div className="drawer-footer">
                    {isAuthenticated ? (
                        <button className="drawer-auth-btn logout" onClick={handleLogout}>
                            <span>🚪</span> Logout
                        </button>
                    ) : (
                        <button
                            className="drawer-auth-btn login"
                            onClick={() => { onClose(); openLogin(); }}
                        >
                            <span>✨</span> Login to Save
                        </button>
                    )}
                </div>

                {/* Overlays */}
                {showIOSInstallGuide && (
                    <div className="ios-install-guide animate-fade-in">
                        <div className="guide-content">
                            <button className="guide-close" onClick={() => setShowIOSInstallGuide(false)}>×</button>
                            <h3>Install Japa Counter</h3>
                            <p>Install this app on your iPhone for the best experience:</p>
                            <div className="guide-steps">
                                <div className="guide-step">
                                    <span className="step-num">1</span>
                                    <p>Tap the <b>Share</b> icon <span className="ios-icon">⎋</span> (bottom center)</p>
                                </div>
                                <div className="guide-step">
                                    <span className="step-num">2</span>
                                    <p>Scroll down and tap <b>'Add to Home Screen'</b> <span className="ios-icon">⊞</span></p>
                                </div>
                            </div>
                            <button className="guide-ok-btn" onClick={() => setShowIOSInstallGuide(false)}>Got it!</button>
                        </div>
                    </div>
                )}

                {showPermissionHelp && (
                    <div className="permission-help-card animate-slide-up">
                        <div className="help-card-header">
                            <span>⚠️ Permission Needed</span>
                            <button className="help-close" onClick={() => setShowPermissionHelp(false)}>×</button>
                        </div>
                        <p className="help-text">Notifications are blocked. To enable:</p>
                        <ul className="help-steps">
                            <li>Click <b>...</b> or <b>ⓘ</b> at the very top of this window</li>
                            <li>Select <b>App Info</b> or <b>Settings</b></li>
                            <li>Set <b>Notifications</b> to <b>Allowed</b></li>
                        </ul>
                        <button className="help-refresh-btn" onClick={() => window.location.reload()}>
                            I've allowed it, Refresh App
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

const DrawerLink = ({ to, icon, label, isActive, onClick }) => {
    // If 'to' is provided, it's a Link
    if (to) {
        return (
            <Link
                to={to}
                className={`drawer-link-modern ${isActive ? 'active' : ''}`}
                onClick={onClick}
            >
                <div className="drawer-link-left">
                    <span className="drawer-link-icon">{icon}</span>
                    <span className="drawer-link-label">{label}</span>
                </div>
                {isActive && <div className="drawer-active-dot" />}
            </Link>
        );
    }

    // Otherwise it's a clickable div (acting as button)
    return (
        <div
            className={`drawer-link-modern ${isActive ? 'active' : ''}`}
            onClick={onClick}
        >
            <div className="drawer-link-left">
                <span className="drawer-link-icon">{icon}</span>
                <span className="drawer-link-label">{label}</span>
            </div>
            {isActive && <div className="drawer-active-dot" />}
        </div>
    );
};

export default MobileDrawer;
