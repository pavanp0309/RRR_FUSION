import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setUser, logout as logoutAction, setRole, logout } from '../features/users/userSlice'
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from '../config/Firebaseconfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut as firebaseSignOut,
  browserLocalPersistence, setPersistence,
  onAuthStateChanged, updateProfile, updateEmail, updatePassword,
  GoogleAuthProvider, signInWithPopup, FacebookAuthProvider
} from "firebase/auth";






const useAuth = () => {

  let dispatch = useDispatch()
  let navigate = useNavigate()

  // function to Register 
  const Register = async (fullName, email, password, mobile) => {
    try {
      // Create the user with email and password in Firebase
      let userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update the user's displayName with the provided full name
      await updateProfile(userCredential.user, { displayName: fullName });

      // Destructure the user data correctly
      const { uid, email: userEmail, } = userCredential.user;

      // creating the user structure to store in database
      let userData = {
        uid,
        displayName: fullName,
        email: userEmail,
        phoneNumber: mobile,
        photoURL: null,
        role: "user",
        createdAt: new Date().toISOString(),
        isOnline: true,
        
      }


      //  updating the data in the cloud firestore
      await setDoc(doc(db, "Users", uid), userData);

      // Log the user details (optional)
      console.log(userCredential.user);

      // Dispatch user details to Redux state
      dispatch(setUser(userData));

      console.log("User registered successfully");

      // On successful registration, navigate to sign-in page
      navigate("/signin");

    } catch (error) {
      console.log("Failed to register the user:", error.message);
    }
  };



  // function to login
  const Login = async (email, password) => {
    try {
      // lognin the user with email and password in Firebase
      let userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Destructure the user data correctly
      const { uid, displayName, email: userEmail, photoURL } = userCredential.user;

      // creating the user structure to store in redux
      let userData = {
        uid,
        displayName,
        email: userEmail,
        phoneNumber: mobile,
        photoURL: photoURL || null,
        role: "user",
        createdAt: new Date().toISOString(),
        isOnline: true,
        
      }
      // Log the user details (optional)
      console.log(userCredential.user);

      // Dispatch user details to Redux state
      dispatch(setUser(userData));

      console.log("User loggedin successfully");

      // On successful registration, navigate to sign-in page
      navigate("/");

    } catch (error) {
      console.log("Failed to signin the user:", error.message);
    }
  }
  // function to logout
  const Logout = async () => {
    try {
      await firebaseSignOut(auth)     
      dispatch(logoutAction())
      navigate("/signin")
    } catch (error) {
      console.log("Failed to logout the user:", error.message);
    }
  }
  // function to googlesignin
  const GoogleSignIn = async () => {

  }
  // function to facebooksigin
  const FacebookSignIn = async () => {

  }

  return { Register,Login,Logout }
}

export default useAuth
