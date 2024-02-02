import {Link} from 'react-router-dom'
import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons//md'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <li className="list-item">
      <Link to={`/jobs/${id}`} className="link">
        <div className="job-item">
          <div className="company-name-and-logo">
            <img
              className="company-logo"
              src={companyLogoUrl}
              alt="job details company logo"
            />
            <div className="title-container">
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <BsStarFill className="star" />
                <p>{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-salary-container">
            <div className="l-div">
              <div className="location-container">
                <MdLocationOn className="icon" />
                <p>{location}</p>
              </div>
              <div className="location-container">
                <BsBriefcaseFill className="icon" />
                <p>{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="hr" />
          <h1 className="description-heading">Description</h1>
          <p className="description-text">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobItem
