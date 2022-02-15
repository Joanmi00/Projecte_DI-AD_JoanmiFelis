<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer"/>

        <q-toolbar-title>
          <q-btn href="http://localhost:8080/#/login" unelevated class="text-white">Qualificacions App</q-btn>
        </q-toolbar-title>

        <div>{{ fecha }}</div>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" elevated :width="300" class="q-pa shadow">

      <q-img class="absolute-top" src="/image/Banner.jpg" style="height: 130px">
        <div class="absolute-bottom bg-transparent">

          <q-avatar size="60px" class="q-mb-xs">
            <img :src="imagen"/>
          </q-avatar>

          <div class="text-weight-bold">Joan Miquel Felis Toledo</div>
          <div>joanmifelis@gmail.com</div>

        </div>
      </q-img>

      <q-list style="margin-top: 150px;">
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" style="margin-top: 10px;"/>
      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Login',
    caption: 'Inicia sesió',
    icon: 'account_circle',
    link: 'http://localhost:8080/#/login'
  },

  {
    title: 'Moodle',
    caption: 'moodle.ieseljust',
    icon: 'school',
    link: 'https://moodle.ieseljust.com/my/'
  },
  {
    title: 'Github',
    caption: 'github.com/Joanmi00',
    icon: 'work',
    link: 'https://github.com/Joanmi00/Projecte_DI-AD_JoanmiFelis.git'
  },

  {
    title: 'About',
    caption: 'Sobre mi',
    icon: 'info',
    link: 'http://localhost:8080/#/about'
  }
]

import { defineComponent, ref } from 'vue'

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
  },
  data () {
    return {
      imagen: '/image/perfil.jpeg'
    }
  },
  computed: {
    fecha () {
      const meses = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Desembre']
      const hoy = new Date()
      const diaSemana = hoy.toLocaleDateString('ca-CA', { weekday: 'long' })
      const diaSemanaMayus = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1)
      return diaSemanaMayus + ', ' + hoy.getDate() + ' de ' + meses[hoy.getMonth()] + ' de ' + hoy.getFullYear()
    }
  }

})
</script>
