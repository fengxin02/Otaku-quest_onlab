
import {  type PlayerStatsDto } from '../api/generated';
import './Dashboard.css';
import SakuraImage from '../assets/Sakura.png';
import DefaultImage from '../assets/Default.png';
import TogawaSakikoImage from '../assets/Togawa_Sakiko.png';
import Heart from '../assets/heart.png';
import Primogem from '../assets/primogem.png';
import Strengthicon from '../assets/strength.png';
import Defenseicon from '../assets/DoranShield.png';
import Intelligenceicon from '../assets/eldenring.png';
import DefaultBackground from '../assets/DefaultBackground.png';


interface DashboardProps {
    onLogout: () => void;
    onBackToMenu: () => void;
    stats: PlayerStatsDto | null;
}

 const characterImages: Record<string, string> = {
    'Sakura': SakuraImage,
    // 'Kenji': KenjiImage,
    'Default': DefaultImage,
    'Saki': TogawaSakikoImage,
};
const backgroundImages: Record<string, string> = {
    'Default': DefaultBackground,
    // Add more background images as needed
};

const Dashboard: React.FC<DashboardProps> = ({ onLogout, onBackToMenu, stats }) => {

    if(!stats) {
        return null;
    }
    const xpNeededForNextLevel = (stats.level) * 100; 
    const currentXp = stats.xp;
    const xpPercentage = Math.min((currentXp / xpNeededForNextLevel) * 100, 100);
    //const currentAvatar = stats.avatarItemId || 'Sakura';
    //const portraitSource = characterImages[currentAvatar] || characterImages['Sakura'];
    //const currentBackground = stats?.backgroundName || 'Default';
    //const bgSource = backgroundImages[currentBackground] || backgroundImages['Default'];
    const bgSource = backgroundImages['Default'];
    const portraitSource = characterImages['Sakura'];
    return (
        <div className="dashboard-wrapper" style={{ 
                backgroundImage: `url(${bgSource})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat' 
            }}>

            <div className="dashboard-layout-column">
                
                <button onClick={onBackToMenu} className="back-to-menu-btn">Back</button>
                
                <div className="dashboard-cards-row">
                    
                    <div className="dashboard-card">

                        {/* Left site Character Portrait */}
                        <div className="character-portrait-section">
                            <div className="portrait-placeholder">
                                <img className="portrait-img" src={portraitSource} alt="Character Portrait" />
                            </div>
                            <div className="character-name-badge">
                                {stats.username} 
                            </div>
                        </div>

                        {/* Right side: STATS */}
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

                            <div className="stats-and-equip-grid">
                                <div className="stat-column">
                                    <div className="stat-box vital-box">
                                        <p ><img className="stat-icon" src={Heart} alt="Health" /> Health: <span> {stats.currentHP} / {stats.maxHP}</span></p>
                                        <p><img className="stat-icon" src={Primogem} alt="Primogem" /> Gems: <span>{stats.currency}</span></p>
                                    </div>
                                    
                                    <div className="stat-box attributes-box">
                                        <p><img className="stat-icon" src={Strengthicon} alt="Strength" /> Strength (STR): <span>{stats.str}</span></p>
                                        <p><img className="stat-icon" src={Intelligenceicon} alt="Intelligence" /> Intelligence (INT): <span>{stats.int}</span></p>
                                        <p><img className="stat-icon" src={Defenseicon} alt="Defense" /> Defense (DEF): <span>{stats.def}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> 

                    <div className="dashboard-card-weapons">
                        <div className="equip-column">
                            <div className="equip-slot-box">
                                <h4>Weapon</h4>
                                <div className="weapon-placeholder">
                                    <span className="empty-slot-icon">🗡️</span>
                                    <p>No Weapon</p>
                                    <small>(Still in progress...)</small>
                                </div>
                            </div>
                        </div>
                    </div> 

                </div> 

            </div>
        </div>
    );

}
export default Dashboard;