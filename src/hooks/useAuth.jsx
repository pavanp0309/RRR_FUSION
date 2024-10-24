import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setUser, logout as logoutAction, setRole, logout } from '../features/users/userSlice'
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, db } from '../config/Firebaseconfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut as firebaseSignOut,
  browserLocalPersistence, setPersistence,
  onAuthStateChanged, updateProfile, updateEmail, updatePassword,
  GoogleAuthProvider, signInWithPopup, FacebookAuthProvider
} from "firebase/auth";

const useAuth = () => {
  let [loading, setLoading] = useState(false)
  let dispatch = useDispatch()
  let navigate = useNavigate()
  const Googleprovider = new GoogleAuthProvider();
  const facebookprovider = new FacebookAuthProvider();

  // function to Register 
  const Register = async (fullName, email, password, mobile) => {
    setLoading(true)
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
    } finally {
      setLoading(false)
    }
  };



  // function to login
  const Login = async (email, password) => {
    setLoading(true)
    try {
      //  keeping track of the user state in browserLocalstorage
      await setPersistence(auth, browserLocalPersistence)

      // lognin the user with email and password in Firebase
      let userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Destructure the user data correctly
      const { uid, displayName, email: userEmail, photoURL } = userCredential.user;

      // getting the userdata from  firestore 
      const userDoc = getDoc(doc(db, "Users", uid));


      if (userDoc.exists()) {
        console.log("Document data:", userDoc.data());
        let userDataFromFirestore = userDoc.data()
        // creating the user structure to store in redux
        let userData = {
          uid,
          displayName: displayName || userDataFromFirestore.displayName,
          email: userEmail,
          phoneNumber: mobile || userDataFromFirestore.phoneNumber,
          photoURL: photoURL || null,
          role: userDataFromFirestore.role || "user",
          createdAt: userDataFromFirestore.createdAt,
          isOnline: true,

        }
        // Log the user details (optional)
        console.log(userCredential.user);

        // Dispatch user details to Redux state
        dispatch(setUser(userData));
        dispatch(setRole(userData.role))

        console.log("User loggedin successfully");

        // On successful registration, navigate to sign-in page
        navigate("/");

      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

    } catch (error) {
      console.log("Failed to signin the user:", error.message);
    } finally {
      setLoading(false)
    }
  }

  // function to googlesignin
  const GoogleSignIn = async () => {
    setLoading(true)
    try {
      //  eignin with google 
      let result = await signInWithPopup(auth, Googleprovider)

      const { uid, displayName, email: userEmail, photoURL } = result.user;

      // getting the userdata from  firestore 
      const userDoc = await getDoc(doc(db, "Users", uid));


      if (!userDoc.exists()) {

        // creating the user structure to store in redux
        let userData = {
          uid,
          displayName,
          email: userEmail,
         
          photoURL: photoURL || null,
          role: "user",
          createdAt: new Date().toISOString(),
          isOnline: true,

        };
        //  updating the data in the cloud firestore
        await setDoc(doc(db, "Users", uid), userData,{merge:true});

        let userDataFromFirestore = userDoc.exists()?userDoc.data():{displayName,userEmail,photoURL,role:"user"};

        // Log the user details (optional)
        console.log(userDataFromFirestore.user);

        // Dispatch user details to Redux state
        dispatch(setUser(userDataFromFirestore));
        dispatch(setRole(userDataFromFirestore.role))

        console.log("User loggedin successfully");

        // On successful registration, navigate to sign-in page
        navigate("/");

      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

    } catch (error) {
      console.log("Failed to signin the user:", error.message);
    } finally {
      setLoading(false)
    }
  }
  // function to facebooksigin
  const facebookSignIn = async () => {
    setLoading(true)
    try {
      //  eignin with google 
      let result = await signInWithPopup(auth, facebookprovider)

      const { uid, displayName, email: userEmail, photoURL } = result.user;

      // getting the userdata from  firestore 
      const userDoc = await getDoc(doc(db, "Users", uid));


      if (!userDoc.exists()) {

        // creating the user structure to store in redux
        let userData = {
          uid,
          displayName,
          email: userEmail,
          photoURL: photoURL || null,
          role: "user",
          createdAt: new Date().toISOString(),
          isOnline: true,

        };
        //  updating the data in the cloud firestore
        await setDoc(doc(db, "Users", uid), userData,{merge:true});

        let userDataFromFirestore = userDoc.exists()?userDoc.data():{displayName,userEmail,photoURL,role:"user"};



        // Dispatch user details to Redux state
        dispatch(setUser(userDataFromFirestore));
        dispatch(setRole(userDataFromFirestore.role))

        console.log("User loggedin successfully");

        // On successful registration, navigate to sign-in page
        navigate("/");

      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }

    } catch (error) {
      console.log("Failed to signin the user:", error.message);
    } finally {
      setLoading(false)
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

  const CheckAuthState = () => {
    setLoading(true)
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Destructure the user data correctly
        const { uid, displayName, email, photoURL } = user;
        // getting the userdata from  firestore 
        const userDoc = await getDoc(doc(db, "Users", uid));

        if (userDoc.exists()) {
          console.log("Document data:", userDoc.data());
          let userDataFromFirestore = userDoc.data()
          // creating the user structure to store in redux
          let userData = {
            uid,
            displayName: displayName || userDataFromFirestore.displayName,
            email,
            phoneNumber: userDataFromFirestore.phoneNumber || null,
            photoURL: photoURL || null,
            role: userDataFromFirestore.role || "user",
            createdAt: userDataFromFirestore.createdAt,
            isOnline: true,

          }


          // Dispatch user details to Redux state
          dispatch(setUser(userData));
          dispatch(setRole(userData.role))

          console.log("User loggedin successfully");



          // Redirecting to different url if path is not sign or register 
          if (window.location.pathname !== "/signin" && window.location.pathname !== "/register") {
            navigate("/");
          }

        } else {
          dispatch(logoutAction())
          if (window.location.pathname !== "/signin" && window.location.pathname !== "/register") {
            navigate("/signin");
          }
        }
      }
    });
    setLoading(false)
  }

  useEffect(() => {
    CheckAuthState()
  }, [])

  return { Register, Login, Logout,GoogleSignIn,facebookSignIn ,loading}
}

export default useAuth
