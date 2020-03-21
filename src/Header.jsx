import React from 'react';
import SignMeUp from './SignMeUp.jsx';

export const Header = () => {
    const signupCallBack = email => {
        return (
            console.log(`sign up called with email ${email}`)
        )
    }

    return (
        <div className="jumbotron jumbotronheight">
            <div className="row">
                <div className="col-12 col-sm-4 text-center">
                    <h6 className="text-uppercase">October 19th&amp;20th&nbsp;&nbsp;2019</h6>
                    <h6 className="text-uppercase">San Jose, California</h6>
                </div>
                <div className="col-12 col-sm-8 text-lg-right">
                    <div>
                        <img src="/static/SVCClogo.png" />
                    </div>
                    <h2>Silicon Valley Code Camp 2019</h2>
                    <div className="row col-12 text-lg-right">
                        <SignMeUp signupCallBack={signupCallBack} />
                    </div>
                </div>
            </div>
        </div>
    )
};