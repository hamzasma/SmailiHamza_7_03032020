<template>
  <div class="profil">
    <userprofil />
  </div>
</template>

<script>
// @ is an alias to /src

import userprofil from '../components/userprofil.vue'
export default {
  name: 'profils',
  components: {
    userprofil
  }
}
</script>