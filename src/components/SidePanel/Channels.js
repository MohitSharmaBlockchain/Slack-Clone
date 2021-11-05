import React from "react";
import Modal from "react-modal";
import { ChannelsCollectionRef, Firestore } from "../../firebase";
import { doc, setDoc, onSnapshot } from '@firebase/firestore';
import { v4 } from "uuid";
import { connect } from "react-redux";
import { setCurrentChannel } from "../actions";
import { throwStatement, tsImportEqualsDeclaration } from "@babel/types";

const newChannelId = v4();

class Channels extends React.Component {
    state = {
        channels: [],
        channelName: '',
        channelDetails: '',
        errors: '',
        user: this.props.currentUser,
        modalIsOpen: false,
        firstLoad: true
    }

    componentDidMount() {
        onSnapshot(ChannelsCollectionRef, (snapshot) => {
            snapshot.docs.map((doc) => {
                this.setState((prevState) => {
                    return {
                        channels: [
                            ...prevState.channels, doc.data()
                        ]
                    }
                })
            })
        });
    }

    setFirstChannel = () => {
        if(this.state.channels.length > 0) {
            const firstChannel = this.state.channels[0]
            this.props.setCurrentChannel(firstChannel)
        }
    }

    openModal = () => {
        this.setState(() => {
            return {
                modalIsOpen: true
            }
        })
    }

    handleChange = (event) => {
        this.setState(() => {
            return {
                [event.target.name]: event.target.value
            }
        })
    }

    handleSubmit = () => {
        if (this.isFormValid(this.state)) {
            this.setState(() => {
                return {
                    modalIsOpen: false
                }
            })
            this.saveChannel(this.state)
        } else {
            this.setState(() => {
                return {
                    errors: "Fields should not be empty"
                }
            })
        }
    }

    saveChannel = async ({ user, channelName, channelDetails }) => {
        this.setState(() => {
            return {
                channels: []
            }
        })
        await setDoc(doc(Firestore, "Channels", newChannelId), {
            name: channelName,
            details: channelDetails,
            id: newChannelId,
            createdBy: {
                displayName: user.displayName,
                photoURL: user.photoURL
            }
        })
    }

    isFormValid = ({ channelName, channelDetails }) => {
        if (channelName && channelDetails) {
            return true
        } else {
            return false
        }
    }

    closeModal = () => {
        this.setState(() => {
            return {
                modalIsOpen: false
            }
        })
    }

    changeChannel = (channel) => {
        this.props.setCurrentChannel(channel)
    }

    render() {
        const { channels, modalIsOpen, errors } = this.state
        this.setFirstChannel();
        return (
            <div>
                <p>Channels ({channels.length})
                    <button onClick={this.openModal}>Add</button>
                </p>
                <div>
                    {this.state.channels.map((channel) => {
                        return <p key={channel.id} onClick={() => {this.changeChannel(channel)}}>{channel.name}</p>
                    })}
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={this.closeModal}
                    ariaHideApp={false}
                >
                    <button onClick={this.closeModal}>close</button>
                    <div>Add new Channel</div>
                    <input type="text" name="channelName" value={this.state.channelName} onChange={this.handleChange} />
                    <input type="text" name="channelDetails" value={this.state.channelDetails} onChange={this.handleChange} />
                    <button onClick={this.handleSubmit}>Submit</button>
                    <p>{errors}</p>
                </Modal>
            </div>
        )
    }
}

export default connect(null, ({ setCurrentChannel }))(Channels)