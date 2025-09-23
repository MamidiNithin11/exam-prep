import { initializeApp } from 'firebase/app'
import {
  getAuth,
  createUserWithEmailAndPassword,
  setPersistence,
  inMemoryPersistence,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyC0Jh7P8glwadUHnsp__EcMbubIb7Smzy4",
  authDomain: "loginpage-f53c2.firebaseapp.com",
  projectId: "loginpage-f53c2",
  storageBucket: "loginpage-f53c2.firebasestorage.app",
  messagingSenderId: "516615870006",
  appId: "1:516615870006:web:43099087e3e55c75946a97"
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

setPersistence(auth, inMemoryPersistence)
const registerUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password)
const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password)
const logoutUser = () => signOut(auth)
const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider()
  return signInWithPopup(auth, provider)
}
export { auth, registerUser, loginUser, logoutUser, loginWithGoogle }