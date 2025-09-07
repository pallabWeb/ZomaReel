import '../styles/auth.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function UserRegister() {

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
    const fullName = e.target.fullName.value
    const email = e.target.email.value
    const password = e.target.password.value
    try {
      const res = await axios.post('http://localhost:3000/api/auth/user/register', { fullName, email, password }, { withCredentials: true })
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }
    navigate('/')
  }
  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1 className="auth-title">Create account</h1>
        <p className="auth-sub">Register as a user</p>

        <div className="row">
          <div className="field col">
            <label className="label">Full name
              <input className="input" type="text" name="fullName" placeholder="Full name" />
            </label>
          </div>
        </div>

        <div className="field">
          <label className="label">Email
            <input className="input" type="email" name="email" placeholder="you@example.com" />
          </label>
        </div>

        <div className="field">
          <label className="label">Password
            <input className="input" type="password" name="password" placeholder="Choose a password" />
          </label>
        </div>

        <button className="auth-btn" type="submit">Register</button>

        <p className="auth-aux">Already have an account? <Link className="link" to="/user/login">Sign in</Link></p>

        <nav style={{display:'flex',justifyContent:'center',gap:12,fontSize:13}}>
          <Link className="link" to="/user/login">User auth</Link>
          <Link className="link" to="/foodpartner/login">Partner auth</Link>
        </nav>
      </form>
    </main>
  )
}
