import { signOut } from "@firebase/auth";
import React from "react";
import { auth } from "../../firebase";

class UserPanel extends React.Component {
    state = {
        user: this.props.currentUser
    }
    handleSignOut = () => {
        signOut(auth)
    }
    render() {
        console.log(this.state.user)
        return (
            <div>
                <img src={this.state.user.photoURL}/>
                <p>Signed In as {this.state.user.displayName}</p>
                <button>Change Avatar</button>
            <button onClick={this.handleSignOut}>Sign Out</button>
            <hr/>
            </div>
        )
    }
}

export default UserPanel