import React, { Component } from 'react';
import { Firebaseapp, Firestore } from '../../firebase';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Link } from 'react-router-dom';
import { doc, setDoc } from '@firebase/firestore';


const provider = new GoogleAuthProvider(Firebaseapp);
const auth = getAuth(Firebaseapp);

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
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

    isFormEmpty = ({ email, password }) => {
        if (!email || !password) {
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
            signInWithEmailAndPassword(auth, this.state.email, this.state.password)
                .then((createdUser) => {
                    console.log(createdUser)
                    this.setState(() => {
                        return {
                            loading: false
                        }
                    })
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

    saveUser = async ({ displayName, photoURL, uid }) => {
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
        const { password, email, errors, loading } = this.state;
        return (
            <div>
                Login
                <form onSubmit={this.handleSubmit}>
                    <input type="email" name="email" placeholder="email" value={email} onChange={this.handleChange} />
                    <input type="password" name="password" placeholder="password" value={password} onChange={this.handleChange} />
                    <input disabled={loading} type="submit" value="LogIn" />
                </form>
                {errors.map((error) => {
                    return <p key={errors.indexOf(error)}>{error}</p>
                })}
                <button disabled={loading} onClick={this.handleGoogleSignIn}>Google</button>
                <button disabled={loading} onClick={this.handleGitHubSignIn}>GitHub</button>
                <p>Don't have an account? <Link to="/register">Register</Link></p>
            </div>
        )
    }
}

export default Login