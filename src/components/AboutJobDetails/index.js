import {BsStarFill, BsBriefcaseFill} from 'react-icons/bs'
import {HiExternalLink} from 'react-icons/hi'
import {MdLocationOn} from 'react-icons//md'

import './index.css'

const AboutJobDetails = props => {
  const {skills, jobDetails, lifeAtCompany} = props
  const {
    companyLogoUrl,
    location,
    packageParAnnum,
    rating,
    title,
    jobDescription,
    employmentType,
    companyWebsiteUrl,
  } = jobDetails

  return (
    <div className="job-details-card-container">
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
          <p className="package">{packageParAnnum}</p>
        </div>
        <hr className="hr" />
        <div className="description-cont">
          <h1 className="description-heading">Description</h1>
          <a href={companyWebsiteUrl}>
            Visit <HiExternalLink />
          </a>
        </div>
        <p className="description-text">{jobDescription}</p>
        <h1 className="skills-heading">Skills</h1>
        <ul className="skill-list-container">
          {skills.map(each => (
            <li className="skill-item-container">
              <img
                src={each.imageUrl}
                alt={each.name}
                key={each.id}
                className="skill-img"
              />
              <p>{each.name}</p>
            </li>
          ))}
        </ul>
        <h1 className="life-at-company-heading">Life At Company</h1>
        <div className="life-at-company-text">
          <p className="life-describe">{lifeAtCompany.description}</p>
          <img
            src={lifeAtCompany.imageUrl}
            alt="life at company"
            className="company-image"
          />
        </div>
      </div>
    </div>
  )
}
export default AboutJobDetails
