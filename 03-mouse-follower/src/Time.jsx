import './Time.css'

export function Time({time, record}) {

    return (
        <div className="time">
            <span>{time}</span>
            <span>{record}</span>
        </div>
    );

}