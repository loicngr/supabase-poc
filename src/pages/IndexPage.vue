<template>
  <q-page class="row items-center justify-evenly">
    <suspense>
      <list-items
        :supabase="supabase"
      />

      <template #fallback>
        <q-inner-loading showing />
      </template>
    </suspense>
  </q-page>
</template>

<script setup lang="ts">
import ListItems from 'components/ListItems.vue'
import { useMainStore } from 'stores/main'
import { storeToRefs } from 'pinia'

const mainStore = useMainStore()

const {
  client: supabase
} = storeToRefs(mainStore)
</script>
