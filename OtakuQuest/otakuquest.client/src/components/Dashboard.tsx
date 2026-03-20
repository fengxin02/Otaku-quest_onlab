import {  useEffect, useState} from "react";

import { PlayerProfileService } from '../api/generated';
import './Dashboard.css';
import SakuraImage from '../assets/Sakura.png';
import DefaultImage from '../assets/Default.png';
import TogawaSakikoImage from '../assets/Togawa_Sakiko.png';

interface DashboardProps {
    onLogout: () => void;
}

 const characterImages: Record<string, string> = {
    'Sakura': SakuraImage,
    // 'Kenji': KenjiImage,
    'Default': DefaultImage,
    'Saki': TogawaSakikoImage,
};
const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
   

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await PlayerProfileService.getApiPlayerProfileMyStats();
                setStats(response);
            } catch (err: any) {
                console.error('Error fetching player stats:', err);
                setError(err.body?.message || 'Failed to load player stats. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);


    if(loading) {
        return <div className="dashboard-loading">Challenges are loading...</div>;
    }
    if(error) {
        return <div className="dashboard-error">
            <p>{error}</p>
            <button onClick={onLogout} className="logout-btn">Back to the login page</button>
        </div>
    }
    if(!stats) {
        return null;
    }
    const xpNeededForNextLevel = (stats.level) * 100; 
    const currentXp = stats.xp;
    const xpPercentage = Math.min((currentXp / xpNeededForNextLevel) * 100, 100);
    //const currentAvatar = stats.avatarItemId || 'Sakura';
    //const portraitSource = characterImages[currentAvatar] || characterImages['Sakura'];
    const portraitSource = characterImages['Saki'];
    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-card">

                {/* === Left site Character Portrait === */}
                <div className="character-portrait-section">
                    <div className="portrait-placeholder">
                        <img className="portrait-img" src={portraitSource} alt="Character Portrait" />
                    </div>
                </div>

                {/* === Right side: STATS AND EQUIPMENT === */}
                <div className="character-stats-section">
                    
                    <header className="dashboard-header">
                        <div className="title-group">
                            <h2>{stats.username}</h2>
                            <span className="level-subtitle">Level: {stats.level} </span>
                        </div>
                        <button onClick={onLogout} className="logout-btn">Logout</button>
                    </header>

                    <div className="xp-container">
                        <div className="xp-text">Experience: {currentXp} / {xpNeededForNextLevel} XP</div>
                        <div className="xp-bar-bg">
                            <div className="xp-bar-fill" style={{ width: `${xpPercentage}%` }}></div>
                        </div>
                    </div>

                    {/* === Right side: STATS === */}
                    <div className="stats-and-equip-grid">
                        
                        <div className="stat-column">
                            <div className="stat-box vital-box">
                                <p>❤️ Health: <span> {stats.currentHP} / {stats.maxHP}</span></p>
                                <p>💰 Gold: <span>{stats.currency}</span></p>
                            </div>
                            
                            <div className="stat-box attributes-box">
                                <p>⚔️ Strength (STR): <span>{stats.str}</span></p>
                                <p>🧠 Intelligence (INT): <span>{stats.int}</span></p>
                                <p>🛡️ Defense (DEF): <span>{stats.def}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* === Right side: WEAPON === */}
            <div className="dashboard-card-weapons">
                        <div className="equip-column">
                            <div className="equip-slot-box">
                                <h4>Weapon in Hand</h4>
                                <div className="weapon-placeholder">
                                    <span className="empty-slot-icon">🗡️</span>
                                    <p>No Weapon</p>
                                    <small>(Still in progress...)</small>
                                </div>
                            </div>
                        </div>
            </div>
        </div>
    );

}
export default Dashboard;