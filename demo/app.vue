<template>
  <div>
    <h-datepicker>
    </h-datepicker>
  </div>
</template>
<script>

export default {
	data () {
		return {
        }
	},
  components : {
    'h-datepicker' : require('src/DatePicker')
  }
}
</script>
<style lang='scss'>
  .app{
    color:green;
  }
</style>
