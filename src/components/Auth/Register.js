import React, { Component } from 'react';
import { Firebaseapp, Firestore } from '../../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { Link } from 'react-router-dom';
import md5 from 'md5';
import { doc, setDoc } from '@firebase/firestore';
import { auth } from '../../firebase';

const provider = new GoogleAuthProvider(Firebaseapp);

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            errors: [],
            loading: false
        }
    }

    handleChange = (event) => {
        this.setState(() => {
            return {
                [event.target.name]: event.target.value
            }
        })
    }

    isFormValid = () => {
        if (this.isFormEmpty(this.state)) {
            this.setState(() => {
                return {
                    errors: ["Fields should not be empty"]
                }
            })
            return false
        } else if (this.isPasswordInvalid(this.state)) {
            this.setState(() => {
                return {
                    errors: ["Password should be greater than 6"]
                }
            })
            return false
        } else {
            return true
        }
    }

    isFormEmpty = ({ username, email, password }) => {
        if (!username || !email || !password) {
            return true
        } else {
            return false
        }
    }

    isPasswordInvalid = ({ password }) => {
        if (password.length < 6) {
            return true
        } else {
            return false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if (this.isFormValid()) {
            this.setState(() => {
                return {
                    errors: [],
                    loading: true
                }
            })
            createUserWithEmailAndPassword(auth, this.state.email, this.state.password)
            .then(() => {
                updateProfile(auth.currentUser, {
                    displayName: this.state.username, photoURL: `http://gravatar.com/avatar/${md5(this.state.email)}?d=identicon`
                  }).then(() => {
                      console.log(auth.currentUser)
                    this.setState(() => {
                        return {
                            loading: false
                        }
                    })
                    this.saveUser(auth.currentUser)
                  }).catch((error) => {
                    console.log(error)
                this.setState(() => {
                    return {
                        errors: ["500 Error"],
                        loading: false
                    }
                })
                  });                
            })
            .catch((error) => {
                console.log(error)
                this.setState(() => {
                    return {
                        errors: ["500 Error"],
                        loading: false
                    }
                })
            });
        }
    }

    saveUser = async ({displayName, photoURL, uid}) => {
        await setDoc(doc(Firestore, "Users", uid), {
            displayName,
            photoURL
        })
    }

    handleGoogleSignIn = () => {
        this.setState(() => {
            return {
                loading: true
            }
        })
        signInWithPopup(auth, provider)
            .then((createdUser) => {
                const user = createdUser.user
                this.saveUser(user)
                this.setState(() => {
                    return {
                        loading: false
                    }
                })
            }).catch((error) => {
                console.log(error)
            });
    }

    handleGitHubSignIn = () => {
        // GitHub SignIn
    }

    render() {
        const { username, password, email, errors, loading } = this.state;
        return (
            <div>
                Register
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="username" placeholder="username" value={username} onChange={this.handleChange} />
                    <input type="email" name="email" placeholder="email" value={email} onChange={this.handleChange} />
                    <input type="password" name="password" placeholder="password" value={password} onChange={this.handleChange} />
                    <input disabled={loading} type="submit" value="SignUp" />
                </form>
                {errors.map((error) => {
                    return <p key={errors.indexOf(error)}>{error}</p>
                })}
                <button disabled={loading} onClick={this.handleGoogleSignIn}>Google</button>
                <button disabled={loading} onClick={this.handleGitHubSignIn}>GitHub</button>
                <p>Already a User? <Link to="/login">Login</Link></p>
            </div>
        )
    }
}

export default Register