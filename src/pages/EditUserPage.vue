<template>
  <q-page padding class="user-background">
    <q-form>
      <div class="q-mb-md">
        <q-input v-model="name" label="Nome" outlined/>
      </div>
      <div class="q-mb-md">
        <q-input type="email" v-model="email" label="Email" outlined/>
      </div>
      <div class="column q-mt-md">
        <q-btn class="save-btn" label="Salvar" @click="updateUser"/>
      </div>
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import axios from 'axios'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'EditUserPage',
  setup () {
    const { notify } = useQuasar()
    const router = useRouter()

    const name = ref<string>('')
    const email = ref<string>('')
    const userId = ref<number | null>(null)

    const loadData = async () => {
      try {
        // Obtenha o ID do usuário da rota
        userId.value = parseInt(router.currentRoute.value.params.id)

        // Carregue os dados do usuário
        const response = await axios.get(`http://localhost:8000/users/${userId.value}`)
        const userData = response.data
        name.value = userData.name
        email.value = userData.email
      } catch (error) {
        console.error(error)
      }
    }

    const onSave = () => {
      notify({
        message: `${name.value} Editado com sucesso`,
        type: 'positive'
      })
    }

    const updateUser = async () => {
      try {
        await axios.put(`http://localhost:8000/users/${userId.value}`, {
          email: email.value,
          name: name.value
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        onSave() // Adicionado para notificar sobre o salvamento bem-sucedido
      } catch (error) {
        console.error(error)
      }
    }

    onMounted(() => {
      loadData() // Carregar dados do usuário ao montar o componente
    })

    return {
      name,
      email,
      userId,
      onSave,
      updateUser
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
