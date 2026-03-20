import React, { useEffect, useState } from 'react';
import { AuthService } from '../api/generated';
import './Auth.css'; 

const Auth = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [message, setMessage] = useState<string>('');
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);


    useEffect(() => {
        // Listen for window resize events to update mobile state
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
     }, []);
    
    //run if u click the submit button
    const handleSubmit = async (e: React.FormEvent) => {
        // Stop refreshing the page
        e.preventDefault();
        try {
            if (isLogin) {
                const response = await AuthService.postApiAuthLogin({
                     username, password
                    });
                
                const token = response.token;
                if (token) {
                    localStorage.setItem('token', token);
                }
                setMessage(response.message || 'Successfully logged in!');
                onLoginSuccess();

            } else {
                const response = await AuthService.postApiAuthRegister({
                     username, password
                    });
                
                setMessage(response.message);
                setIsLogin(true);
                setPassword('');
            }
        } catch (error: any) {
            setMessage(error.body?.message || 'Something went wrong at communication. Please try again.');
        }
};

return (
        <div className="auth-wrapper">
          <h1 className="auth-main-title">Otaku Quest</h1>
            <div className="auth-container">
                <h2 className="auth-title">{isLogin ? ( isMobile ? 'Otaku Quest' : 'Login' ) : 'New Character'}</h2>
                
                <form onSubmit={handleSubmit} className="auth-form">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="auth-input"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="auth-input"
                    />
                    <button type="submit" className="auth-button" onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(e); }}>
                        {isLogin ? 'Back to Adventure' : 'Create Character'}
                    </button>
                </form>

                {message && <p className="auth-message">{message}</p>}

                <button 
                    onClick={() => { setIsLogin(!isLogin); setMessage('');  setPassword(''); setUsername(''); }} 
                    className="auth-toggle"
                >
                    {isLogin ? 'Don\'t have a character yet? Click here!' : 'Already have a character? Log in!'}
                </button>
            </div>
        </div>
    );
};
export default Auth;