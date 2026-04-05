import React from 'react';
import './ItemDetailsModal.css';
import type { Item } from '../api/generated';
import { AllAssets } from '../assets';

interface ItemDetailsModalProps {
    item: Item;
    onClose: () => void;
    onAction?: () => void;       
    actionText?: string;         
    actionDisabled?: boolean;
}

const ItemDetailsModal: React.FC<ItemDetailsModalProps> = ({ item, onClose, onAction, actionText, actionDisabled }) => {
    if (!item) return null;

    // Only render stats that are relevant (non-zero bonus or multiplier different from 1)
    const renderStat = (label: string, bonus: number, multiplier: number) => {
        if (bonus === 0 && multiplier === 1) return null;
        return (
            <div className="stat-row">
                <span className="stat-label">{label}:</span>
                <span className="stat-value">
                    {bonus > 0 ? `+${bonus} ` : (bonus < 0 ? `${bonus} ` : '')}
                    {multiplier !== 1 ? `(x${multiplier})` : ''}
                </span>
            </div>
        );
    };

    // Check if the item has any stats to display
    const hasStats = item.hpBonus > 0 || item.strBonus > 0 || item.intBonus > 0 || item.defBonus > 0 || 
                     item.hpMultiplier !== 1 || item.strMultiplier !== 1 || item.intMultiplier !== 1 || item.defMultiplier !== 1;

    return (
        <div className="item-modal-overlay" onClick={onClose}>
            <div className="item-modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>✖</button>
                
                <h2 className="item-modal-title">{item.name}</h2>
                
                <div className="item-modal-image-container">
                    <img src={AllAssets[item.imageAsset]} alt={item.name} />
                </div>
                
                <p className="item-modal-desc">{item.description}</p>
                
                <div className="item-modal-stats">
                    <h3>Bonus:</h3>
                    {hasStats ? (
                        <>
                            {renderStat("HP", item.hpBonus, item.hpMultiplier)}
                            {renderStat("STR", item.strBonus, item.strMultiplier)}
                            {renderStat("INT", item.intBonus, item.intMultiplier)}
                            {renderStat("DEF", item.defBonus, item.defMultiplier)}
                        </>
                    ) : (
                        <p className="no-stats">No stats on this Item</p>
                    )}
                </div>

                {onAction && actionText && (
                    <button 
                        className={`item-action-btn ${actionDisabled ? 'disabled' : ''}`}
                        onClick={onAction}
                        disabled={actionDisabled}
                    >
                        {actionText}
                    </button>
                )}
            </div>
        </div>
    );
};

export default ItemDetailsModal;