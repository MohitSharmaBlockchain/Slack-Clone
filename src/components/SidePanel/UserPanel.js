import { signOut } from "@firebase/auth";
import React from "react";
import { auth } from "../../firebase";

class UserPanel extends React.Component {
    handleSignOut = () => {
        signOut(auth)
    }
    render() {
        return (
            <div>
                <img src={this.props.currentUser.photoURL}/>
                <p>Signed In as {this.props.currentUser.displayName}</p>
                <button>Change Avatar</button>
            <button onClick={this.handleSignOut}>Sign Out</button>
            <hr/>
            </div>
        )
    }
}

export default UserPanel