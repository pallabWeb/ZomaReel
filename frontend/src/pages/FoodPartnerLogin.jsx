import '../styles/auth.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function FoodPartnerLogin() {

  const navigate = useNavigate()
    // handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault()
      const email = e.target.email.value
      const password = e.target.password.value
      try {
        const res = await axios.post('http://localhost:3000/api/auth/foodpartner/login', { email, password }, { withCredentials: true })
        console.log(res.data)
        navigate('/foodpartner/create-food')
      } catch (error) {
        console.error(error)
      }
    }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1 className="auth-title">Partner sign in</h1>
        <p className="auth-sub">Sign in to your food-partner account</p>

        <div className="field">
          <label className="label">Email
            <input className="input" type="email" name="email" placeholder="business@example.com" />
          </label>
        </div>

        <div className="field">
          <label className="label">Password
            <input className="input" type="password" name="password" placeholder="Your password" />
          </label>
        </div>

        <button className="auth-btn" type="submit">Sign in</button>

        <p className="auth-aux">Need an account? <Link className="link" to="/foodpartner/register">Register</Link></p>

        <nav style={{display:'flex',justifyContent:'center',gap:12,fontSize:13}}>
          <Link className="link" to="/user/login">User auth</Link>
          <Link className="link" to="/foodpartner/register">Partner auth</Link>
        </nav>
      </form>
    </main>
  )
}
