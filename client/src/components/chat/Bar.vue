<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
import { socket } from "@/socket";

interface User {
  userName: string,
  socketId: string
}

let users : Ref <User[]> = ref([]);

onMounted(() => {
 socket.on('newUserResponse', (data : User[]) => {
   console.log(data, 'newUserResponse')
   users.value = data
 });
})
</script>

<template>
  <div class="chat__sidebar">
    <h2>Open Chat</h2>

    <div>
      <h4 class="chat__header">ACTIVE USERS</h4>
      <div class="chat__users">
        <p v-for="user in users" :key="user.socketId">{{ user.userName }}</p>
      </div>
    </div>
  </div>
</template>
