import "./Footer.css";

function Footer() {
  return (
    <footer className="synergy-footer-demo">
      <div className="footer-content" aria-label="Footer navigation">
        <nav className="link-wrapper">
          <a
            className="syn-link syn-link--medium syn-link--quiet"
            href="https://www.sick.com/de/en/s/imprint"
          >
            Imprint
          </a>
          <a
            className="syn-link syn-link--medium syn-link--quiet"
            href="https://www.sick.com/de/en/general-terms-and-conditions/w/tac/"
          >
            Terms and conditions
          </a>
          <a
            className="syn-link syn-link--medium syn-link--quiet"
            href="https://www.sick.com/de/en/s/terms-of-use"
          >
            Terms of use
          </a>
          <a
            className="syn-link syn-link--medium syn-link--quiet"
            href="https://www.sick.com/de/en/sick-data-privacy-declaration/w/dataprotection/"
          >
            Privacy Policy
          </a>
        </nav>
        <p className="syn-copyright">© 2024 SICK AG</p>
      </div>
    </footer>
  );
}

export default Footer;
