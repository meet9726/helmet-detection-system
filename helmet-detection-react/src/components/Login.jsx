
import Footer from './Footer';


const Login  =() =>{
  
const handleLogin = () => {
    window.location.href = '/dashboard';
}
return (
   <><section className="hero">
    <div className="hero-content">

      {/* left section */}
      <div className="hero-text">
         <div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-800"
      >
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Helmet Detection System
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Secure Site Safety Monitoring
        </p>
      </div>
      </div>

      {/* right section */}
      <div className="signup-card">
        {/* <h3>Helmet Detection<br /></h3> */}

      
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
       

        <label className="checkbox">
          <input type="checkbox" />
          <label> I agree to Terms & Privacy Policy </label>
        </label>

        <button className="btn-submit" onClick={handleLogin}>GET STARTED</button>

        <div className="social-login">
          <span>or sign in using</span>
          <div className="icons">
            <div className="icon">G</div>
            <div className="icon">in</div>
          </div>
        </div>
      </div>

    </div>
  </section><Footer /></>
      )
}

export default Login;