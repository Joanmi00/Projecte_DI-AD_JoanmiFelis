<template>
  <q-page class="bg-grey-10 row justify-center items-center">
    <div class="column">

      <div class="row">
        <h5 class="text-h5 text-blue q-my-md">Login</h5>
      </div>

      <div class="row">
        <q-card square bordered class="bg-grey-4 q-pa-lg shadow-1">
          <q-card-section>

            <q-form class="q-gutter-md">
              <q-input class="bg-white" square filled clearable type="user" label="Usuari" />
              <q-input class="bg-white" square filled clearable type="password" label="Contrasenya" />
            </q-form>

          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn unelevated color="blue" size="lg" class="full-width" label="Login" />
          </q-card-actions>

          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">No tens un conter?
              <a href="http://localhost:8080/#/register" class="text-blue"> Registrat</a>
            </p>
          </q-card-section>

        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PageIndex'
})
</script>
