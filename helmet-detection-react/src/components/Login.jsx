
// import Footer from './Footer';

// const Login  =() =>{
  
// const handleLogin = () => {
//     window.location.href = '/dashboard';
// }
// return ( 
//    <>

//    <section className="hero">
//     <div className="hero-content">

//       {/* left section */}
//       <div className="hero-text">
//          <div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-gray-800"
//       >
//         <h1 className="text-3xl font-bold text-center text-white mb-2">
//           Helmet Detection System
//         </h1>
//         <p className="text-center text-gray-400 mb-8">
//           Secure Site Safety Monitoring
//         </p>
//       </div>
//       </div>

//       {/* right section */}
//       <div className="signup-card">
//         {/* <h3>Helmet Detection<br /></h3> */}

      
//         <input type="email" placeholder="Email" />
//         <input type="password" placeholder="Password" />
       

//         <label className="checkbox">
//           <input type="checkbox" />
//           <label> I agree to Terms & Privacy Policy </label>
//         </label>

//         <button className="btn-submit" onClick={handleLogin}>GET STARTED</button>

//         <div className="social-login">
//           <span>or sign in using</span>
//           <div className="icons">
//             <div className="icon">G</div>
//             <div className="icon">in</div>
//           </div>
//         </div>
//       </div>

//     </div>
//   </section><Footer /></>
//       )
// }

// export default Login;


 import { useState, useEffect } from 'react';
import '../pages/Style.css';
import Footer from './Footer';
import { Shield, Eye, AlertTriangle } from 'lucide-react';
import { environment } from '../environment/environment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = sessionStorage.getItem('token');
  //   debugger;
  //   if (token) {
  //     navigate('/dashboard');
  //   }
  // }, [navigate]);
  
  const [userName , setusername] = useState("");
  const [password, setpassword] = useState("");

 // ...existing code...
  const handleLogin = async () => {
    if (userName === "" || password === "") {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:8080/api/auth/login`, { username: userName, password: password });
      const data = res.data;

      if (data && data.error) {
        alert(data.error);
        return;
      }

      const token = data?.token ?? data;
      if (!token) {
        alert("Unexpected response from server.");
        return;
      }

      sessionStorage.setItem("token", token);
      // window.location.href = "/dashboard";
 navigate('/dashboard');
    } catch (err) {
      alert(err?.response?.data?.Error || err.message || "Login failed");
    }
  }
// ...existing code...

  return ( 
    <>
      <section>
        <div className="login-container">
        <div className="login-content">
          
          {/* Left Section - Hero Content */}
          <div className="hero-section">
            <div className="hero-badge">
              <Shield className="w-4 h-4" />
              <span>AI-Powered Safety Monitoring</span>
            </div>
            
            <h1 className="hero-title">
              Helmet Detection
              <span className="hero-title-gradient">System</span>
            </h1>
            
            <p className="hero-description">
              Advanced real-time helmet detection technology ensuring workplace safety compliance with AI-powered monitoring and instant alerts.
            </p>

            {/* Features */}
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">
                  <Eye />
                </div>
                <div className="feature-content">
                  <h3>Real-Time Detection</h3>
                  <p>Instant helmet compliance monitoring</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <AlertTriangle />
                </div>
                <div className="feature-content">
                  <h3>Instant Alerts</h3>
                  <p>Immediate notifications for violations</p>
                </div>
              </div>
              
              <div className="feature-item">
                <div className="feature-icon">
                  <Shield />
                </div>
                <div className="feature-content">
                  <h3>99% Accuracy</h3>
                  <p>AI-powered precision detection</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Login Card */}
          <div className="login-card">
            <div className="login-header">
              <div className="login-icon">
                <Shield />
              </div>
              <h2 className="login-title">Welcome Back</h2>
              <p className="login-subtitle">Sign in to access your dashboard</p>
            </div>

            <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="" 
                  placeholder="Enter your email"
                  className="form-input"
                    onChange={e => setusername(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  placeholder="Enter your password"
                  className="form-input"
                   onChange={e => setpassword(e.target.value)}
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-link">Forgot password?</a>
              </div>

              <button type="submit" className="btn-submit">
                Sign In to Dashboard
              </button>

              {/* <div className="divider">
                <span className="divider-text">Or continue with</span>
              </div>

              <div className="social-buttons">
                <button type="button" className="social-btn">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button type="button" className="social-btn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </button>
              </div> */}

              <p className="signup-link">
                Don't have an account?{' '}
                <a href="#">Sign up now</a>
              </p>
            </form>
          </div>

        </div>

       <Footer />
       </div>
      </section>
        
     
    </>
  )
}

export default Login;