<template>
<div class="comp-datepicker" v-clickoutside="close">
  <input ref="input" type="text" @click.stop="toggleShow" :name="name" v-model="value">
  <div class='container-calendar' v-show="show">
    <div class='calendar'>
      <div class='month-name'>
        <a class='nav previous' @click="changeMonth(-1)">&lt</a>
        <div class='name'>{{currentNames.monthName}}</div>
        <a class='nav next' @click="changeMonth(1)">&gt</a>
      </div>
      <div class='year-name'>
        <a class='nav previous' @click="changeYear(-1)">&lt</a>
        <div class='name'>{{currentNames.selectedYear}}</div>
        <a class='nav next' @click="changeYear(+1)">&gt</a>
      </div>
      <div class='header-month'>
        <div class="day-of-week week-number" v-show="weekShow">#</div>
        <div class="day-of-week" v-for="days in daysArray">
          {{days}}
        </div>
      </div>
      <div class="week" v-for="(dates, week) in currentMonthDates" :key="week.key">
        <div class="day week-number" v-show="weekShow">{{week}}</div>
        <div class="day" :class="{other: date.format('MM') != currentNames.selectedMonth,
                                  today: date.format(format) == today,
                                  selected: date.format(format) == selectedMoment.format(format)}"
             v-for="date in dates" :key="date.key"
             @click="changeSelectedDate(date)">
          {{date.format('DD')}}
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
// import langSets from './dataMap/langSets'
import Moment from 'moment';
import {
  extendMoment
} from 'moment-range';
const moment = extendMoment(Moment);
const locales = moment.locales()
export default {
  props: {
    format: {
      type: String,
      default: "DD/MM/YYYY"
    },
    weekShow: {
      type: Boolean,
      default: false
    },
    locale:{
      type: String,
      default : 'en'
    },
    initialday:{
      type : Number,
      validator : function (value) {
        return [0,1,2,3,4,5,6].indexOf(value) !== -1
      },
      default : 0
    },
    name:{
      type: String,
      default: "date"
    },
    value : {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: false,
      today: "",
      selectedDate: this.value
    }
  },
  created() {
    moment.locale(this.locale)
    moment.updateLocale(this.locale,{
      week : {
        dow : this.initialday
      }
    })
    this.today = moment().format(this.format);
    if (!moment(this.selectedDate, this.format).isValid()) {
      this.selectedDate = this.today;
    }
    this.selectedMoment = moment(this.selectedDate, this.format);
  },
  computed: {
    currentMonthDates() {
      let objFechas = {}
      var momentDate = moment(this.selectedDate, this.format);
      let start = moment(momentDate.startOf('month'))
      let end = moment(momentDate.endOf('month'))
      let rango = moment().range(start, end)
      // **** //
      /*
        Somehow this fixes a problem with some weeks
        not being show
      */
      rango.end.endOf('week').format('DD');
      /*
        Please do not delete the above line
      */
      // **** //
      for (let week of rango.by('week')) {
        let weekNumber = week.format('ww')
        weekNumber +=" "
        objFechas[weekNumber] = []
        let startWeek = week.startOf('week')
        let endWeek = week.clone().endOf('week')
        let rangeWeek = moment.range(startWeek, endWeek)
        for (let day of rangeWeek.by('day')) {
          objFechas[weekNumber].push(day)
        }
      }
      return objFechas
    },
    currentNames() {
      let date = this.selectedDate
      let result = {
        selectedMonth: moment(date, this.format).format('MM'),
        selectedYear: moment(date, this.format).format('YYYY'),
        monthName: moment(date, this.format).format('MMMM'),
      }
      return result
    },
    daysArray(){
      let days = []
      for (var i = 0; i <=6 ; i++) {
        days.push(moment().weekday(i).format('dd'))
      }
      return days
    }
  },
  methods:{
    changeMonth(num){
      var momentDate = moment(this.selectedDate, this.format);
      if (num > 0) {
        this.selectedDate = momentDate.add(1,'M').format(this.format)
      }else {
        this.selectedDate = momentDate.subtract(1,'M').format(this.format)
      }
      this.$nextTick(() => this.$refs.input.focus())
    },
    changeYear(num){
      var momentDate = moment(this.selectedDate, this.format);
      if (num > 0) {
        this.selectedDate = momentDate.add(1,'y').format(this.format)
      }else {
        this.selectedDate = momentDate.subtract(1,'y').format(this.format)
      }
      this.$nextTick(() => this.$refs.input.focus())
    },
    changeSelectedDate(date){
      this.show          = false
      this.selectedDate  = date.format(this.format);
      this.selectedMoment = moment(this.selectedDate, this.format);
    },
    close()
    {
      this.show= false
    },
    toggleShow() {
      this.show = !this.show
    }
  },
  watch: {
    selectedDate(val) {
      this.$emit('input', val)
    }
  },
  directives: {
    clickoutside:{
      bind: function (el, bind, vm) {
        el.clickOutsideEvent = function (event) {
          // Check if click was outside the el and his children
          if (!(el === event.target || el.contains(event.target))) {
            // and if it did, call method provided in attribute value
            vm.context[bind.expression](event);
          }
        };
        document.body.addEventListener('click', el.clickOutsideEvent)
      },
      unbind: function (el) {
        document.body.removeEventListener('click', el.clickOutsideEvent)
      }
    }
  }
}
</script>

<style lang="scss">
$red: #ab5955;
$grey: #E0E0E0;
$light-grey: #EFEFEF;
$white: #FAFAFA;
$black: #2D2D2D;
$dark-grey: #dfdfdf;
$dark-grey-2: #a2a2a2;

@mixin position-center() {
    display: flex;
    //  align-items: center;
    //  justify-content: center;
}

@mixin header() {
    display: flex;
    justify-content: space-between;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    background: $dark-grey;
    color: $black;
    padding: 5px 0;

}
.comp-datepicker{
  width: 100%;
  *{
    box-sizing: border-box;
    width: 16rem;
  }
  .container-calendar {
    @include position-center;
  }
  .calendar {
    display: flex;
    width: 100%;
    flex-direction: column;
    background: $light-grey;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    cursor : default;
    .nav::selection{
      background: transparent;
    }
    .previous, .next{
      width: 1rem;
    }
    .year-name {
      @include header;
      font-size: 10px;
      .nav {
        cursor: pointer;
      }
    }
    .month-name {
      @include header;
      font-size: 15px;
      .nav {
        cursor: pointer;
      }
    }
    .header-month {
      display: flex;
      flex-direction: row;
      text-transform: uppercase;
      background: $dark-grey;
      .day-of-week {
        padding: 5px 0;
        text-align: center;
        color: $black;
        flex: 1 1 16px;
      }
    }

    .week {
      display: flex;
      flex-direction: row;
      .day {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1 1 16px;
        height: 25px;
        cursor: pointer;

        &.today {
          background-color: $red;
          color: $white;
          font-weight: bold;
          border-radius: 100%;
        }
        &.selected {
          border: 1px solid $red;
          font-weight: bold;
          border-radius: 100%;
        }

        &.other {
          background: $grey;
          color: $dark-grey-2;

          &.today {
            margin: 0;
            border-radius: 0;
            font-weight: normal;
          }
        }
      }
    }
    .week-number {
      background: $dark-grey;
      color: $black;
      cursor: default !important;
    }
  }

}
</style>
