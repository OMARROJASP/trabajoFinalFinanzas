import { defineStore } from "pinia";
import { db, auth } from "../firebaseConfig";
import {
  query,
  collection,
  getDoc,
  getDocs,
  where,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore/lite";
import router from "../router";

export const useDatabaseStore = defineStore("database", {
  state: () => ({
    documents: [],
    documentsUsers: [],
    loadingDoc: false,


  }),

  actions: {
    async getPrestamo() {
      this.loadingDoc = true;

      this.documents = [];
      const q = query(
        collection(db, "datos"),
        where("users", "==", auth.currentUser.uid)
      );
      try {
        const q = query(
          collection(db, "datos"),
          where("users", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          this.documents.push({
            id: doc.id,
            ...doc.data(),
          });
          console.log(doc.data());
          console.log("sd");
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },

    async addPrestamo(
      _precioDeVenta,
      _coutaInicial,
      _prestamo,
      _FrecuenciaDePagos,
      _numeroAnos,
      _NdePeriodos,
      _TEA
    ) {
      this.loadingDoc = true;
      try {
        const docObjeto = {
          precioDeVenta: _precioDeVenta,
          coutaInicial: _coutaInicial,
          prestamo: _prestamo,
          FrecuenciaDePagos: _FrecuenciaDePagos,
          numeroAnos: _numeroAnos,
          NdePeriodos: _NdePeriodos,
          TEA: _TEA,
          user: auth.currentUser.uid,
        };

        // const q = query(collection(db,"urls"))
        const docRef = await addDoc(collection(db, "datos"), docObjeto);

        this.documentsUsers.push({
          id: docRef.id,
          precioDeVenta: _precioDeVenta,
          coutaInicial: _coutaInicial,
          prestamo: _prestamo,
          FrecuenciaDePagos: _FrecuenciaDePagos,
          numeroAnos: _numeroAnos,
          NdePeriodos: _NdePeriodos,
          TEA: _TEA,
          user: auth.currentUser.uid,
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
      }
    },



///////////////////////////////////////////////////////////////////////////////////

    async leerDatos(){
      this.loadingDoc = true;
      try {
        const docRef = doc(db,"users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        return docSnap.data().cliente;
      }catch (error)
      {
        console.log(error);
      }finally {
        this.loadingDoc = false;
      }
    },


    async addUsers(_name, _apellido) {
      this.loadingDoc = true;
      try {
        const docObjeto = {
          email: auth.currentUser.email,
          name: _name,
          apellido: _apellido,
          user: auth.currentUser.uid,
        };

        // const q = query(collection(db,"urls"))
        const docRef = await addDoc(collection(db, "users"), docObjeto);

        this.documents.push({
          id: docRef.id,
          email: auth.currentUser.email,
          name: _name,
          apellido: _apellido,
          user: auth.currentUser.uid,
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
        console.log("se agrego el perfil")
        router.push("/home");
      }
    },


  },
});
