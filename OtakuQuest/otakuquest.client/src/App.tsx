import { useEffect, useState } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    useEffect( ()=>{

        const token = localStorage.getItem('token');
        if(token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };
    // Clear token and update authentication state on logout
    const handleLogout = () => {
        localStorage.removeItem('token'); 
        setIsAuthenticated(false); 
    };
    const handleBackToMenu = () => {
        // Implement any additional logic needed when going back to the menu
        console.log('Back to menu clicked');
    }

    return (
        <div>
            {isAuthenticated ? (
                <Dashboard onLogout={handleLogout} onBackToMenu={handleBackToMenu} />
            ) : (
                <Auth onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
}

export default App;