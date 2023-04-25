<script setup lang="ts">
import {ref, Ref} from 'vue'
import { useRouter } from 'vue-router'
import { socket } from "@/socket";

const router = useRouter();
const userName: Ref<string> = ref('');

const handleSubmit = (): void => {
  localStorage.setItem('userName', userName.value);
  socket.emit('newUser', { userName: userName.value, socketId: socket.id });
  router.push('/chat');
}

</script>

<template>
  <form class="home__container" @submit.prevent="handleSubmit">
    <h2 class="home__header">Sign in to Open Chat</h2>
    <label for="username">Username</label>
    <input
        v-model="userName"
        type="text"
        minLength="6"
        name="username"
        id="username"
        class="username__input"
    />
    <button type="submit" class="home__cta">SIGN IN</button>
  </form>
</template>
