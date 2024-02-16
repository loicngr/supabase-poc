<template>
  <q-page class="row items-center justify-evenly">
    <q-form
      @submit.prevent="onSubmit"
      class="row col-sm-6 col-12"
      ref="formRef"
    >
      <q-input
        v-model.trim="email"
        filled
        :rules="[(val: string | undefined) => typeof val === 'string' && val.length > 0 || 'Required']"
        lazy-rules
        label="Email"
        type="email"
        class="col-12"
      />

      <q-input
        v-model.trim="password"
        filled
        :rules="[(val: string | undefined) => typeof val === 'string' && val.length > 0 || 'Required']"
        lazy-rules
        label="Password"
        type="password"
        class="col-12"
      />

      <q-btn
        type="submit"
        label="Sign in"
        class="col-12"
      />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Loading, QForm } from 'quasar'
import { useUserStore } from 'stores/user'
import { useRouter } from 'vue-router'

const email = ref<string | undefined>()
const password = ref<string | undefined>()
const formRef = ref<InstanceType<typeof QForm> | null>(null)

const router = useRouter()
const userStore = useUserStore()

async function onSubmit () {
  const isValid = await formRef.value?.validate()
  const form = {
    email: email.value,
    password: password.value
  }

  if (
    !isValid ||
    typeof form.email === 'undefined' ||
    typeof form.password === 'undefined'
  ) {
    return
  }

  Loading.show()
  const status = await userStore.signIn(form.email, form.password)

  if (status) {
    await router.push({
      name: 'home'
    })
  }

  Loading.hide()
}
</script>
