import React from "react";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal text-center text-base-content p-8">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by ACME
          Industries Ltd
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
