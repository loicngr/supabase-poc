import { defineStore } from 'pinia'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

export const useMainStore = defineStore({
  id: 'mainStore',

  state: (): {
    client?: SupabaseClient
  } => ({
    client: undefined
  }),

  getters: {
  },

  actions: {
    createClient () {
      this.client = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_ANON_KEY
      )
    }
  }
})
