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

      try {
        if(this.documents.length !== 0){
          return;
        }

        console.log("vamos1")
        const q = query(
          collection(db, "datos"),
          where("user", "==", auth.currentUser.uid)
        );
        console.log("vamos")
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
        console.log(this.document)
      }
    },

    async addPrestamo(
      _precioDeVenta,
      _coutaInicial,
      _nDeanios,
      _diasXperiodo,
      _diasXanios,
      _bonoMiVivienda,
      _TEA,
      _costosNotariales,
      _costosRegistrales,
      _estudioDeTitulos,
      _tasacion,
      _comisionDeActivacion,
      _comisionPeridica,
      _portes,
      _gastosAdministrativos,
      _seguroDesgravamenPer,
      _seguroRiesgoPer,
      _plazosGraciasTotal,
      _plazosGraciasParcial,
      _bonoVerde,
      _confirGraciaTotal,
      _confirGraciaParcial,

    ) {
      this.loadingDoc = true;
      console.log("1");
      try {
        const docObjeto = {
          precioDeVenta: _precioDeVenta,
          coutaInicial: _coutaInicial,
          nDeanios: _nDeanios,
          diasXperiodo: _diasXperiodo,
          diasXanios: _diasXanios,
          bonoMiVivienda: _bonoMiVivienda,
          TEA: _TEA,
          costosNotariales: _costosNotariales,
          costosRegistrales: _costosRegistrales,
          estudioDeTitulos: _estudioDeTitulos,
          tasacion: _tasacion,
          comisionDeActivacion: _comisionDeActivacion,
          comisionPeridica: _comisionPeridica,
          portes: _portes,
          gastosAdministrativos: _gastosAdministrativos,
          seguroDesgravamenPer: _seguroDesgravamenPer,
          seguroRiesgoPer: _seguroRiesgoPer,
          plazosGraciasTotal: _plazosGraciasTotal,
          plazosGraciasParcial: _plazosGraciasParcial,
          bonoVerde: _bonoVerde,
          confirGraciaTotal: _confirGraciaTotal,
          confirGraciaParcial: _confirGraciaParcial,
          user: auth.currentUser.uid,
        };

        // const q = query(collection(db,"urls"))
        const docRef = await addDoc(collection(db, "datos"), docObjeto);
        console.log("2");
        this.documentsUsers.push({
          id: docRef.id,
          precioDeVenta: _precioDeVenta,
          coutaInicial: _coutaInicial,
          nDeanios: _nDeanios,
          diasXperiodo: _diasXperiodo,
          diasXanios: _diasXanios,
          bonoMiVivienda: _bonoMiVivienda,
          TEA: _TEA,
          costosNotariales: _costosNotariales,
          costosRegistrales: _costosRegistrales,
          estudioDeTitulos: _estudioDeTitulos,
          tasacion: _tasacion,
          comisionDeActivacion: _comisionDeActivacion,
          comisionPeridica: _comisionPeridica,
          portes: _portes,
          gastosAdministrativos: _gastosAdministrativos,
          seguroDesgravamenPer:_seguroDesgravamenPer,
          seguroRiesgoPer: _seguroRiesgoPer,
          plazosGraciasTotal: _plazosGraciasTotal,
          plazosGraciasParcial: _plazosGraciasParcial,
          bonoVerde: _bonoVerde,
          confirGraciaTotal: _confirGraciaTotal,
          confirGraciaParcial: _confirGraciaParcial,
          user: auth.currentUser.uid,
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.loadingDoc = false;
        console.log("3");
        // cone st
      }
    },



///////////////////////////////////////////////////////////////////////////////////

    async getUrls(){
      this.loadingDoc = true;

      this.documents = [];
      const q = query(
          collection(db, "urls"),
          where("user", "==", auth.currentUser.uid)
      );
      try {
        const q = query(collection(db, "urls"),
            where("user","==" ,auth.currentUser.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc)=>{
          this.documents.push({
            id: doc.id,
            ...doc.data(),
          })
          console.log(doc.data())
          console.log("sd")
        })
      }catch (error){
        console.log(error)
      }finally {
        this.loadingDoc = false;
      }
    },


    async leerDatos(){
      this.loadingDoc = true;
      console.log(auth.currentUser.uid)
      try {
        const docRef = doc(db,"users", auth.currentUser.uid);
        const docSnap = await getDoc(docRef);

        //return docSnap.data();
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
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
     console.log(docRef.id);
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
