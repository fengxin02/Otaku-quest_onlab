
import './MainMenu.css';

import { AvatarAssets, BackgroundAssets } from '../assets';

import QuestBoard from './QuestBoard';
import { useState } from 'react';
import type { PlayerStatsDto } from '../api/generated';
interface MainMenuProps {
    onNavigate: (screen: string) => void;
    stats: PlayerStatsDto | null;
    loading: boolean;
    refreshStats: () => void;

}





const MainMenu: React.FC<MainMenuProps> = ({ onNavigate,  stats, loading, refreshStats }) => {
    const [showCompletedQuests, setShowCompletedQuests] = useState(false);


    if (loading) return <div className="mainmenu-loading">Challenges Loading...</div>;
    if (!stats) return <div>No player stats available.</div>;


    const xpNeededForNextLevel = stats.level * 100;
    const currentXp = stats.xp;
    const xpPercentage = Math.min((currentXp / xpNeededForNextLevel) * 100, 100);

    const portraitSource = AvatarAssets[stats.avatarImage || 'Default'];
    const bgSource = BackgroundAssets[stats.backgroundImage || 'Default'];
    return (
        <div className="mainmenu-wrapper" style={{
            backgroundImage: `url(${bgSource})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
        }}>
            
            <div className="mainmenu-topbar">
                <button className="shop-btn" onClick={() => onNavigate('shop')}>
                    Shop
                </button>
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
                
                <img className="character-avatar" src={portraitSource} alt="Character" onClick={()=> onNavigate('character')}/>
            </div>

            {/* --- Bottom: The Big TODO List Card --- */}
            <div className="mainmenu-todo-section">
                <div className="todo-header">
                    <h3>{showCompletedQuests ? 'Completed' : 'Active'} Quests</h3>
                    <button className="completed-quest-btn" onClick={() => setShowCompletedQuests(!showCompletedQuests)}>
                        {showCompletedQuests ? 'Hide Completed Quests' : 'Show Completed Quests'}
                    </button>
                </div>
                <QuestBoard refreshStats={refreshStats} showCompletedTasks={showCompletedQuests}/>

            </div>

        </div>
    );
};



export default MainMenu;