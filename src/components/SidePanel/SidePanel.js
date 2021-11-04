import React from "react";
import UserPanel from "./UserPanel";

class SidePanel extends React.Component {
    render() {
        return (
            <div>
            <p>SidePanel</p>
            <UserPanel/>
            </div>
        )
    }
}

export default SidePanel