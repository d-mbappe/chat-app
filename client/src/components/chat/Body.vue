<script setup lang="ts">
import {computed, } from "vue";
import Message from "@/models/message";

interface Props {
  messages: Message[];
  typingStatus: string;
}

const props = defineProps<Props>()

const userName = computed(() => localStorage.getItem('userName'))

const handleLeaveChat = (): void => {
  localStorage.removeItem('userName');
  window.location.replace('/');
}
</script>

<template>
  <section>
    <header class="chat__mainHeader">
    <p>Hangout with Colleagues</p>
    <button class="leaveChat__btn" @click="handleLeaveChat">
      LEAVE CHAT
    </button>
  </header>

  <!-- This shows messages sent from you -->
  <div class="message__container">
    <div class="message__chats" v-for="message in props.messages" :key="message.id">
      {{ message }}
      <template v-if="message.name === userName">
        <p class="sender__name">You</p>
        <div class="message__sender">
          <p>{{ message.text }}</p>
        </div>
      </template>
      <template v-else>
        <p>{{ message.name }}</p>
        <div class="message__recipient">
          <p>{{ message.text }}</p>
        </div>
      </template>
    </div>

    <div class="message__status">
      <p v-if="!!props.typingStatus">{{ props.typingStatus }}</p>
    </div>
  </div>

  </section>
</template>
