<script setup lang="ts">
  import {Ref, ref} from 'vue'
  import { Socket } from 'socket.io-client'
  
  type Timeout = NodeJS.Timeout | number;

  interface Props {
    socket: Socket;
  }
  const TYPING_SHOW_DELAY = 1500;

  const props = defineProps<Props>();

  let message: Ref<string> = ref('');
  let timer: Ref<Timeout> = ref(0);

  const handleSendMessage = (): void => {
    console.log({ userName: localStorage.getItem('userName'), message });

    console.log(message.value.trim(), '1234')
    if (message.value.trim() && localStorage.getItem('userName')) {
      props.socket.emit('message', {
        text: message.value,
        name: localStorage.getItem('userName'),
        id: `${props.socket.id}${Math.random()}`,
        socketID: props.socket.id,
      });
      message.value = '';
    }
  }

  const handleTyping = () : void => {
    props.socket.emit('typing', `${localStorage.getItem('userName')} is typing`)

    clearTimeout(timer.value);

    timer.value = setTimeout(() => {
      props.socket.emit('typing', '');
    }, TYPING_SHOW_DELAY)
  }
</script>

<template>
  <div class="chat__footer">
    <form class="form" @submit.prevent="handleSendMessage">
      <input
          type="text"
          placeholder="Write message"
          class="message"
          @keyup="handleTyping"
          v-model="message"
      />
      <button type="submit" class="sendBtn">SEND</button>
    </form>
  </div>
</template>
