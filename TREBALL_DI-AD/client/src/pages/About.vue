<template>
  <q-page class="bg-grey-10 row justify-center items-center">
    <div class="full-width" style="max-width: 320px">

      <div class="row">
        <h5 class="text-h5 text-blue q-my-md">About</h5>
      </div>

      <q-card square bordered class="bg-grey-5 q-pa-lg shadow-1" >
        <q-card-section>
          <div class="q-my-sm text-center">

            <div>
              <q-avatar size="180px" class="q-mt-md">
                <img :src="imagen" />
              </q-avatar>
            </div>

            <div style="margin-top: 30px;"/>
            <div>Autor:</div>
            <div class="bg-purple-5 text-white">Joan Miquel Felis Toledo</div>

            <div style="margin-top: 30px;"/>
            <div>Email:</div>
            <div class="bg-purple-5 text-white">joanmifelis@gmail.com</div>

            <div style="margin-top: 30px;"/>
            <div>Pagina de Login:</div>
            <q-btn unelevated color="blue" class="full-width" href="http://localhost:8080/#/login" label="Qualificacions App">
            </q-btn>

          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'About',

  data () {
    return {
      imagen: '/image/perfil.jpeg'
    }
  }
}
</script>
