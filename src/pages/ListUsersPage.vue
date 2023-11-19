<template>
  <q-page padding class="user-background">
    <q-table
      :rows="users"
      :columns="columns"
      row-key="id"
      :rows-dense="true"
      :rows-per-page-options=[10,20,30]
    >
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          {{ props.row.name }}
        </q-td>
      </template>

      <template v-slot:body-cell-email="props">
        <q-td :props="props">
          {{ props.row.email }}
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div class="q-gutter-md">
            <q-btn
              icon="edit"
              @click="editUser(props.row.id)"
              class="q-mr-xs icon-color"
            />
            <q-btn
              icon="delete"
              class="icon-color"
              @click="deleteUser(props.row.id)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ListUsersPage',
  setup () {
    const router = useRouter()

    return {
      router
    }
  },
  data () {
    return {
      users: [

      ],
      columns: [
        { name: 'name', label: 'Nome', align: 'left', field: 'name', sortable: true },
        { name: 'email', label: 'E-mail', align: 'left', field: 'email', sortable: true },
        { name: 'actions', label: 'Ações', align: 'center', field: 'actions' }
      ]
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    editUser (userId: number) {
      this.router.push(`/user/edit/${userId}`)
    },
    async fetchData () {
      try {
        const response = await axios.get('http://localhost:8000/users')
        this.users = response.data // Atualiza a lista de usuários com os dados recebidos
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    async deleteUser (userId: number) {
      try {
        await axios.delete(`http://localhost:8000/users/${userId}`)
        this.fetchData() // Atualiza a lista após a exclusão
        console.log('Usuário deletado com sucesso:')
      } catch (error) {
        console.error('Erro ao deletar usuário:', error)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.user-background {
  background-color: white;
}

.icon-color {
  background-color: #00cfa0;
}
</style>
