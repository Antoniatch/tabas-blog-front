import { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import { NotificationContext } from '../contexts/NotificationContext'

const Navbar = () => {
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)
  const { message, setMessage } = useContext(NotificationContext)
  const location = useLocation()

  const defaultNavClass =
    'navbar bg-white text-neutral w-full justify-between fixed top-0 z-50'
  const heroNavClass =
    'navbar bg-transparent text-white w-full justify-between absolute top-0 z-50'

  const logout = () => {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setUser(null)
      setMessage({
        text: 'Déconnexion réussie',
        type: 'success',
      })
      navigate('/')
    } catch (err) {
      setMessage({
        text: 'Erreur lors de la déconnexion',
        type: 'error',
      })
      navigate('/')
    }
  }

  return (
    <nav className={location.pathname === '/' ? heroNavClass : defaultNavClass}>
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          Logo
        </Link>
        <Link to="/discover" className="btn btn-ghost normal-case text-xl">
          Découvrir
        </Link>
      </div>
      <div className="flex-none gap-2">
        {user ? (
          <span className="text-xl font-bold mr-2">{user.nickname}</span>
        ) : (
          <>
            <Link
              id="inscription-head-link"
              to="/register"
              className="btn btn-ghost"
            >
              Inscription
            </Link>
            <Link id="login-head-link" to="/login" className="btn">
              Connexion
            </Link>
          </>
        )}

        {user && (
          <div className="dropdown dropdown-end text-neutral">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div id="profil-head-avatar" className="w-10 rounded-full">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={`${user.nickname}-profil-picture`}
                  />
                ) : (
                  <img
                    src={
                      'https://ocsheriff.gov/sites/ocsd/files/styles/square_270/public/2022-05/John%20Doe_icon.png?h=8a7fc05e&itok=Gv2mcIrT'
                    }
                  />
                )}
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link
                  id="profil-head-link"
                  to="/profile"
                  className="justify-between"
                >
                  Voir le profil
                </Link>
              </li>
              <li>
                <Link
                  id="settings-head-link"
                  to="/settings"
                  className="justify-between"
                >
                  Paramètres de compte
                </Link>
              </li>
              <li>
                <button
                  id="disconnexion-head"
                  className="btn btn-secondary"
                  onClick={logout}
                >
                  Déconnexion
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar