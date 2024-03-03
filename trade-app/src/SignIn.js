import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { Link } from "react-router-dom";

import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function SignIn() {
  const [login, setLogin] = useState(false); // set up login
  const [data, setData] = useState({}); // set up Facebook data
  const [picture, setPicture] = useState(""); // set up Facebook profile picture

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture ? response.picture.data.url : undefined);
    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  return (
    <div className="container">
      <Card style={{ maxWidth: "800px" }} className="mx-auto mt-5">
        <Card.Header className="">
          <h1>Sign In</h1>
        </Card.Header>
        <Card.Body>
          <div>
            {!login && (
              <React.Fragment>
                <h3>Please login using one of the following:</h3>
                {/* Login Form */}
                <LoginForm />
                {/* Facebook Login Button */}
                <FacebookLogin
                  appId="721738989937603" // Grab it from the dashboard at https://developers.facebook.com/apps/.
                  autoLoad={false}
                  fields="name,email,picture"
                  scope="public_profile,user_friends"
                  callback={responseFacebook}
                  icon="fa-facebook"
                />
              </React.Fragment>
            )}
            {login && <Home fbpic={picture} fbdata={data} />}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

function LoginForm() {
  return (
    <form className="border col-6 mt-3 mb-5 p-3 bg-white">
      <div className="form-group col-10">
        <label className="m-2">Email</label>
        <input type="email" name="email" className="form-control" placeholder="" />
      </div>
      <div className="form-group col-10">
        <label className="m-2">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder=""
        />
      </div>

      {/* Suppose User successfully signed in */}
      <Link to="/userHome/">
        <button type="submit" className="btn btn-success">
          Login
        </button>
      </Link>
    </form>
  );
}

function Home({ fbpic, fbdata }) {
  return (
    <React.Fragment>
      <img src={fbpic} alt={fbdata.name} />
      <h3 className="d-inline" text-success mx-2>
        Welcome back {fbdata.name}!
      </h3>
      <p className="my-5">This is the home page of the app.</p>
    </React.Fragment>
  );
}

export default SignIn;
