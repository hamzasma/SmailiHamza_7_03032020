<template>
  <div class="home">
    <loginform />
  </div>
</template>

<script>
// @ is an alias to /src
import loginform from '@/components/loginform.vue'
export default {
  name: 'Home',
  components: {
    loginform
  }
}
</script>
