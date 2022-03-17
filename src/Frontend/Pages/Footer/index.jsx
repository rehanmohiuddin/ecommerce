import {
  faCircleQuestion,
  faGift,
  faStar,
  faSuitcase,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { allCards, footer, headerImg } from "../../../constants";
import "./index.css";

function Index() {
  console.log("keys", Object.keys(footer));
  return (
    <footer>
      <div className="footer-container kash-container">
        {/* <img className="footer-img" src={headerImg} /> */}
        {Object.keys(footer).map((_key) => (
          <div className="footer-list">
            <div>{_key}</div>
            {Array.isArray(footer[_key]) ? (
              footer[_key].map((_li) => <Link to={"/"}>{_li}</Link>)
            ) : (
              <div className="address">{footer["registered Address"]}</div>
            )}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <div className="footer-item">
          <FontAwesomeIcon className="color-secondary" icon={faSuitcase} />
          Sell On Flipkart
        </div>
        <div className="footer-item">
          <FontAwesomeIcon className="color-secondary" icon={faStar} />
          Advertise
        </div>
        <div className="footer-item">
          <FontAwesomeIcon className="color-secondary" icon={faGift} />
          Gift Cards
        </div>
        <div className="footer-item">
          <FontAwesomeIcon
            className="color-secondary"
            icon={faCircleQuestion}
          />
          Help Centre
        </div>
        <div className="footer-item">© 2007-2022 Flipkart.com</div>
        <div className="footer-item">
          <img src={allCards} />
        </div>
      </div>
    </footer>
  );
}

export default Index;
