import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface MarqueeProps {
    items: IconDefinition[];
    leftToRight?: boolean;
}

// Reference: https://codepen.io/olavih/pen/rNWGPda
function Marquee(marqueeProps: MarqueeProps) {
    const { items } = marqueeProps;
    const { leftToRight } = marqueeProps;
    const marqueeClass = leftToRight ? 'marqueeLeftToRight' : 'marquee';
    const marqueeClass2 = leftToRight ? 'marqueeLeftToRight2' : 'marquee2';

    return (
        <article className="overflow-hidden whitespace-nowrap w-full flex">
            <div className="relative">
                <ul className={ `${marqueeClass} flex list-none pl-0 text-center` }>
                    { 
                        items.map((item, index) => (
                            <li key={index} className="p-5">
                                <FontAwesomeIcon icon={item} />
                            </li>
                        ))
                    }
                </ul>
                <ul className={`${marqueeClass2} absolute top-0 flex list-none pl-0 text-center`} aria-hidden="true">
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
