<template>
  <div class="fullscreen bg-purple-4 text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 100px">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        {{ error }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        no-caps>
        {{ torna }}
      </q-btn>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error404',

  data () {
    return {
      error: 'Pàgina no existent',
      torna: "Torna a l'inici"
    }
  }
})
</script>
