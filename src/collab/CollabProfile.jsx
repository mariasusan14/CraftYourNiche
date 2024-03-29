import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
function CollabProfile() {
  return (
    <div>
        CollabProfile
        <Link to="/collabdash" style={{textDecoration: 'none', color: 'white'}}>
        <FaArrowLeft/>
        </Link>
    </div>
  )
}

export default CollabProfile