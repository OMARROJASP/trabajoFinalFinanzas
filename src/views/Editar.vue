<template>

  <form class="flex flex-col items-center justify-center h-screen" @submit.prevent="handleSubmit">
    <label for="file-upload" class="cursor-pointer">
      <input id="file-upload" type="file" @change="handleChange" class="hidden">
      <span class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Subir foto perfil
      </span>
    </label>

    <button class="px-4 py-2 text-white bg-red-500 rounded-lg" @click="onCancel">Cancelar</button>

  </form>

</template>

<script setup>

import {ref} from "vue";
import {useUserStore} from "../stores/user";
const userStore = useUserStore()

const fileList = ref([]);

const displayName = ref("")
const photoURL = ref("")

const beforeUpload = (file) => {
  return false;
};

const handleRemove = (file) => {
  const index = fileList.value.indexOf(file);
  const newFileList = fileList.value.slice();
  newFileList.splice(index, 1);
  fileList.value = newFileList;
};


const handleChange = (info) => {


  // valida que sea solo una imagen
  // si el user sube otra, se reemplazará
  let resFileList = info.target.files[0];
  resFileList = resFileList.slice(-1);
  resFileList = resFileList.map((file) => {
    if (file.response) {
      file.url = file.response.url;
    }
    return file;
  });
  fileList.value = resFileList;
};

const onCancel=()=>{

}
const handleSubmit=async()=> {
   await userStore.updateUser(
      userStore.userData.displayName, fileList.value[0]
  );

}
/*
 if (info.file.status !== "uploading") {
    // console.log(info.file);
    const isJpgOrPng =
        info.file.type === "image/jpeg" || info.file.type === "image/png";
    if (!isJpgOrPng) {
      alert("Solo imagenes png o jpg");
      handleRemove(info.file);
      return;
    }
    const isLt2M = info.file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      alert("Máximo 2MB!");
      handleRemove(info.file);
      return;
    }
  }
 */
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.hidden {
  display: none;
}
.bg-blue-500 {
  background-color: #3b82f6;
}
.hover\:bg-blue-700:hover {
  background-color: #2563eb;
}
.text-white {
  color: #fff;
}
.font-bold {
  font-weight: 700;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.rounded {
  border-radius: 0.25rem;
}
</style>