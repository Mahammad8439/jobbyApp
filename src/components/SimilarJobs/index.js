import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const SimilarJobs = props => {
  const {similarData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarData

  return (
    <li className="similar-card-item">
      <div className="company-name-and-logo">
        <img
          className="company-logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="title-container">
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <BsStarFill className="star" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <h1>Description</h1>
      <p>{jobDescription}</p>
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
    </li>
  )
}
export default SimilarJobs
