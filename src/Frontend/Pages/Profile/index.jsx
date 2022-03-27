import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { PROFILE_COMP } from "../../actions/Auth";
import { useAuth } from "../../Context/Auth";
import Modal from "../../Utility/components/Modal";
import "./index.css";
const img =
  "https://logic.uconn.edu/wp-content/uploads/sites/508/2020/12/Placeholder.jpg";
function index() {
  const { profileOpen, dispatch, user } = useAuth();
  const closeProfile = () => dispatch({ type: PROFILE_COMP, data: null });
  return (
    <>
      {profileOpen && (
        <Modal show={profileOpen} closeCallBack={closeProfile}>
          <div className="profile-container">
            <div className="kash-h4">Profile</div>
            <div className="profile">
              <img src={img} className="profile-avatar" />
              <div className="kash-flex profile-details">
                <fieldset id="kash-input-click" class="kash-fieldset-focus">
                  <legend class="">Name</legend>
                  <input
                    class="kash-input kash-clickable"
                    id="kash-select"
                    value={user.name}
                    placeholder="Select Options"
                    disabled
                  />
                </fieldset>
                <fieldset id="kash-input-click" class="kash-fieldset-focus">
                  <legend class="">Email</legend>
                  <input
                    class="kash-input kash-clickable"
                    id="kash-select"
                    value={user.email}
                    placeholder="Select Options"
                    disabled
                  />
                </fieldset>
                <fieldset id="kash-input-click" class="kash-fieldset-focus">
                  <legend class="">Gender</legend>
                  <input
                    class="kash-input kash-clickable"
                    id="kash-select"
                    value={user.gender}
                    placeholder="Select Options"
                    disabled
                  />
                </fieldset>
                <fieldset id="kash-input-click" class="kash-fieldset-focus">
                  <legend class="">Address</legend>
                  <input
                    class="kash-input kash-clickable"
                    id="kash-select"
                    value={user.address}
                    placeholder="Select Options"
                    disabled
                  />
                </fieldset>
                <fieldset id="kash-input-click" class="kash-fieldset-focus">
                  <legend class="">Pincode</legend>
                  <input
                    class="kash-input kash-clickable"
                    id="kash-select"
                    value={user.pincode}
                    placeholder="Select Options"
                    disabled
                  />
                </fieldset>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default index;
