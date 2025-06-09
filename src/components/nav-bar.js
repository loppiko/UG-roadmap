import React from 'react'

// React Router
import { Outlet, Link, useLocation, useParams } from 'react-router-dom'
import BackArrow from './../media/icons/semester/back-arrow.svg'
import { AVAILABLE_SEMESTERS } from '../internal/types/subject'
import ROUTES from '../internal/consts/routes'

/**
 * @returns {JSX.Element}
 */

function NavBar () {
  const { semesterId } = useParams()

  const countSemesters = AVAILABLE_SEMESTERS.length
  const currLocation = useLocation().pathname
  const newLocation = (currLocation === ROUTES.ROADMAP_ENTER_SEMESTER) ? ROUTES.ROOT : ROUTES.ROADMAP_ENTER

  const nextSem = () => {
    if (semesterId) {
      const res = Number(semesterId)
      if (Number.isNaN(res)) console.error('Semester ID is not a number. Got: ', semesterId)
      if (res + 1 <= countSemesters) return `/roadmap-enter/semester/${res + 1}`
    } return currLocation
  }

  return (
        <div className="nav-bar">
            <div className="nav-bar-left-side">
                { semesterId && <Link to={ newLocation } className="previous-site-button">
                    <img src={BackArrow} alt="back-arrow" className="nav-bar-back-arror"/>
                </Link> }
                <Link to={ROUTES.ROOT} className="main-page-button">Main page</Link>
            </div>
            <div className="nav-bar-right-side">
                {semesterId && <Link to={ nextSem() } className="next-site-button">Next</Link>}
            </div>
            <Outlet/>
        </div>
  )
}

export default NavBar
