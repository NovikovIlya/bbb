import React from 'react';
import {blue1f5} from "../../utils/color";

type TypeMenuSvgProps = {
    white?: boolean
}
export const ArrowLeftBackInOldAccount = ({white}: TypeMenuSvgProps) => {
    const color = () => (white ? 'white' : blue1f5)


    return (
        <svg width="18" height="8" viewBox="0 0 18 8" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M17 4.5C17.2761 4.5 17.5 4.27614 17.5 4C17.5 3.72386 17.2761 3.5 17 3.5V4.5ZM0.646447 3.64645C0.451184 3.84171 0.451184 4.15829 0.646447 4.35355L3.82843 7.53553C4.02369 7.7308 4.34027 7.7308 4.53553 7.53553C4.7308 7.34027 4.7308 7.02369 4.53553 6.82843L1.70711 4L4.53553 1.17157C4.7308 0.976311 4.7308 0.659728 4.53553 0.464466C4.34027 0.269204 4.02369 0.269204 3.82843 0.464466L0.646447 3.64645ZM17 3.5H1V4.5H17V3.5Z"
                fill={color()}/>
        </svg>

    );
};

