import { useState } from 'react';

export function TwitterFollowCard ({ userName, name }) {

    const [isFollowing, setIsFollowing] = useState(false);
    const text = isFollowing ? 'Siguiendo' : 'Seguir';
    const buttonClassName = isFollowing ? 'ss-twitter-followcard-button' : '';
    const handleClick = () => {
        setIsFollowing(!isFollowing)
    }
    return (
        <article className="ss-twitter-followcard">
            <header>
                <img src={ `https://unavatar.io/${userName}` } alt="" />
                <div>
                    <strong>{ name }</strong>
                    <span>{ `@${userName}` }</span>
                </div>
            </header>
            <aside>
                <button onClick={handleClick} className={buttonClassName}>{text}</button>
            </aside>
        </article>
    )
}