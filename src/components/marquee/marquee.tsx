"use client";
import './marquee.css';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export interface MarqueeProps {
    items: IconDefinition[];
    leftToRight?: boolean;
    styles?: string;
}

// Reference: https://codepen.io/olavih/pen/rNWGPda
function Marquee(marqueeProps: MarqueeProps) {
    const { items, leftToRight, styles = '' } = marqueeProps;
    const marqueeClass = leftToRight ? 'marqueeLeftToRight' : 'marquee';
    const marqueeClass2 = leftToRight ? 'marqueeLeftToRight2' : 'marquee2';

    const [isHovered, setIsHovered] = useState(false);

    return (
        <article className={`overflow-hidden whitespace-nowrap w-full flex ${styles}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} >
            <div className="relative">
                <ul className={ `${marqueeClass} flex list-none pl-0 text-center ${ isHovered ? 'paused' : '' }` }>
                    { 
                        items.map((item, index) => (
                            <li key={index} className="p-5">
                                <FontAwesomeIcon icon={item} />
                            </li>
                        ))
                    }
                </ul>
                <ul className={`${marqueeClass2} absolute top-0 flex list-none pl-0 text-center ${ isHovered ? 'paused' : '' }`} aria-hidden="true">
                    { 
                        items.map((item, index) => (
                            <li key={index} className="p-5">
                                <FontAwesomeIcon icon={item} />
                            </li>
                        ))
                    }
                </ul>
            </div>
        </article>
    )
}

export default Marquee;
