<template>
  <q-page  class="bg-grey-10 row justify-center items-center">
    <div class="full-width" style="max-width: 350px">
      <div class="row">
        <h5 class="text-h5 text-blue q-my-md">Registre</h5>
      </div>
      <q-card square bordered class="q-pa-lg shadow-1">
        <q-card-section>

          <q-input v-model="Nom" :rules="[buit, curt]" placeholder="Nombre y apellidos" label="Nom Complet">
            <template #prepend>
              <q-icon name="face"/>
            </template>
          </q-input>

          <q-input v-model="DNI" :rules="[buit, esDNI]" placeholder="12345678A" label="DNI">
            <template #prepend>
              <q-icon name="pin" />
            </template>
          </q-input>

          <q-input v-model="Usuari" :rules="[buit, curt]" placeholder="Choumi00" label="Usuari">
            <template #prepend>
              <q-icon name="account_box" />
            </template>
          </q-input>

          <q-input v-model="Contrasenya" :rules="[buit, curt]" :type="oculta" placeholder="Usa una segura!" label="Contrasenya">
            <template #prepend>
              <q-icon name="pattern" />
            </template>
            <template #append>
              <q-icon :name="icono" class="cursor-pointer" @click="ver"/>
            </template>
          </q-input>

          <q-btn color="blue" class="full-width" label="Registrat"/>
          <div class="q-my-sm text-center text-grey-6">Ja tens un conter?
            <a href="http://localhost:8080/#/login" class="text-blue">Inicia sessió</a>
          </div>

        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'Register',

  setup () {
    return {

      buit (val) {
        return (val && val.length > 0) || 'No pot estar buit'
      },
      curt (val) {
        return (val && val.length > 5) || 'No pot ser tan curt'
      },
      esDNI (val) {
        const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i
        return (nifRegex.test(val) || 'No es un DNI'
        )
      }
    }
  },

  data () {
    return {
      Nom: '',
      DNI: '',
      Usuari: '',
      Contrasenya: '',
      oculta: 'password',
      punts: false,
      icono: 'visibility'
    }
  },

  /*
    8. De moment els formularis no senviaran al servidor,
    però si que heu de preparar la seua validació en la part del client.
  */
  methods: {
    ver () {
      this.punts = !this.punts
      this.oculta = this.punts ? 'text' : 'password'
      this.icono = this.punts ? 'visibility_off' : 'visibility'
    }
  }
}
</script>
