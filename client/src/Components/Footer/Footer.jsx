import React from "react";
import "./Footer.css";
import logo from "../../assets/logo.png";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="footer_out_container">
          <div className="footer_inner_container">
            <div className="footer_data">
              <div>
                <div className="footer_icon">
                  <img src={logo} />
                </div>
                <div className="footer_icons">
                  <Link
                    to="https://www.facebook.com/evangaditech"
                    target="blank"
                  >
                    <FacebookOutlinedIcon />
                  </Link>
                  <Link
                    to="https://www.instagram.com/evangaditech/"
                    target="blank"
                  >
                    <InstagramIcon />
                  </Link>
                  <Link
                    to="https://www.youtube.com/@EvangadiTech"
                    target="blank"
                  >
                    <YouTubeIcon />
                  </Link>
                </div>
              </div>
              <div className="footer_links">
                <h3>Useful Link</h3>
                <ul>
                  <li>
                    {" "}
                    <Link to="/how-it-works"> How it works</Link>
                  </li>
                  <li>
                    {" "}
                    <Link
                      to="https://www.evangadi.com/legal/terms/"
                      target="blank"
                    >
                      Terms of Service{" "}
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link
                      to="https://www.evangadi.com/legal/privacy/"
                      target="blank"
                    >
                      Privacy policy{" "}
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="footer_links">
                <h3>Contact Info</h3>
                <ul>
                  <li>Contact Info</li>
                  <li>support@evangadi.com</li>
                  <li>+1-202-386-2702</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
