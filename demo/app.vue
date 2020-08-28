<template>
  <div>
    <h-datepicker :weekShow="true" v-model="modelo">
    </h-datepicker>
  </div>
</template>
<script>

export default {
  data () {
    return {
      modelo: "02/08/2020"
    }
  },
  components : {
    'h-datepicker' : require('../src/DatePicker.vue').default
  }
}
</script>
<style lang='scss'>
.app{
  color:green;
}
</style>
