import React from 'react'
import "../styles/CourseMiniCard.css"
import { Science } from '@mui/icons-material'
const CourseMiniCard = ({name}) => {
    return (
        <div className='miniCard'>
            <div className="flexBox">
                <Science />
            </div>
            <div className="display-flex-col">
                <p className="font-subHeading">{name}</p>
                <p className="font-small font-grey">Lorem ipsum dolor sit.</p>
            </div>
        </div>
    )
}

export default CourseMiniCard
