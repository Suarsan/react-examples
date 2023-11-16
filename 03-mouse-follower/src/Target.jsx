import './Target.css'

export function Target({position, size}) {
    return (
        <div className="target" style={{ 
            transform: `translate(
                ${ position.x }px, 
                ${ position.y }px
            )`, 
            width: `${ size.width }px`,
            height: `${ size.height }px`
        }}></div>
    )
}