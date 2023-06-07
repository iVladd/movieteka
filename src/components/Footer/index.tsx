import ContentWrapper from "../ContentWrapper";
import "./style.scss";
import { FaFacebookF } from "@react-icons/all-files/fa/FaFacebookF";
import { FaInstagram } from "@react-icons/all-files/fa/FaInstagram";
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter";
import { FaLinkedin } from "@react-icons/all-files/fa/FaLinkedin";

const Footer = () => {
  return (
    <footer className="footer">
      <ContentWrapper>
        <div className="footer__links">
          <a href="">Terms of use</a>
          <a href="">Privacy policy</a>
          <a href="">About</a>
          <a href="">Blog</a>
          <a href="">FAQ</a>
        </div>
        <p className="footer__text">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur
          nisi similique commodi nemo impedit aspernatur reiciendis fugiat, ab
          autem itaque tempore provident libero aperiam? Officia debitis placeat
          odit maiores est.
        </p>
        <div className="footer__social">
          {/* <div className="footer__social-item"> */}
          <a href="https://facebook.com">
            <FaFacebookF />
          </a>
          {/* </div> */}
          {/* <div className="footer__social-item"> */}
          <a href="https://instagram.com">
            <FaInstagram />
          </a>
          {/* </div> */}
          {/* <div className="footer__social-item"> */}
          <a href="https://twitter.com">
            <FaTwitter />
          </a>
          {/* </div> */}
          {/* <div className="footer__social-item"> */}
          <a href="https://linkedin.com">
            <FaLinkedin />
          </a>
          {/* </div> */}
        </div>
      </ContentWrapper>
    </footer>
  );
};

export default Footer;
