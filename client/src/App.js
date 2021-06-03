import React, {useState} from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Routes from "./routes";
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import './config/theme.css'
import './index.css'


import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngry,
  faLaugh,
  faSadCry,
  faThumbsUp,
  faHeart,
  faPlus,
  faTrashAlt,
  faEdit,
  faChevronLeft,
  faSort,
  faCheckSquare,
  faTimesCircle,
  faPauseCircle,
  faCircle,
  faUser,
  faRegistered,
  faChartLine,
  faSignOutAlt,
  faSignInAlt,
  faUsers,
  faCalendar,
  faUserFriends,
  faFlag,
  faAngleDown,
  faCaretDown,
  faCog,
  faBell,
  faVideo,
  faPhotoVideo,
  faComment,
  faShare,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";

import { fab, faFacebookMessenger } from "@fortawesome/free-brands-svg-icons";

library.add(
  fab,
  faAngry,
  faLaugh,
  faSadCry,
  faThumbsUp,
  faHeart,
  faPlus,
  faTrashAlt,
  faEdit,
  faChevronLeft,
  faSort,
  faCheckSquare,
  faTimesCircle,
  faPauseCircle,
  faCircle,
  faUser,
  faRegistered,
  faChartLine,
  faSignOutAlt,
  faSignInAlt,
  faUsers,
  faCalendar,
  faUserFriends,
  faFlag,
  faAngleDown,
  faCaretDown,
  faCog,
  faBell,
  faFacebookMessenger,
  faVideo,
  faPhotoVideo,
  faComment,
  faShare,
  faSmile
);

const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;



function App() {
  const [user, setUser] = useState(null);
  const loginWithFacebook = async (user) => {
    try {
      const access_token = user.accessToken;
      const response = await fetch(
        "http://localhost:5000/api/auth/facebook-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user,
            access_token,
          }),
        },  
      ); 
      const json = await response.json()
      console.log({ json });
      setUser(json.user)
    } catch (error) {
      console.log({error})
    }
  }
  const loginWithGoogle = async (user) => {
    try {
      const access_token = user.accessToken;
      const response = await fetch("http://localhost:5000/api/auth/google-login",
        {  
          method: "POST",
          headers: {
           "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user,
            access_token,
          }),
        },
      );
      const json = await response.json();
      console.log({ json });
      setUser(json.user);
    } catch (error) {
      console.log({ error });
    }
  };


  if (user?.avatarUrl) return <img src={user.avatarUrl} />

  return (
    <div className="App">

      <h1>FaceBook Login</h1>
      <FacebookLogin
                appId={FB_APP_ID}
                fields="name,email,picture"
                callback={loginWithFacebook}
                icon="fa-facebook"
                onFailure={(err) => {
                  console.log("FB LOGIN ERROR:", err);
                }}
                containerStyle={{
                  textAlign: "center",
                  backgroundColor: "#3b5998",
                  borderColor: "#3b5998",
                  flex: 1,
                  display: "flex",
                  color: "#fff",
                  cursor: "pointer",
                  marginBottom: "3px",
                }}
                buttonStyle={{
                  flex: 1,
                  textTransform: "none",
                  padding: "12px",
                  background: "none",
                  border: "none",
                }}
              />

      <h1>Google Login</h1>
      <GoogleLogin
                className="google-btn d-flex justify-content-center"
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={loginWithGoogle}
                onFailure={(err) => {
                  console.log("GOOGLE LOGIN ERROR:", err);
                }}
                cookiePolicy="single_host_origin"
              />
 
    </div>
  );
}

export default App;
