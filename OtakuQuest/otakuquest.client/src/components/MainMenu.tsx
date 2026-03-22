
import './MainMenu.css';

import SakuraImage from '../assets/Sakura.png';
import DefaultImage from '../assets/Default.png';
import TogawaSakikoImage from '../assets/Togawa_Sakiko.png';
import DefaultBackground from '../assets/DefaultBackground.png';
interface MainMenuProps {
    onNavigate: (screen: string) => void;
    stats: any;
    loading: boolean;

}

const characterImages: Record<string, string> = {
    'Sakura': SakuraImage,
    'Default': DefaultImage,
    'Saki': TogawaSakikoImage,
};

const backgroundImages: Record<string, string> = {
    'Default': DefaultBackground,
};

const MainMenu: React.FC<MainMenuProps> = ({ onNavigate,  stats, loading }) => {



    if (loading) return <div className="mainmenu-loading">Challenges Loading...</div>;
    if (!stats) return null;


    const xpNeededForNextLevel = stats.level * 100;
    const currentXp = stats.xp;
    const xpPercentage = Math.min((currentXp / xpNeededForNextLevel) * 100, 100);

    const bgSource = backgroundImages['Default'];
    const portraitSource = characterImages['Saki'];

    return (
        <div className="mainmenu-wrapper" style={{
            backgroundImage: `url(${bgSource})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            
            <div className="mainmenu-topbar">
                <button className="profile-btn" onClick={() => onNavigate('character')}>
                    {stats.username}
                </button>
            </div>

            {/* --- Middle: LEVEL, XP, Character Image --- */}
            <div className="mainmenu-character">
                <h2 className="character-level">Level {stats.level}</h2>
                
                <div className="character-xp-container">
                    <div className="character-xp-text">Experience: {currentXp} / {xpNeededForNextLevel} XP</div>
                    <div className="character-xp-bg">
                        <div className="character-xp-fill" style={{ width: `${xpPercentage}%` }}></div>
                    </div>
                </div>
                
                {/* A Karakter képe kör alakban kivágva */}
                <img className="character-avatar" src={portraitSource} alt="Character" onClick={()=> onNavigate('character')}/>
            </div>

            {/* --- Bottom: The Big TODO List Card --- */}
            <div className="mainmenu-todo-section">
                <div className="todo-header">
                    <h3>📜 Quest Board (Todo List)</h3>
                </div>
                
                <div className="todo-list-placeholder">
                    <p>No active quests available.</p>
                </div>

                <button className="add-todo-btn">+ Add New Quest</button>
            </div>

        </div>
    );
};



export default MainMenu;