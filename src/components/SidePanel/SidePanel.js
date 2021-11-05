import React from "react";
import UserPanel from "./UserPanel";
import Channels from "./Channels";

class SidePanel extends React.Component {
    render() {
        return (
            <div>
            <p>SidePanel</p>
            <UserPanel currentUser = {this.props.currentUser}/>
            <Channels currentUser = {this.props.currentUser}/>
            </div>
        )
    }
}

export default SidePanel