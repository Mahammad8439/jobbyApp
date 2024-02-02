import {Link} from 'react-router-dom'
import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-bg-container">
          <div className="text-container-home">
            <h1 className="home-main-heading">
              Find the Job That Fits Your Life
            </h1>
            <p className="home-description">
              Millions of People are Searching for jobs,salary information,
              company reviews.Find tha job that fits your abilities and
              potential
            </p>
            <Link to="/jobs">
              <button type="button" className="find-jobs-btn">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}

export default Home
