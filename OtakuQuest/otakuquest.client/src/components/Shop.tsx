import type { PlayerStatsDto } from "../api/generated/models/PlayerStatsDto";

import { AllAssets, AvatarAssets, BackgroundAssets, WeaponAssets } from '../assets';

import './Shop.css';
import { useState, useEffect } from "react";
import { ApiError, ItemService, type Item } from "../api/generated";

interface ShopProps {
    onBackToMenu: () => void;
    stats: PlayerStatsDto | null;
    refreshStats: () => void;  
}




const Shop: React.FC<ShopProps> = ({ onBackToMenu, stats, refreshStats }) => {

    const [items, setItems] = useState<Item[]>([]);
    const [inventory, setInventory] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<number>(1); // 1 = Avatar/Character Images, 2 = Backgrounds, 3 = Weapons
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);
    const [isSilentLoading, setIsSilentLoading] = useState(false);

    const fetchShopData = async () => {
        try {
            if(isSilentLoading) {
                setLoading(false);
            }else {
                setLoading(true);
            }
            const shopItems = await ItemService.getApiItemShop();
            const playerInventory = await ItemService.getApiItemInventory();
            setItems(shopItems);
            setInventory(playerInventory);
        }
        catch (error) {
            console.error("Failed to fetch shop data:", error);
        }
        finally {
            setIsSilentLoading(false);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShopData();
    }, []);


    const handleBuyItem = async (item: Item) => {
        setLoading(false);
        setMessage(null);
        if (stats!.currency < item.price) {
            setMessage({ text: "Nincs elég Gemed ehhez a tárgyhoz!", type: 'error' });
            return;
        }

        try {
            await ItemService.postApiItemBuy({ itemId: item.id });
            
            setMessage({ text: `Sikeresen megvásároltad: ${item.name}!`, type: 'success' });
            setIsSilentLoading(true);
            fetchShopData();
            refreshStats();
        } catch (error) {
            const apiError = error as ApiError;
            setMessage(apiError.body?.message || 'Something went wrong during purchase.');
        }
    };

    const isOwned = (itemId: number) => {
        return inventory.some(invItem => invItem.id === itemId);
    };

    const filteredItems = items.filter(item => item.type === activeTab);

    if (loading) return <div className="shop-loading">Shop Loading...</div>;

    if (!stats) return <div>No player stats available.</div>;

    return (
        <div className="shop-wrapper" style={{ backgroundImage: `url(${BackgroundAssets[stats!.backgroundImage || 'Default']})` }}>
            <div className="shop-container">
                
                {/* Topbar  */}
                <div className="shop-header">
                    <button onClick={onBackToMenu} className="back-btn">⬅ Back</button>
                    <h1 className="shop-title">SHOP</h1>
                    <div className="shop-currency">
                        <img src={AllAssets['Primogem']} alt="Gem" className="gem-icon" />
                        <span>{stats.currency}</span>
                    </div>
                </div>

                {/* Tabs */}
                <div className="shop-tabs">
                    <button 
                        className={`tab-btn ${activeTab === 1 ? 'active' : ''}`}
                        onClick={() => setActiveTab(1)} // 1 = Avatar/Character Images
                    >
                        CHARACTER
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 2 ? 'active' : ''}`}
                        onClick={() => setActiveTab(2)} // 2 = Backgrounds
                    >
                        BACKGROUND
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 0 ? 'active' : ''}`}
                        onClick={() => setActiveTab(0)} // 0  = Weapons 
                    >
                        WEAPON
                    </button>
                </div>

                {message && (
                    <div className={`shop-message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                {/* Product Grid  */}
                <div className="shop-grid">
                    {filteredItems.length === 0 ? (
                        <p className="empty-shop">There are no items available in this category.</p>
                    ) : (
                        filteredItems.map(item => {
                            const owned = isOwned(item.id);
                            const avatarImageSrc = AvatarAssets[item.imageAsset] || AvatarAssets['Default'];
                            const backgroundImageSrc = BackgroundAssets[item.imageAsset] || BackgroundAssets['Default'];
                            const weaponImageSrc = WeaponAssets[item.imageAsset] || WeaponAssets['Default'];
                            return (
                                <div key={item.id} className={`shop-card ${owned ? 'owned' : ''}`}>
                                    <h3 className="item-name">{item.name}</h3>
                                    <div className="item-image-container">
                                        <img src={activeTab === 1 ? avatarImageSrc : 
                                            activeTab === 2 ? backgroundImageSrc : weaponImageSrc} 
                                            alt={item.name} className="item-image" />
                                    </div>
                                    <p className="item-desc">{item.description}</p>
                                    
                                    <div className="item-footer">
                                        {owned ? (
                                            <button className="buy-btn owned-btn" disabled>
                                                Already Owned
                                            </button>
                                        ) : (
                                            <button 
                                                className={`buy-btn ${stats.currency < item.price ? 'disabled' : ''}`}
                                                onClick={() => handleBuyItem(item)}
                                                disabled={stats.currency < item.price}
                                            >
                                                {item.price} Gem
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

            </div>
        </div>
    );
};

export default Shop;
