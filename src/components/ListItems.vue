<template>
  <div class="main justify-center items-center col-sm-8 col-md-4 col-11 row q-gutter-sm">
    <q-card class="col-12">
      <q-card-section>
        <q-form @submit="onSubmit">
          <q-input
            v-model.trim="value"
            filled
            :rules="[(val: string | undefined) => typeof val === 'string' && val.length > 0 || 'Required']"
            lazy-rules
            label="Name"
            type="text"
          />

          <q-btn
            type="submit"
            label="Submit"
            class="full-width"
            color="primary"
          />
        </q-form>
      </q-card-section>
    </q-card>

    <q-card class="col-12">
      <q-card-section>
        <q-list>
          <q-item
            v-for="(item) in items"
            :key="item.id"
            dense
          >
            <q-item-section>
              <q-input
                v-model.trim="item.name"
                hide-hint
                dense
                borderless
                type="text"
                hide-bottom-space
                no-error-icon
              >
                <template #append>
                  <q-btn
                    icon="save"
                    dense
                    fab-mini
                    unelevated
                    color="primary"
                    @click="updateItem(item)"
                  />
                </template>
              </q-input>
            </q-item-section>

            <q-item-section side>
              <q-btn
                icon="delete"
                dense
                fab-mini
                unelevated
                color="red"
                @click="deleteItem(item.id)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { SupabaseClient } from '@supabase/supabase-js'
import { ref, toRef } from 'vue'
import { Loading } from 'quasar'

interface Props {
  supabase: SupabaseClient
}

interface Item {
  id: number
  name: string
}

const props = defineProps<Props>()

const supabase = toRef(props, 'supabase')

const value = ref('')
const items = ref<Item[]>([])

async function getItems () {
  const {
    data
  } = await supabase.value.from('items')
    .select()
    .order('id', { ascending: true })

  items.value = data as Item[]
}

async function onSubmit () {
  Loading.show({
    delay: 500
  })

  await supabase.value.from('items').insert({
    name: value.value
  })

  Loading.hide()
  value.value = ''
}

async function deleteItem (id: number) {
  Loading.show({
    delay: 500
  })

  await supabase.value.from('items').delete().eq('id', id)

  Loading.hide()
}

async function updateItem (item: Item) {
  Loading.show({
    delay: 500
  })

  await supabase.value.from('items').update({
    name: item.name
  }).eq('id', item.id)

  Loading.hide()
}

supabase.value
  .channel('db-changes')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'items'
    },
    (payload) => {
      items.value.push(payload.new as Item)
    }
  )
  .on(
    'postgres_changes',
    {
      event: 'UPDATE',
      schema: 'public',
      table: 'items'
    },
    (payload) => {
      const index = items.value.findIndex(i => i.id === payload.new.id)

      if (index !== -1) {
        items.value[index] = payload.new as Item
      }
    }
  )
  .on(
    'postgres_changes',
    {
      event: 'DELETE',
      schema: 'public',
      table: 'items'
    },
    (payload) => {
      const index = items.value.findIndex(i => i.id === payload.old.id)

      if (index !== -1) {
        items.value.splice(index, 1)
      }
    }
  )
  .subscribe()

await getItems()
</script>
