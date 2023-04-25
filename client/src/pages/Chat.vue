<script setup lang="ts">
import {onMounted, ref, Ref} from 'vue'
import { socket } from '@/socket'

import Message from '@/models/message'

import Bar from '@/components/chat/Bar.vue'
import Body from '@/components/chat/Body.vue'
import Footer from '@/components/chat/Footer.vue'



const messages: Ref<Message[]> = ref([]);

const typingStatus: Ref<string> = ref('');

onMounted(() => {
  socket.on('messageResponse', (data: Message) => messages.value = [...messages.value, data]);

  socket.on('typingResponse', (data: string) => typingStatus.value = data);
})

</script>

<template>
  <div class="chat">
    <Bar />
    <div class="chat__main">
      <Body
          :messages="messages"
          :typingStatus="typingStatus"
      />
      <Footer :socket="socket" />
    </div>
  </div>
</template>
