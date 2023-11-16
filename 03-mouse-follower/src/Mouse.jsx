import './Mouse.css'

export function Mouse({position}) {

    return (
        <div className="ball" style={{ transform: `translate(${position.x}px, ${position.y}px)` }}></div>
    )

}