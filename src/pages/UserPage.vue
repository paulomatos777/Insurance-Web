<template>
  <q-page padding class="user-background">
    <q-form>
      <div class="q-mb-md">
        <q-input v-model="name" label="Nome" outlined/>
      </div>
      <div class="q-mb-md">
        <q-input type="email" v-model="email" label="Email" outlined/>
      </div>
      <password-input  class="q-mt-md" outlined label="Senha" v-model="password" @change-icon="onChangeIcon">
        <template v-slot:icon>
          <q-icon name="password" />
        </template>
      </password-input>
      <div class="column q-mt-md">
        <q-btn class="save-btn" label="Salvar" @click="postData"/>
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import PasswordInput from 'components/PasswordInput.vue'
import axios from 'axios'

export default defineComponent({
  name: 'UserPage',
  components: { PasswordInput },
  setup () {
    const { notify } = useQuasar()

    const name = ref<string>('')
    const email = ref<string>('')
    const password = ref<string>('')

    const onSave = () => {
      notify({
        message: `${name.value} salvo com sucesso`,
        type: 'positive'
      })
    }

    const onChangeIcon = (value: boolean) => {
      if (value) {
        notify({
          message: 'Ocultando senha',
          type: 'info'
        })
      } else {
        notify({
          message: 'Mostrando senha',
          type: 'info'
        })
      }
    }

    const postData = async () => {
      try {
        const response = await axios.post('http://localhost:8000/users', {
          email: email.value,
          name: name.value,
          password: password.value
        }, {
          headers: {
            'Content-Type': 'application/json'
            // Outros headers, se necessário
          }
        })

        console.log(response.data)
        onSave() // Adicionado para notificar sobre o salvamento bem-sucedido
      } catch (error) {
        console.error(error)
      }
    }

    return {
      name,
      email,
      password,
      onSave,
      onChangeIcon,
      postData
    }
  }
})
</script>

<style lang="scss" scoped>
.user-background {
  background-color: white;
}

.save-btn {
  background-color: #00cfa0;
  color: white;
}
</style>
