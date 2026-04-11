
import {  ItemService, type Item, type PlayerStatsDto } from '../api/generated';
import './Dashboard.css';


import { AllAssets, AvatarAssets, BackgroundAssets } from '../assets';
import { useState } from 'react';
import ItemDetailsModal from './ItemDetailsModal';


interface DashboardProps {
    onLogout: () => void;
    onBackToMenu: () => void;
    stats: PlayerStatsDto | null;
    refreshStats: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, onBackToMenu, stats , refreshStats}) => {
    const [showEquipModal, setShowEquipModal] = useState(false);
    const [equipType, setEquipType] = useState<number>(1); // 1 = Character/Avatar, 2 = Background
    const [myItems, setMyItems] = useState<Item[]>([]);
    const [inspectEquipItem, setInspectEquipItem] = useState<Item | null>(null);

    const handleOpenModal = async (type: number) => {
        setEquipType(type);
        setShowEquipModal(true);
        try {
            const inventory = await ItemService.getApiItemInventory();
            setMyItems(inventory.filter((item: Item) => item.type === type));
        } catch (error) {
            console.error("Error to reach the inventory:", error);
        }
    };

    const handleEquip = async (itemId: number) => {
        try {
            await ItemService.postApiItemEquip({ itemId });
            setShowEquipModal(false);
            refreshStats();
        } catch (error) {
            console.error("Error to equip item:", error);
        }
    };




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
    //const bgSource = backgroundImages['Default'];
    //const portraitSource = characterImages['Sakura'];
    return (
        <div className="dashboard-wrapper" style={{ 
                backgroundImage: `url(${BackgroundAssets[stats.backgroundImage || 'DefaultBackground']})`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat' 
            }}>
                
          
            <div className="dashboard-layout-column">
                <div className="dashboard-topbar">
                    
                    <button onClick={onBackToMenu} className="back-to-menu-btn">Back</button>
                    <button className="equip-btn" onClick={() => handleOpenModal(1)}>
                        Character
                    </button>
                    <button className="equip-btn" onClick={() => handleOpenModal(2)}>
                        Background
                    </button>
                    <button className="equip-btn" onClick={() => handleOpenModal(0)}>
                        Weapon
                    </button>
                </div>
                
                <div className="dashboard-cards-row">
                    
                    <div className="dashboard-card">

                        {/* Left site Character Portrait */}
                        <div className="character-portrait-section">
                            <div className="portrait-placeholder">
                                <img className="portrait-img" src={AvatarAssets[stats.avatarImage || 'DefaultAvatar']} 
                                alt="Character Portrait"
                                onClick={() => handleOpenModal(1)} />
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
                                        <p ><img className="stat-icon" src={AllAssets['Heart']} alt="Health" /> Health: <span> {stats.currentHP} / {stats.maxHP}</span></p>
                                        <p><img className="stat-icon" src={AllAssets['Primogem']} alt="Primogem" /> Gems: <span>{stats.currency}</span></p>
                                    </div>
                                    
                                    <div className="stat-box attributes-box">
                                        <p><img className="stat-icon" src={AllAssets['Strength']} alt="Strength" /> Strength (STR): <span>{stats.str}</span></p>
                                        <p><img className="stat-icon" src={AllAssets['Intelligence']} alt="Intelligence" /> Intelligence (INT): <span>{stats.int}</span></p>
                                        <p><img className="stat-icon" src={AllAssets['Defense']} alt="Defense" /> Defense (DEF): <span>{stats.def}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div> 
            
                    <div className="dashboard-card-weapons">
                        <div className="equip-column">
                            <div className="equip-slot-box">
                                <h4>Weapon</h4>
                                <div className="weapon-placeholder" onClick={() => handleOpenModal(0)}>
                                    
                                    {stats.weaponImage ? (
                                        <>
                                            <img 
                                                src={AllAssets[stats.weaponImage] } 
                                                className="equipped-weapon-img"
                                            />
                                            <p>{stats.weaponName}</p>
                                        </>
                                    ) : (
                                        <>
                                            <span className="empty-slot-icon">🗡️</span>
                                            <p>No Weapon</p>
                                            <small>(Click to equip)</small>
                                        </>
                                    )}
                                    
                                </div>
                            </div>
                        </div>
                    </div> 

                </div> 

            </div>
            {showEquipModal && (
                <div className="equip-modal-overlay">
                    <div className="equip-modal">
                        <h2>Select your {equipType === 1 ? 'Character' : (equipType === 0 ? 'Weapon' : 'Background')}</h2>
                        <button className="close-modal-btn" onClick={() => setShowEquipModal(false)}>✖</button>
                        
                        <div className="equip-grid">
                            {myItems.length === 0 ? (
                                <p>No items available.</p>
                            ) : (
                                myItems.map(item => (
                                    <div key={item.id} className="equip-item-card">

                                        <img src={AllAssets[item.imageAsset]} alt={item.name} 
                                        onClick={() => setInspectEquipItem(item)} />
                                        <p>{item.name}</p>
                                        <button  onClick={() => handleEquip(item.id)}>
                                            Choose
                                        </button>
                                        <button  onClick={() => setInspectEquipItem(item)}>
                                            Details
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
            {inspectEquipItem && (
                <ItemDetailsModal 
                    item={inspectEquipItem}
                    onClose={() => setInspectEquipItem(null)}
                    onAction={() => {
                        handleEquip(inspectEquipItem.id);
                        setInspectEquipItem(null);
                    }}
                    actionText="Equip"
                />
            )}
        </div>

    );

}
export default Dashboard;