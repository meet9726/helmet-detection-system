export default function Footer() {
   
    const mediaButton = (platform) => {
        switch(platform){
            case 'Linkdin':
                window.open("https://www.linkedin.com/company/anantam-it-solutions/mycompany/", "_blank");
                break;
            default:
                break;
        }
    }
    return (
        <footer className="footer">

  {/* <!-- Top Section --> */}
  <div className="footer-top">
    <div className="webinar-card">
      {/* <h3>Live Webinars</h3> */}
      <p>Let us manage all your technical needs, so you can focus on growing your business</p>
      <button>Connect  →</button>
    </div>

    <div className="footer-links">
      <div>
        <h4>Services</h4>
        <a href="#">Web App Development</a>
        <a href="#">Mobile App Development</a>
        <a href="#">E-Commerce Development</a>
        <a href="#">UI/UX & Graphic designing</a>
        <a href="#">Cloud Services and DevOps</a>
        <a href="#">Quality Analysis & Testing</a>
      </div>

      <div>
        <h4>RESOURCES</h4>
        {/* <a href="#">What is CRM?</a>
        <a href="#">Help Center</a>
        <a href="#">Solutions</a>
        <a href="#">Customer Forum</a>
        <a href="#">CRM Express Blog</a> */}
      </div>

      <div>
        <h4>GET STARTED</h4>
        {/* <a href="#">Request Demo</a>
        <a href="#">Why Our CRM</a>
        <a href="#">Integrations</a>
        <a href="#">Compare CRMs</a>
        <a href="#">Contact Sales</a> */}
      </div>
    </div>
  </div>

  <hr />

  {/* <!-- Middle Section --> */}
  <div className="footer-middle">
    <div className="contact">
      ✉️ <a href="mailto:connect@anantamit.com">connect@anantamit.com</a>
    </div>

    <div className="apps">
      <img src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" alt="App Store" />
      <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" />
    </div>

    <div className="social">
      <span onClick={mediaButton('Linkdin')}>in</span>
      <span>Insta</span>
      <span>FB</span> 
    </div>
  </div> 

  <hr />

  {/* <!-- Bottom Section --> */}
  <div className="footer-bottom">
    <div className="search-lang">
      <input type="text" placeholder="Search product info, FAQs, and more…" />
      <select>
        <option>English (India)</option>
        <option>English (US)</option>
      </select>
    </div>

    <div className="legal">
      <a href="#">Contact</a>
      <a href="#">Security</a>
      <a href="#">Compliance</a>
      <a href="#">Terms</a>
      <a href="#">Privacy</a>
      <a href="#">Cookie Policy</a>
    </div>

    <p className="copyright">
      © 2023-2026 Anantam IT Solutions. All rights reserved. 
    </p>
  </div>

</footer>

    )
}