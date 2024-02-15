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
import { createClient } from '@supabase/supabase-js'
import ListItems from 'components/ListItems.vue'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)
</script>
