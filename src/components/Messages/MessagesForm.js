import React from "react";
import { Firestore } from "../../firebase";
import { v4 } from "uuid";
import { setDoc, doc, serverTimestamp } from "@firebase/firestore";

class MessagesForm extends React.Component {

    state = {
        message: '',
    }

    handleChange = (event) => {
        this.setState(() => {
            return {
                [event.target.name]: event.target.value
            }
        })
    }

    sendMessage = async () => {
        const newmessageId = v4()
        const channel = this.props.currentChannel
        const user = this.props.currentUser
        await setDoc(doc(Firestore, "Channels", channel.id , "Messages", newmessageId), {
            content: this.state.message,
            timestamp: serverTimestamp(),
            messageid: newmessageId,
            user: {
                displayName: user.displayName,
                photoURL: user.photoURL,
                uid: user.uid
            }
        })
    }

    render() {
        return (
            <div>
                <input name="message" value={this.state.message} onChange={this.handleChange}/>
                <button onClick={this.sendMessage}>Send</button>
            </div>
        )
    }
}

export default MessagesForm