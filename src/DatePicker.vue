<template>
<div class="comp-datepicker" >
  <input ref="input" type="text" @click.stop="show = !show" @blur="evaluateBlur" name="" v-model="selectedDate">
  <div class='container' v-show="show">
    <div class='calendar'>
      <div class='month-name'>
        <a class='nav previous' @click="changeMonth(-1)">&lt</a>
        <div class='name'>{{currentNames.monthName}}-{{currentNames.selectedMonth}}</div>
        <a class='nav next' @click="changeMonth(1)">&gt</a>
      </div>
      <div class='year-name'>
        <a class='nav previous' @click="changeYear(-1)">&lt</a>
        <div class='name'>{{currentNames.selectedYear}}</div>
        <a class='nav next' @click="changeYear(+1)">&gt</a>
      </div>
      <div class='header-month'>
        <div class="day-of-week" v-show="weekShow">#</div>
        <div class='day-of-week'>S</div>
        <div class='day-of-week'>M</div>
        <div class='day-of-week'>T</div>
        <div class='day-of-week'>W</div>
        <div class='day-of-week'>T</div>
        <div class='day-of-week'>F</div>
        <div class='day-of-week'>S</div>
      </div>
      <div class="week" v-for="(dates, week) in currentMonthDates" :key="week.key">
        <div class="day week-number" v-show="weekShow">{{week}}</div>
        <div class="day" :class="{other: date.format('MM') != currentNames.selectedMonth,
                                  today: date.format(format) == today}"
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

export default {
  props: {
    format: {
      type: String,
      default: "DD/MM/YYYY"
    },
    weekShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      today: "",
      selectedDate: "",

    }
  },
  created() {
    moment.locale('es')
    this.today = moment().format(this.format);
    this.selectedDate = this.today;
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
        Somehow this fixes a proble with some weeks
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
      console.log(this.show);
      this.selectedDate  = date.format(this.format);
    },
    evaluateBlur(event)
    {
      let parent = event.explicitOriginalTarget.parentNode
      let value = false
      if (parent == document) {
        value = false
      }else {
        if (parent.closest('.comp-datepicker')) {
          value = true
        }
      }
      this.show = value
      return
    }
  }
}
</script>

<style lang="scss">
$red: #F44336;
$grey: #E0E0E0;
$light-grey: #E0E0E0;
$white: #FAFAFA;
$dark-grey: #212121;
$dark-grey-2: #757575;

@mixin position-center() {
    display: flex;
    //  align-items: center;
    //  justify-content: center;
}

.container {
    @include position-center;
}
@mixin header() {
    display: flex;
    justify-content: space-between;
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    background: $dark-grey;
    color: $white;
    padding: 5px 0;

}
.calendar {
    display: flex;
    width: 100%;
    flex-direction: column;
    background: $light-grey;
    transition: 'height' 500ms;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    .nav::selection{
      background: transparent;
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

        .day-of-week {
            padding: 5px 0;
            text-align: center;
            background: #424242;
            color: $white;
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
            color: $dark-grey;
            height: 25px;
            cursor: pointer;
            &.week-number {
                background: $dark-grey;
                color: $white;
            }
            &.today {
                background: $red;
                color: $white;
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
}
</style>
