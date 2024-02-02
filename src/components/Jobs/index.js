import {Component} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    apiStatus: 'INITIAL',
    profileData: {},
    apiJobStatus: 'INITIAL',
    search: '',
    jobsData: [],
    activeJobType: [],
    salaryRange: '',
  }

  componentDidMount = () => {
    this.getProfileProfile()
    this.getJobsData()
  }

  getJobsData = async () => {
    this.setState({apiJobStatus: 'INPROGRESS'})
    const jwtToken = Cookies.get('jwt_token')
    const {search, activeJobType, salaryRange} = this.state

    const type = activeJobType.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${type}&minimum_package=${salaryRange}&search=${search}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const jobResponse = await fetch(url, options)
    const jobDataR = await jobResponse.json()
    if (jobResponse.ok === true) {
      const {jobs} = jobDataR
      const changeKeyJobs = jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      this.setState({jobsData: changeKeyJobs, apiJobStatus: 'SUCCESS'})
    } else {
      this.setState({apiJobStatus: 'FAILURE'})
    }
  }

  getProfileProfile = async () => {
    this.setState({apiStatus: 'INPROGRESS'})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const profileResponse = await fetch('https://apis.ccbp.in/profile', options)
    const profileDataR = await profileResponse.json()

    if (profileResponse.ok === true) {
      const profileDetailsR = {
        name: profileDataR.profile_details.name,
        profileImageUrl: profileDataR.profile_details.profile_image_url,
        shortBio: profileDataR.profile_details.short_bio,
      }
      this.setState({profileData: profileDetailsR, apiStatus: 'SUCCESS'})
    } else {
      this.setState({apiStatus: 'FAILURE'})
    }
  }

  renderProfileView = () => {
    const {profileData} = this.state
    return (
      <div className="profile-container">
        <img
          src={profileData.profileImageUrl}
          alt="profile img"
          className="profile-icon"
        />
        <h1 className="name-heading">{profileData.name}</h1>
        <p className="profile-bio">{profileData.shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-class">
      <Loader type="ThreeDots" color="#fff" width={80} height={30} />
    </div>
  )

  renderProfileFailure = () => (
    <div>
      <button type="button" onClick={this.getProfileProfile}>
        Retry
      </button>
    </div>
  )

  renderProfileDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderProfileView()
      case 'INPROGRESS':
        return this.renderLoader()
      case 'FAILURE':
        return this.renderProfileFailure()
      default:
        return null
    }
  }

  renderFailure = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt=" failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" data-testid="button" onClick={this.getJobsData}>
        Retry
      </button>
    </div>
  )

  renderJobsDetails = () => {
    const {jobsData} = this.state
    return (
      <ul className="all-jobs-list-container">
        {jobsData.map(job => (
          <JobItem key={job.id} jobDetails={job} />
        ))}
      </ul>
    )
  }

  renderJobs = () => {
    const {apiJobStatus} = this.state
    switch (apiJobStatus) {
      case 'SUCCESS':
        return this.renderJobsDetails()
      case 'INPROGRESS':
        return this.renderLoader()
      case 'FAILURE':
        return this.renderFailure()
      default:
        return null
    }
  }

  clickCheckBox = event => {
    const {activeJobType} = this.state
    if (activeJobType.includes(event.target.id)) {
      const updateJob = activeJobType.filter(each => each !== event.target.id)
      this.setState({activeJobType: updateJob}, this.getJobsData)
    } else {
      this.setState(
        prev => ({
          activeJobType: [...prev.activeJobType, event.target.id],
        }),
        this.getJobsData,
      )
    }
  }

  renderEmployTypeList = () => (
    <ul className="employ-list-container">
      {employmentTypesList.map(eachE => (
        <li className="employ-list-item" key={eachE.employmentTypeId}>
          <input
            type="checkbox"
            id={eachE.employmentTypeId}
            onChange={this.clickCheckBox}
          />
          <label className="label" htmlFor={eachE.employmentTypeId}>
            {eachE.label}
          </label>
        </li>
      ))}
    </ul>
  )

  changeSalaryRange = event => {
    console.log(event.target)
    this.setState({salaryRange: event.target.id}, this.getJobsData)
  }

  renderSalaryRange = () => (
    <ul className="employ-list-container">
      {salaryRangesList.map(eachR => (
        <li
          key={eachR.salaryRangeId}
          className="employ-list-item"
          onChange={this.changeSalaryRange}
        >
          <input type="radio" name="salary" id={eachR.salaryRangeId} />
          <label className="label" htmlFor={eachR.salaryRangeId}>
            {eachR.label}
          </label>
        </li>
      ))}
    </ul>
  )

  onChangeSearch = event => {
    this.setState({search: event.target.value})
  }

  onSubmitSearch = () => {
    this.getJobsData()
  }

  render() {
    const {search} = this.state

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="side-bar">
            {this.renderProfileDetails()}
            <hr className="separate-line" />
            <h1 className="text">Type of Employment</h1>
            {this.renderEmployTypeList()}
            <hr className="separate-line" />
            <h1 className="text">Salary Range</h1>
            {this.renderSalaryRange()}
          </div>
          <div className="all-jobs-container">
            <div className="input-container">
              <input
                type="search"
                className="search-input"
                value={search}
                onChange={this.onChangeSearch}
              />
              <button
                type="button"
                className="search-button"
                onClick={this.onSubmitSearch}
                data-testid="searchButton"
              >
                <AiOutlineSearch className="search-icon" />l
              </button>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
