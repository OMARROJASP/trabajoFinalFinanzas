import { defineStore } from "pinia";
import {auth, db} from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
    updateProfile,
} from "firebase/auth";
import { useDatabaseStore } from "./database";
import { getDoc,doc, setDoc } from 'firebase/firestore/lite'
import router from "../router";

export const useUserStore = defineStore("users", {
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false,
  }),
  actions: {
    async registerUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
        router.push("/datos");
        console.log(email)
      } catch (error) {
        console.log(error.code);
      } finally {
        this.loadingUser = false;
      }
    },

      async setUser(user){
        try {
            const docRef = doc(db, "users", user.uid);

            this.userData = {
                email: user.email,
                uid: user.uid,
                displayName: user.displayName,
                 photoURL: user.photoURL
            };
            await setDoc(docRef, this.userData);
        }
        catch(error){
                console.log(error)
            }

      },
//     async updateUser(displayName, imagen){
      async updateUser(displayName){
        this.loadingUser.true;
        try{
            await updateProfile(auth.currentUser,{
                displayName
                /*
                cuando pongamos imagen
                 if (imagen) {
              const storageRef = ref(
                  storage,
                  `perfiles/${this.userData.uid}`
              );
              await uploadBytes(storageRef, imagen.originFileObj);
              const photoURL = await getDownloadURL(storageRef);
              await updateProfile(auth.currentUser, {
                  photoURL,
              });

                 */

            });
            this.setUser(auth.currentUser);
        }catch (error) {
            console.log(error);
            return error.code;
        } finally {
            this.loadingUser = false;
        }
      },



    async loginUser(email, password) {
      this.loadingUser = true;
      try {
        const { user } = await signInWithEmailAndPassword(auth,  email, password );
            await this.setUser(user)
          console.log(this.userData)
        //this.userData = { email: user.email, uid: user.uid };
        router.push("/home");
        console.log(email);
      } catch (error) {
        console.log(error);
        this.userData = {};
      } finally {
        this.loadingUser = false;
      }
    },
    async signOutUser() {
      this.loading = true;
      const databaseStore = useDatabaseStore();
      try {
        await signOut(auth);
        router.push("/");
        console.log("se cerro la cesion");
      } catch (error) {
        console.log(error);        console.log("se cerro la cesiondd");
      } finally {
        this.loading = false;
          this.loadingSession = false;
        this.userData = null;
        databaseStore.$reset();
        console.log("se entro o no");
      }
    },
//const databaseStore = useDatabaseStore()
        currentUser(){
            return new Promise((resolve,reject) => {
                const unsubcribe =  onAuthStateChanged(auth,async (user) => {

                        if (user) {
                            console.log(user)
                            await this.setUser(user)
                            this.userData = {
                                email: user.email,
                                uid: user.uid,
                                displayName: user.displayName,
                               photoURL: user.photoURL
                            };
                        } else {
                            this.userData = null
                            const databaseStore = useDatabaseStore()
                            databaseStore.$reset()
                        }
                        resolve(user);
                    },
                    (e)=>reject(e)
                );
                unsubcribe();
            });
        },

  },
});
