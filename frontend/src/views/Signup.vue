<template>
  <div class="signup">
    <signupform />
  </div>
</template>

<script>
// @ is an alias to /src

import signupform from '../components/signupform.vue'
export default {
  name: 'signup',
  components: {
    signupform
  }
}
</script>