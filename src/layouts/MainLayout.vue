<template>
  <q-layout view="lHh Lpr lFf" >
    <q-header elevated class="layout-definition" >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Desafio Ti Saúde (By Paulo Matos)
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    i<q-drawer
          v-model="leftDrawerOpen"
          show-if-above
          bordered
        >
          <q-list>
            <q-item-label
              header
            >
              Ações
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const localhost = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port

const linksList = [
  {
    title: 'Criar Usuário',
    caption: '',
    icon: 'add',
    link: `${localhost}/#/user/create`
  },
  {
    title: 'Lista de Usuários',
    caption: '',
    icon: 'list',
    link: `${localhost}/#/users`
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.layout-definition {
  background-color: #590082;
}

q-toolbar-title {
  display: flex;
  align-items: center;
}

</style>
