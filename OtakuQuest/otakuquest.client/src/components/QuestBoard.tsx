import React, { useState, useEffect } from 'react';
import { TodoService, type TodoTask } from '../api/generated'; 
import './QuestBoard.css';

interface QuestBoardProps {
    refreshStats: () => void;
    showCompletedTasks: boolean
}


 const borderLeftColor: Record<number, string> = {
    0: "#3b82f6",
    1: "#10b981",
    2: "#f59e0b",
    3: "#8b5cf6",
    4: "#000000",
    5: "#ef4444"

};
const QuestBoard: React.FC<QuestBoardProps> = ({ refreshStats, showCompletedTasks }) => {
    const [quests, setQuests] = useState<TodoTask[]>([]);

    const [loading, setLoading] = useState(true);
    const [expandedQuestId, setExpandedQuestId] = useState<number | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<number>(0);
    const [difficultyRank, setDifficultyRank] = useState<number>(0);


    const fetchQuests = async () => {
        try {
            const response = await TodoService.getApiTodo(); 
            setQuests(response);
        } catch (error) {
            console.error("Can't fetch quests", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuests();
    }, []);

    const handleCreateQuest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) 
        {
            return;
        }

        try {
            await TodoService.postApiTodo({
                title: newTaskTitle,
                description: description,
                type: type,
                difficultyRank: difficultyRank
            });
            
            setNewTaskTitle(''); 
            setDescription('');
            setType(0);
            setDifficultyRank(0);
            setIsAdding(false);  
            fetchQuests();       // fetching the quests again to show the new one
        } catch (error) {
            console.error("Problem creating quest", error);
        }
    };

    const handleCompleteQuest = async (id: number) => {
        try {
            await TodoService.postApiTodoComplete(id); 
            
            fetchQuests();  
            refreshStats(); // refresh the stats to reflect the completed quest's rewards
        } catch (error) {
            console.error("Problem completing quest", error);
        }
    };

    const toggleQuestDetails = (id: number) => {
        if(expandedQuestId === id) {
            setExpandedQuestId(null);
        }else {
            setExpandedQuestId(id);
        }
    }
    //convert type number to string for display
    const getTaskTypeName = (typeNum: number) => {
        const types = ['Study', 'Workout', 'Hobby', 'Social', 'Health'];
        return types[typeNum] || 'Unknown';
    }
    //convert difficulty rank number to string for display
    const getDifficultyName = (rankNum: number) => {
        const ranks = ['E Rank', 'D Rank', 'C Rank', 'B Rank', 'A Rank', 'S Rank'];
        return ranks[rankNum] || 'Unknown';
    }

    if (loading) return <div className="quest-loading">Searching for quests... </div>;

    return (
        <div className="quest-board-container">
            
            <div className="quest-list">
                {quests.length === 0 ? (
                    <p className="no-quests-msg">No active quests available. Create one!</p>
                ) : (
                    quests.map((quest) => (
                        (showCompletedTasks ? quest.status === 2 : quest.status === 1) && (
                            <React.Fragment key={quest.id}>
                            <div  
                            className={`quest-card ${expandedQuestId === quest.id ? 'expanded' : ''}`} 
                            style ={{borderLeft: `6px solid ${borderLeftColor[quest.difficultyRank]}`}}

                            onClick={() => toggleQuestDetails(quest.id)}>
                                <h4 className="quest-title">{quest.title}</h4>
                                {showCompletedTasks ? <span></span> :
                                <button 
                                    className="complete-quest-btn" 
                                    onClick={(e) =>{
                                        e.stopPropagation(); 
                                        handleCompleteQuest(quest.id);}}
                                >
                                    ✓ Complete
                                </button>
                                }
                            </div>
                            {expandedQuestId === quest.id && (
                                    <div className="quest-details">
                                        <p><strong>Description:</strong> {quest.description || ''}</p>
                                        <div className="quest-meta">
                                            <span className="quest-badge">Type: {getTaskTypeName(quest.type)}</span>
                                            <span className="quest-badge">Difficulty: {getDifficultyName(quest.difficultyRank)}</span>
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                    )
                        
                    ))
                )}
            </div>

            {isAdding ? (
                <form className="add-quest-form" onSubmit={handleCreateQuest}>
                    <label className='input-label'>Title</label>
                    <input 
                        type="text" 
                        className="add-quest-input"
                        placeholder="What is your new Challenge? ( >д<) "
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        autoFocus
                        required
                    />
                    <div className="input-group">
                        <label className="input-label">Description</label>
                        <textarea 

                            className="add-quest-input textarea"
                            placeholder="Give me those deetailsssss!"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="select-row">
                        <div className="input-group">
                            <label className="input-label">Type</label>
                            <select 
                                className="add-quest-select"
                                value={type}
                                onChange={(e) => setType(Number(e.target.value))}
                            >
                                <option value={0}>Study</option>
                                <option value={1}>Workout</option>
                                <option value={2}>Hobby</option>
                                <option value={3}>Social</option>
                                <option value={4}>Health</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label className="input-label">Difficulty</label>
                            <select 
                                className="add-quest-select"
                                value={difficultyRank}
                                onChange={(e) => setDifficultyRank(Number(e.target.value))}
                            >
                                <option value={0}>E Rank</option>
                                <option value={1}>D Rank</option>
                                <option value={2}>C Rank</option>
                                <option value={3}>B Rank</option>
                                <option value={4}>A Rank</option>
                                <option value={5}>S Rank</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-buttons">
                        <button type="submit" className="save-quest-btn">Save</button>
                        <button type="button" className="cancel-quest-btn" onClick={() => setIsAdding(false)}>Cancel</button>
                    </div>
                </form>
            ) : (
                <button className="add-todo-btn" onClick={() => setIsAdding(true)}>
                    + Add New Quest
                </button>
            )}
            
        </div>
    );
};

export default QuestBoard;