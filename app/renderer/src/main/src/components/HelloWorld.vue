<template>
  <div>
    <div v-if="controlText === ''">
      <h2>
        你的控制码: <span class="localCode">{{ localCode }}</span>
      </h2>
      <div style="display: flex">
        <a-input v-model="remoteCode" @change="setRemoteCode" />
        <a-button @click="startControl(remoteCode)">确认</a-button>
      </div>
    </div>
    <div v-else>
      <span>{{ controlText }}</span>
    </div>
  </div>
</template>
<script lang="ts" src="./HelloWorld.ts"></script>
<style scoped>
.localCode {
  color: #42b983;
}
</style>