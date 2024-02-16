import { defineStore } from 'pinia'
import { useMainStore } from 'stores/main'
import { type AuthTokenResponsePassword } from '@supabase/supabase-js'
import { Notify } from 'quasar'

export const useUserStore = defineStore({
  id: 'userStore',

  state: (): {
    data?: AuthTokenResponsePassword['data']
  } => ({
    data: undefined
  }),

  getters: {
    user: (state) => state?.data?.user
  },

  actions: {
    async signIn (email: string, password: string): Promise<boolean> {
      const client = useMainStore().client

      if (typeof client === 'undefined') {
        return false
      }

      const {
        data,
        error
      } = await client.auth.signInWithPassword({
        email,
        password
      })

      if (error !== null) {
        console.error(error)
        Notify.create({
          message: `${error}`,
          type: 'negative',
          timeout: 5000
        })

        return false
      }

      this.data = data
      return true
    }
  }
})
