
import SakuraImage from '../assets/Sakura.png';
import DefaultImage from '../assets/Default.png';
import TogawaSakikoImage from '../assets/Togawa_Sakiko.png';
import DefaultBackground from '../assets/DefaultBackground.png';
import Primogem from '../assets/primogem.png';
import Luluka from '../assets/Luluka.png';
import CyberPunkBackground from '../assets/CyberpunkBackground.png';
import Carlotta from '../assets/Carlotta.png';
import Heart from '../assets/heart.png';
import Strengthicon from '../assets/strength.png';
import Defenseicon from '../assets/DoranShield.png';
import Intelligenceicon from '../assets/eldenring.png';
import DiaSword from '../assets/Diamond_Sword.png';
import Katana from '../assets/Katana.png';

export const AvatarAssets: Record<string, string> = {
    'DefaultAvatar': DefaultImage,
    'Sakura': SakuraImage,
    'Saki': TogawaSakikoImage,
    'Luluka': Luluka,
    'Carlotta': Carlotta,
};

export const BackgroundAssets: Record<string, string> = {
    'DefaultBackground': DefaultBackground,
    'CyberPunk': CyberPunkBackground,
};

export const WeaponAssets: Record<string, string> = {
    'DiaSword': DiaSword,
    'Katana': Katana,

};
    
export const AllAssets: Record<string, string> = {
    ...AvatarAssets,
    ...BackgroundAssets,
    ...WeaponAssets,
    'Primogem': Primogem,
    'Heart': Heart,
    'Strength': Strengthicon,
    'Defense': Defenseicon,
    'Intelligence': Intelligenceicon,
};