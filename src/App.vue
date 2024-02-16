<template>
  <router-view />
</template>

<script lang="ts" setup>
import { useMainStore } from 'stores/main'

const mainStore = useMainStore()
mainStore.createClient()
</script>
