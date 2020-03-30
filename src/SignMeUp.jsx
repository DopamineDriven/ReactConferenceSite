import React, { useState, useEffect, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import '../static/site.css';
import { ConfigContext } from './App.jsx';

// rewrite with some added features of simple input field and button from previous activity
const SignMeUp = ({ signUpCallback }) => {
    useEffect(() => {
        console.log(`SignMeUp:useEffect called`)
    }, []);

    const [email, setEmail] = useState();
    const [emailValid, setEmailValid] = useState(false);
    const [sendProcessing, setSendProcessing] = useState(false);
    // get a reference to context
    const context = useContext(ConfigContext);
    
    // on every keystroke the validate email function is called
    // validate email utilizes regex to ensure that a correct email is input
    // before the click event for the submit button becomes accessible to the user
    // when valid email valid state gets set to true 
    const validateEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return (
            re.test(email)
        )
    }

    const notify = () => {
        toast.info(`You will be notified of upcoming events ${email}`)
    }

    // send email to backend function that runs for 1000ms (1second) 
    // then pops up a post message with a completion status 
    const sendEmailToBackend = () => {
        setSendProcessing(true)
        new Promise ((resolve) => {
            setTimeout(() => {
                setSendProcessing(false)
                setEmail("")
                resolve()
            }, 1000);
        }).then(() => {
            notify()
            signUpCallback(email)
            setEmail("")
        });
    }

    const buttonText = sendProcessing ? "processing..." : "Get Updates";
    
    // console.log('src/SignMeUp called')
    // check to see if user is logged in
    // if so, output email address and a logout button
    if (context.loggedInUserEmail) {
      return (
        <div className="container">
          <div className="content">
            <span>
              Logged in User Email: {context.loggedInUserEmail}&nbsp;&nbsp;
            </span>
            <a href="/logout">Logout</a>
          </div>
        </div>
      )
    }

    return context.showSignMeUp === false ? null : (
        <div className="container">
          <div>
            <ToastContainer />
            <div className="content">
              <input
                value={email}
                onChange={e => {
                  setEmailValid(validateEmail(e.target.value));
                  return setEmail(e.target.value);
                }}
                placeholder="Enter Email"
                type="email"
                name="email"
                required
                required
              />
              &nbsp;
              <button
                disabled={!emailValid || sendProcessing}
                className="btn"
                onClick={sendEmailToBackend}
                type="submit"
              >
                {buttonText}
              </button>
              &nbsp;&nbsp;<a href='/login'>Login</a>
            </div>
          </div>
        </div>
      )
    };
    
    // added a login button (above) for user to readily log in

export default SignMeUp;