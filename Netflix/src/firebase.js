
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore"
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAZMU1u4kefMET56RqzlzXTQ_CcmUk-f2Q",
  authDomain: "netflixclone-abf37.firebaseapp.com",
  projectId: "netflixclone-abf37",
  storageBucket: "netflixclone-abf37.appspot.com",
  messagingSenderId: "375401656429",
  appId: "1:375401656429:web:b85e632391884f23d30f64",
  measurementId: "G-CJ2VFLY0K4"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email, password);
        const user = res.user;
        await addDoc (collection(db, "user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        })
    } catch(error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try{
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout }