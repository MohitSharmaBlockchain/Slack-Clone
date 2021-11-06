import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore"
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCecucQzCZd7XvRz73QwK3PhoZMnUgcnfc",
  authDomain: "react-slack-clone-62d59.firebaseapp.com",
  projectId: "react-slack-clone-62d59",
  storageBucket: "react-slack-clone-62d59.appspot.com",
  messagingSenderId: "558333956407",
  appId: "1:558333956407:web:8d15a91df6e3f30ca80ab2"
};

export const Firebaseapp = initializeApp(firebaseConfig);

export const Firestore = getFirestore(Firebaseapp);

export const UsersCollectionRef = collection(Firestore, "Users");

export const ChannelsCollectionRef = collection(Firestore, "Channels");

export const MessagesCollectionRef = collection(Firestore, "Messages");

export const auth = getAuth(Firebaseapp);
