import './DashboardBarra.css';

function DashboardBarra({title, label, percentage}) {
        return (
        <div className='progess-container'>
            <div className='progress-labels'>
                <span>{title}</span>
                <span>{label}</span>
            </div>
                <div className='progress-bar-background'>
                    <div
                    className='progress-bar-filled'
                    style={{width: `${percentage}%`}}
                    >
                    </div>
                </div>
            </div>
    )
}

export default DashboardBarra;