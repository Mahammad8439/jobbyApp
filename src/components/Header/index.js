import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <nav className="nav-bar">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="website-logo"
      />
      <ul className="links">
        <li>
          <Link to="/" className="link-item">
            Home
          </Link>
        </li>
        <li>
          <Link to="/jobs" className="link-item">
            Jobs
          </Link>
        </li>
      </ul>
      <ul className="link">
        <li>
          <button className="logout-btn" type="button" onClick={onLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
