<template>
  <!--
    7. Crea un formulari per a registrar-se.
    La informació que s’ha de passar ha de ser:
    nom complet, dni, username i password.
  -->
  <q-page  class="bg-grey-10 row justify-center items-center">
    <div class="full-width" style="max-width: 400px">
      <div class="row">
        <h5 class="text-h5 text-blue q-my-md">Registre</h5>
      </div>
      <q-card square bordered class="q-pa-lg shadow-1">
        <q-card-section>

          <q-input v-model="Nom" :rules="[buit, curt]" placeholder="Nombre y apellidos" label="Nombre Completo">
            <template #prepend>
              <q-icon name="face"/>
            </template>
          </q-input>

          <q-input v-model="DNI" :rules="[buit, esDNI]" placeholder="12345678A" label="DNI">
            <template #prepend>
              <q-icon name="pin" />
            </template>
          </q-input>

          <q-input v-model="Usuari" :rules="[buit, curt]" placeholder="Choumi00" label="Usuario">
            <template #prepend>
              <q-icon name="account_box" />
            </template>
          </q-input>

          <q-input v-model="Contrasenya" :rules="[buit, curt]" :type="passwordFieldType" placeholder="Usa una segura!" label="Contraseña">
            <template #prepend>
              <q-icon name="pattern" />
            </template>
            <template #append>
              <q-icon :name="visibilityIcon" class="cursor-pointer" @click="switchVisibility"/>
            </template>
          </q-input>

          <q-btn unelevated color="blue" class="full-width" label="Registrar"/>
          <div class="q-my-sm text-center text-grey-5">Ja tens un conter?
            <a href="http://localhost:8080/#/login" class="text-blue">Inicia sessio</a>
          </div>

        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { useQuasar, QSpinnerGears } from 'quasar'

export default {
  name: 'Register',

  setup () {
    const $q = useQuasar()

    return {
      register () {
        $q.notify({
          spinner: QSpinnerGears,
          message: 'Registrando...',
          color: 'positive',
          timeout: 2000,
          progress: true
        })
      },
      /*
        8. De moment els formularis no senviaran al servidor,
        però si que heu de preparar la seua validació en la part del client.
      */
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
      passwordFieldType: 'password',
      visibility: false,
      visibilityIcon: 'visibility'
    }
  },

  /*
    8. De moment els formularis no senviaran al servidor,
    però si que heu de preparar la seua validació en la part del client.
  */
  methods: {
    switchVisibility () {
      this.visibility = !this.visibility
      this.passwordFieldType = this.visibility ? 'text' : 'password'
      this.visibilityIcon = this.visibility ? 'visibility_off' : 'visibility'
    }
  }
}
</script>
