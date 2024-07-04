// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCcMastercard,
//   faCcVisa,
//   faCcPaypal,
// } from "@fortawesome/free-brands-svg-icons";
// import "../css/Footer.css";

// const Footer = () => {
//   return (
//  <footer className="footer">      <div className="footer-content">
//         <div className="footer-section links">
//           <h2>GROUP COMPANIES</h2>
//           <ul>
//             <li>
//               <a href="#">Myntra</a>
//             </li>
//             <li>
//               <a href="#">Cleartrip</a>
//             </li>
//             <li>
//               <a href="#">Shopsy</a>
//             </li>
//             <li>
//               <a href="#">Shopify</a>
//             </li>
//           </ul>
//         </div>
//         <div className="footer-section links    ">
//           <h2>COMPANY POLICY</h2>
//           <ul>
//             <li>
//               <a href="#">Cancellation & Returns</a>
//             </li>
//             <li>
//               <a href="#">Terms Of Use</a>
//             </li>
//             <li>
//               <a href="#">Security</a>
//             </li>
//             <li>
//               <a href="#">Privacy</a>
//             </li>
//           </ul>
//         </div>

//         <hr className="footer-hr" />
//         <div className="footer-section links size ">
//           <h2>About</h2>
//           <ul>
//             <li>
//               <a href="#">Contact Us</a>
//             </li>
//             <li>
//               <a href="#">Features</a>
//             </li>
//             <li>
//               <a href="#">Works</a>
//             </li>
//             <li>
//               <a href="#">Career</a>
//             </li>
//           </ul>
//         </div>

//         <div className="footer-section links marg">
//           <h2>Help</h2>
//           <ul>
//             <li>
//               <a href="#">Customer Support</a>
//             </li>
//             <li>
//               <a href="#">Delivery Details</a>
//             </li>
//             <li>
//               <a href="#">Terms & Conditions</a>
//             </li>
//             <li>
//               <a href="#">Privacy Policy</a>
//             </li>
//           </ul>
//         </div>

//         <div className="footer-section links">
//           <h2>Resources</h2>
//           <ul>
//             <li>
//               <a href="#">Free eBooks</a>
//             </li>
//             <li>
//               <a href="#">Development Tutorial</a>
//             </li>
//             <li>
//               <a href="#">How to - Blog</a>
//             </li>
//             <li>
//               <a href="#">Youtube Playlist</a>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className="footer-bottom d-flex justify-content-end">
//         <div className="footer-icons">
//           <FontAwesomeIcon
//             icon={faCcMastercard}
//             style={{ fontSize: "1.8em", marginRight: "10px", color: "#0074C5" }}
//           />
//           <FontAwesomeIcon
//             icon={faCcVisa}
//             style={{ fontSize: "1.8em", marginRight: "10px", color: "#1A237E" }}
//           />
//           <FontAwesomeIcon
//             icon={faCcPaypal}
//             style={{ fontSize: "1.8em", marginRight: "10px", color: "#003087" }}
//           />
//         </div>
//       </div>
//       <div className="copyright">
//         <p>&copy; 2007-2024 e-commerce.com</p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcMastercard,
  faCcVisa,
  faCcPaypal,
} from "@fortawesome/free-brands-svg-icons";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>Group Companies</h2>
          <ul>
            <li><a href="#">Myntra</a></li>
            <li><a href="#">Cleartrip</a></li>
            <li><a href="#">Shopsy</a></li>
            <li><a href="#">Shopify</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Company Policy</h2>
          <ul>
            <li><a href="#">Cancellation & Returns</a></li>
            <li><a href="#">Terms Of Use</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Privacy</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>About</h2>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Features</a></li>
            <li><a href="#">Works</a></li>
            <li><a href="#">Career</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h2>Help</h2>
          <ul>
            <li><a href="#">Customer Support</a></li>
            <li><a href="#">Delivery Details</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* <hr className="footer-hr" /> */}

      {/* <div className="footer-bottom">
        <div className="footer-icons">
          <FontAwesomeIcon icon={faCcMastercard} className="footer-icon" />
          <FontAwesomeIcon icon={faCcVisa} className="footer-icon" />
          <FontAwesomeIcon icon={faCcPaypal} className="footer-icon" />
        </div> */}
        {/* <div className="copyright">
          <p>&copy; 2007-2024 e-commerce.com</p> */}
        {/* </div> */}
      {/* </div> */}
    </footer>
  );
};

export default Footer;
