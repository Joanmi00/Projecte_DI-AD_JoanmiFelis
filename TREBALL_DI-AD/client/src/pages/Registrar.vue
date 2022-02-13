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
          <q-input
            v-model="Nombre"
            square
            filled
            clearable
            placeholder="Nombre Apellido1 Apellido2"
            class="q-mb-sm"
            color="positive"
            lazy-rules
            :rules="[required, short]"
            label="Nombre Completo"
          >
            <template #prepend>
              <q-icon name="face" />
            </template>
          </q-input>
          <q-input v-model="DNI" square filled clearable placeholder="12345678A"
            lazy-rules
            :rules="[required, isDNI, short]"
            label="DNI / NIE"
          >
            <template #prepend>
              <q-icon name="pin" />
            </template>
          </q-input>
          <q-input
            v-model="Usuario"
            square
            filled
            clearable
            placeholder="Choumi00"
            class="q-mb-sm"
            color="positive"
            lazy-rules
            :rules="[required, short]"
            label="Usuario"
          >
            <template #prepend>
              <q-icon name="account_box" />
            </template>
          </q-input>
          <q-input
            v-model="Contraseña"
            square
            filled
            clearable
            placeholder="Usa una segura!"
            class="q-mb-sm"
            color="positive"
            :type="passwordFieldType"
            lazy-rules
            :rules="[required, short]"
            label="Contraseña"
          >
            <template #prepend>
              <q-icon name="lock" />
            </template>
            <template #append>
              <q-icon
                :name="visibilityIcon"
                class="cursor-pointer"
                @click="switchVisibility"
              />
            </template>
          </q-input>
          <q-btn unelevated color="blue" class="full-width" label="Registrar"/>
          <div class="q-my-sm text-center">
            Quieres iniciar sesión?
            <a href="http://localhost:8080/#/login" class="text-blue">Login</a>
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
      required (val) {
        return (val && val.length > 0) || 'El campo no puede estar vacío'
      },
      diffPassword (val) {
        return (
          (val && val === this.Contraseña) || 'Las contraseñas son distintas'
        )
      },
      short (val) {
        return (val && val.length > 5) || 'El valor es demasiado corto'
      },
      isDNI (val) {
        const nifRegex = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i
        const nieRegex = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/i
        return (
          nifRegex.test(val) ||
          nieRegex.test(val) ||
          'El valor NO es un DNI ni un NIE'
        )
      },
      isEmail (val) {
        const emailPattern =
          /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
        return emailPattern.test(val) || 'El valor NO es un email'
      }
      // el metodo switchVisibility
      // no funciona en setup
      // switchVisibility() {
      //   visibility = !visibility;
      //   passwordFieldType = visibility ? "text" : "password";
      //   visibilityIcon = visibility ? "visibility_off" : "visibility";
      // },
    }
  },

  data () {
    return {
      Nombre: '',
      DNI: '',
      Usuario: '',
      Contraseña: '',
      reContraseña: '',
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
