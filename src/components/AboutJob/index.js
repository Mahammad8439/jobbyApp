import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import AboutJobDetails from '../AboutJobDetails'
import SimilarJobs from '../SimilarJobs'
import './index.css'

class AboutJob extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    skills: [],
    lifeAtCompany: {},
    apiStatus: 'INITIAL',
  }

  componentDidMount = () => {
    this.getAboutJob()
  }

  getAboutJob = async () => {
    this.setState({apiStatus: 'INPROGRESS'})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const aboutJobResponse = await fetch(
      `https://apis.ccbp.in/jobs/${id}`,
      options,
    )
    const aboutJobDataR = await aboutJobResponse.json()
    if (aboutJobResponse.ok === true) {
      const jobDetails = aboutJobDataR.job_details
      const similarJobs = aboutJobDataR.similar_jobs
      const {skills} = jobDetails
      const lifeAtCompany = jobDetails.life_at_company
      const updateLifeAtCompany = {
        description: lifeAtCompany.description,
        imageUrl: lifeAtCompany.image_url,
      }

      const updateJobDetails = {
        location: jobDetails.location,
        packageParAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        jobDescription: jobDetails.job_description,
        id: jobDetails.id,
        employmentType: jobDetails.employment_type,
        companyWebsiteUrl: jobDetails.company_website_url,
        companyLogoUrl: jobDetails.company_logo_url,
        title: jobDetails.title,
      }

      const updateSkills = skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))
      const updateSimilarJobs = similarJobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobDetails: updateJobDetails,
        skills: updateSkills,
        similarJobs: updateSimilarJobs,
        lifeAtCompany: updateLifeAtCompany,
        apiStatus: 'SUCCESS',
      })
    }
  }

  renderSuccess = () => {
    const {skills, jobDetails, lifeAtCompany, similarJobs} = this.state

    return (
      <div className="render-success-container">
        <AboutJobDetails
          skills={skills}
          jobDetails={jobDetails}
          lifeAtCompany={lifeAtCompany}
        />
        <h1 className="heading">Similar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobs.map(each => (
            <SimilarJobs key={each.id} similarData={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffff" height={30} width={80} />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderSuccess()
      case 'INPROGRESS':
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="about-job-container">{this.renderJobDetails()}</div>
      </>
    )
  }
}

export default AboutJob
