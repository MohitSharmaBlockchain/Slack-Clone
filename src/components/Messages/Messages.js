import React from "react";
import MessagesForm from "./MessagesForm";
import MessagesHeader from "./MessagesHeader";
import { onSnapshot } from "@firebase/firestore";
import { doc } from "@firebase/firestore";
import { Firestore } from "../../firebase";
import { collection } from "@firebase/firestore";
import { v4 } from "uuid";

class Messages extends React.Component {
    state = {
        loading: true,
        messages: [],
        loadedChannel: ''
    }
    componentDidUpdate() {
        if(this.props.currentChannel) {
            if(this.props.currentChannel.id != this.state.loadedChannel) {
                this.setState(() => {
                    return {
                        loading: true
                    }
                })
            }
        }
        if(this.props.currentChannel && this.state.loading) {
            this.setState(()=>{
                return {
                    loadedChannel: this.props.currentChannel.id
                }
            })
            const channel = this.props.currentChannel
            console.log(channel.id)
            onSnapshot(collection(Firestore, "Channels", channel.id, "Messages"), (snapshot) => {
                this.setState(() => {
                    return {
                        messages: []
                    }
                })
                snapshot.docs.map((doc) => {
                    this.setState((prevState) => {
                        return {
                            messages: [
                                ...prevState.messages, doc.data()
                            ]
                        }
                    })
                })
         });
         this.setState(()=>{
            return {
                loading: false
            }
        })
        }
    }
    render() {
        return (
            <div>
                <p>Messages</p>
                <MessagesHeader/>
                <p>{this.state.loading ? `Loading...` : `Messages Here!`}</p>
                {this.state.messages.map((message)=>{
                    return <div key={v4()}>
                        <p>{message.content}</p>
                        <p>{message.user && message.user.displayName}</p>
                        </div>
                })}
                <MessagesForm currentUser={this.props.currentUser} currentChannel={this.props.currentChannel}/>
            </div>
        )
    }
}

export default Messages