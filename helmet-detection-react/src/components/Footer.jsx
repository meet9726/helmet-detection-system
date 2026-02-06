  // export default function Footer() {
    
  //     const mediaButton = (platform) => {
  //         switch(platform){
  //             case 'Linkdin':
  //                 window.open("https://www.linkedin.com/company/anantam-it-solutions/mycompany/", "_blank");
  //                 break;
  //             default:
  //                 break;
  //         }
  //     }
  //     return (
  //         <footer className="footer">

  //   {/* <!-- Top Section --> */}
  //   <div className="footer-top">
  //     <div className="webinar-card">
  //       {/* <h3>Live Webinars</h3> */}
  //       <p>Let us manage all your technical needs, so you can focus on growing your business</p>
  //       <button>Connect  →</button>
  //     </div>

  //     <div className="footer-links">
  //       <div>
  //         <h4>Services</h4>
  //         <a href="#">Web App Development</a>
  //         <a href="#">Mobile App Development</a>
  //         <a href="#">E-Commerce Development</a>
  //         <a href="#">UI/UX & Graphic designing</a>
  //         <a href="#">Cloud Services and DevOps</a>
  //         <a href="#">Quality Analysis & Testing</a>
  //       </div>

  //       <div>
  //         <h4>RESOURCES</h4>
  //         {/* <a href="#">What is CRM?</a>
  //         <a href="#">Help Center</a>
  //         <a href="#">Solutions</a>
  //         <a href="#">Customer Forum</a>
  //         <a href="#">CRM Express Blog</a> */}
  //       </div>

  //       <div>
  //         <h4>GET STARTED</h4>
  //         {/* <a href="#">Request Demo</a>
  //         <a href="#">Why Our CRM</a>
  //         <a href="#">Integrations</a>
  //         <a href="#">Compare CRMs</a>
  //         <a href="#">Contact Sales</a> */}
  //       </div>
  //     </div>
  //   </div>

  //   <hr />

  //   {/* <!-- Middle Section --> */}
  //   <div className="footer-middle">
  //     <div className="contact">
  //       ✉️ <a href="mailto:connect@anantamit.com">connect@anantamit.com</a>
  //     </div>

  //     <div className="apps">
  //       <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" />
  //       <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" />
  //     </div>

  //     <div className="social">
  //       <span onClick={mediaButton('Linkdin')}>in</span>
  //       <span>Insta</span>
  //       <span>FB</span> 
  //     </div>
  //   </div> 

  //   <hr />

  //   {/* <!-- Bottom Section --> */}
  //   <div className="footer-bottom">
  //     <div className="search-lang">
  //       <input type="text" placeholder="Search product info, FAQs, and more…" />
  //       <select>
  //         <option>English (India)</option>
  //         <option>English (US)</option>
  //       </select>
  //     </div>

  //     <div className="legal">
  //       <a href="#">Contact</a>
  //       <a href="#">Security</a>
  //       <a href="#">Compliance</a>
  //       <a href="#">Terms</a>
  //       <a href="#">Privacy</a>
  //       <a href="#">Cookie Policy</a>
  //     </div>

  //     <p className="copyright">
  //       © 2023-2026 Anantam IT Solutions. All rights reserved. 
  //     </p>
  //   </div>

  // </footer>

  //     )
  // }

  import '../pages/Style.css';
import { Shield, Mail, Linkedin, Instagram, Facebook, Globe } from 'lucide-react';

export default function Footer() {
    
  const mediaButton = (platform) => {
    switch(platform) {
      case 'LinkedIn':
        window.open("https://www.linkedin.com/company/anantam-it-solutions/mycompany/", "_blank");
        break;
      case 'Instagram':
        // Add Instagram URL
        break;
      case 'Facebook':
        // Add Facebook URL
        break;
      default:
        break;
    }
  }

  return (
    <footer className="footers">
      
      {/* Top Section - CTA */}
      <div className="footer-cta">
        <div className="footer-cta-container">
          <div className="footer-cta-banner">
            <div className="footer-cta-content">
              <h3>Ready to Enhance Workplace Safety?</h3>
              <p>Let us manage all your technical needs, so you can focus on growing your business</p>
            </div>
            <button className="footer-cta-btn">Connect With Us →</button>
          </div>
        </div>
      </div>

      {/* Middle Section - Links */}
      <div className="footer-links-section">
        <div className="footer-grid">
          
          {/* Company Info */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <Shield />
              </div>
              <span className="footer-logo-text">HelmetGuard</span>
            </div>
            <p className="footer-description">
              AI-powered helmet detection system for workplace safety compliance and real-time monitoring.
            </p>
            <div className="footer-contact">
              <Mail />
              <a href="mailto:connect@anantamit.com">connect@anantamit.com</a>
            </div>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li><a href="#">Web App Development</a></li>
              <li><a href="#">Mobile App Development</a></li>
              <li><a href="#">E-Commerce Development</a></li>
              <li><a href="#">UI/UX & Graphic Design</a></li>
              <li><a href="#">Cloud Services & DevOps</a></li>
              <li><a href="#">Quality Analysis & Testing</a></li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="footer-column">
            <h4>Solutions</h4>
            <ul>
              <li><a href="#">Helmet Detection</a></li>
              <li><a href="#">Safety Monitoring</a></li>
              <li><a href="#">Compliance Tracking</a></li>
              <li><a href="#">Real-time Alerts</a></li>
              <li><a href="#">Analytics Dashboard</a></li>
              <li><a href="#">Integration Services</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Partners</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* App Download Section */}
      <div className="footer-app-section">
        <div className="footer-app-container">
          {/* <div className="footer-app-text">
            <h4>Download Our App</h4>
            <p>Available on iOS and Android</p>
          </div> */}
          {/* <div className="footer-app-badges">
            <a href="#">
              <img 
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" 
                alt="App Store" 
              />
            </a>
            <a href="#">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                alt="Play Store" 
              />
            </a>
          </div> */}
          <div className="footer-social">
            <span className="footer-social-text">Follow us:</span>
            <div className="footer-social-icons">
              <button 
                onClick={() => mediaButton('LinkedIn')}
                className="footer-social-btn"
              >
                <Linkedin />
              </button>
              <button 
                onClick={() => mediaButton('Instagram')}
                className="footer-social-btn"
              >
                <Instagram />
              </button>
              <button 
                onClick={() => mediaButton('Facebook')}
                className="footer-social-btn"
              >
                <Facebook />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom-section">
        <div className="footer-bottom-container">
          <div className="footer-bottom-top">
            
            {/* Search and Language */}
            <div className="footer-search-lang">
              <input 
                type="text" 
                placeholder="Search FAQs, docs..." 
                className="footer-search"
              />
              <select className="footer-lang-select">
                <option>🌐 English (India)</option>
                <option>🌐 English (US)</option>
                <option>🌐 हिंदी</option>
              </select>
            </div>

            {/* Legal Links */}
            <div className="footer-legal-links">
              <a href="#">Contact</a>
              <span className="footer-separator">|</span>
              <a href="#">Security</a>
              <span className="footer-separator">|</span>
              <a href="#">Compliance</a>
              <span className="footer-separator">|</span>
              <a href="#">Terms</a>
              <span className="footer-separator">|</span>
              <a href="#">Privacy</a>
              <span className="footer-separator">|</span>
              <a href="#">Cookie Policy</a>
            </div>
          </div>

          {/* Copyright */}
          <div className="footer-copyright">
            <p>© 2023-2026 Anantam IT Solutions. All rights reserved.</p>
          </div>
        </div>
      </div>

    </footer>
  )
}