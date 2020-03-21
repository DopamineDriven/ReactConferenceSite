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
                    <h6 className="text-uppercase"></h6>
                </div>
            </div>
        </div>
    )
}