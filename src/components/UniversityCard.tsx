import React from 'react'
import { Link } from 'react-router-dom'
import { University } from '../types/types'


  function UniversityCard({uniInfo}: {uniInfo: University}) {
    
  return (
    <div>
        {
          <Link to={`/university/${uniInfo.uni_name.replace(/ /g, '_')}`} >
            <div 
              className="university"
            >
              <img
                src={ `uni_logo/${uniInfo.uni_id}.png`}
                alt={`${uniInfo.uni_name} logo`}
                className="logo_img"
              />
                <span className="university__link">{uniInfo.uni_name}</span>
            </div>
          </Link>
          }
    </div>
  )
}

export default UniversityCard