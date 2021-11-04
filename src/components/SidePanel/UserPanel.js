import React from "react";

class UserPanel extends React.Component {
    handleSignOut = () => {

    }
    render() {
        return (
            <div>
                <button>Change Avatar</button>
            <button onClick={this.handleSignOut}>Sign Out</button>
            </div>
        )
    }
}

export default UserPanel