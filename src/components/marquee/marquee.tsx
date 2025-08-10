import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface MarqueeProps {
    items: IconDefinition[];
}

// Reference: https://codepen.io/olavih/pen/rNWGPda
function Marquee(marqueeProps: MarqueeProps) {
    const { items } = marqueeProps;

    return (
        <article className="overflow-hidden whitespace-nowrap w-full flex">
            <div className="relative">
                <ul className={ `marquee flex list-none pl-0 text-center` }>
                    { 
                        items.map((item, index) => (
                            <li key={index} className="p-5">
                                <FontAwesomeIcon icon={item} />
                            </li>
                        ))
                    }
                </ul>
                <ul className={`marquee2 absolute top-0 flex list-none pl-0 text-center`} aria-hidden="true">
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
