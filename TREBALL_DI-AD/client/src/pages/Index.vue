<template>
  <q-page class="bg-grey-10 row justify-center items-center">
    <div class="full-width" style="max-width: 350px">

        <div class="row">
          <h5 class="text-h5 text-blue q-my-md">Login</h5>
        </div>

        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>

            <q-form class="q-gutter-md">
              <q-input v-model="Usuari" :rules="[buit]" class="bg-white" label="Usuari">
                <template #prepend>
                  <q-icon name="face"/>
                </template>
              </q-input>

              <q-input v-model="Contrasenya" :rules="[buit]" class="bg-white" :type="oculta" label="Contrasenya">
                <template #prepend>
                  <q-icon name="pattern" />
                </template>

                <template #append>
                  <q-icon :name="icono" class="cursor-pointer" @click="ver"/>
                </template>
              </q-input>
            </q-form>

          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn color="blue" class="full-width" label="Login" />
          </q-card-actions>

          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">No tens un conter?
              <a href="http://localhost:8080/#/register" class="text-blue"> Registra't</a>
            </p>
          </q-card-section>

        </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex',

  setup () {
    return {
      buit (val) {
        return (val && val.length > 0) || 'No pot estar buit'
      }
    }
  },

  data () {
    return {
      Usuari: '',
      Contrasenya: '',
      oculta: 'password',
      punts: false,
      icono: 'visibility'
    }
  },

  methods: {
    ver () {
      this.punts = !this.punts
      this.oculta = this.punts ? 'text' : 'password'
      this.icono = this.punts ? 'visibility_off' : 'visibility'
    }
  }
})
</script>
