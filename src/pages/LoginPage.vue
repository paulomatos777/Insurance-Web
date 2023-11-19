<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex justify-center items-center  page-background" padding>
        <q-card style="width: 30vw;" class="bg-white">
          <q-card-section class="text-center">
            <div class="text-h6">Login</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <q-form greedy ref="loginForm" class="q-gutter-y-md">
              <q-input v-model="email"
                       label="Usuário"
                       outlined
                       :rules="[
                         val => !!val || 'Usuário é obrigatório'
                       ]"
              />
              <q-input v-model="password"
                       label="Senha"
                       type="password"
                       outlined
                       :rules="[
                        (        val: any) => !!val || 'Senha é obrigatória',
(                                val: string | any[]) => val.length >= 8 || 'A senha é muito curta'
                       ]"
              />
            </q-form>
          </q-card-section>
          <q-separator/>
          <q-card-actions align="evenly" class="row">
            <q-btn class="col-5 " label="Esqueceu a Senha" size="sm" flat />
            <q-btn class="col-5 btn" label="Login" @click="onLogin" />
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { QForm, useQuasar } from 'quasar'
import { useAuthStore } from 'stores/auth'
export default defineComponent({
  name: 'LoginPage',
  setup () {
    const authStore = useAuthStore()
    const { notify } = useQuasar()

    const loginForm = ref<QForm>()

    const email = ref<string>('')
    const password = ref<string>('')

    const onLogin = async () => {
      if (loginForm.value && !(await loginForm.value.validate(true))) {
        return
      }
      const user = await authStore.login(email.value, password.value)
      if (!user) {
        notify({
          type: 'negative',
          message: 'Falha no login'
        })
        return
      }
      notify({
        type: 'positive',
        message: `Usuário "${user.name}" acessou o sistema`
      })
    }

    return {
      loginForm,
      email,
      password,
      onLogin
    }
  }
})
</script>

<style>
.page-background{
  background-color: #00cfa0;
}

.btn {
  background-color: #590082;
  color: white;
}
</style>
