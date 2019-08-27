<template>
  <div class="vl-datepicker">
    <div class="flex">
      <a @click="prevMonth()">prev</a>
      <h3>{{currentDate.format('MMMM YYYY')}}</h3>
      <a @click="nextMonth()">next</a>
    </div>
    <div class="flex">
      <div
        v-for="day in weekDays"
        :key="day"
      >{{day}}</div>
    </div>
    <div
      class="flex"
      v-for="(week, index) in dateMatrix"
      :key="'week_' + index"
    >
      <div
        v-for="(day, index) in week"
        :key="'day_' + index"
        @click="selectDay(day)"
      >
        {{day}}
      </div>
    </div>
  </div>
</template>
<script>
const Props = {
  date: {
    type: String,
    default: ""
  },
  time: {
    type: Boolean,
    default: false
  }
};
import moment from "moment";
export default {
  name: "DatePicker",
  props: Props,
  components: {},
  computed: {},
  watch: {
    currentDate(newValue) {
      this.renderCalendar();
    }
  },
  methods: {
    selectDay(date) {
      let selectedDate = this.getCurrentDate().set({ date });
      this.$emit("on-change", selectedDate);
    },
    prevMonth() {
      this.currentDate = this.getCurrentDate().subtract(1, "month");
    },
    nextMonth() {
      this.currentDate = this.getCurrentDate().add(1, "month");
    },
    getCurrentDate() {
      return moment(this.currentDate);
    },
    renderCalendar() {
      let startOfMonth = this.getCurrentDate().startOf("month");
      let endOfMonth = this.getCurrentDate().endOf("month");

      let diffInWeeks = Math.ceil(endOfMonth.diff(startOfMonth, "weeks", true));

      let dateMatrix = [];

      for (let i = 0; i < diffInWeeks + 1; i++) {
        dateMatrix = dateMatrix.concat([0, 0, 0, 0, 0, 0, 0]);
      }

      let startDate = startOfMonth.isoWeekday();
      let endDate = endOfMonth.isoWeekday();

      let day = 1;

      for (let i = 0; i < dateMatrix.length; i++) {
        if (i >= startDate - 1 && day <= endOfMonth.date()) {
          dateMatrix[i] = day;
        }
        if (i >= startDate - 1) {
          day += 1;
        }
      }

      dateMatrix = dateMatrix.map((item, i) => {
        return dateMatrix.slice(i * 7, i * 7 + 7);
      });

      this.dateMatrix = dateMatrix.filter(item => item.length !== 0);
    }
  },
  mounted() {
    this.renderCalendar();
  },
  data() {
    return {
      currentDate: moment(),
      weekDays: ["e", "t", "n", "r", "l", "p"],
      dateMatrix: []
    };
  }
};
</script>
<style lang="less" scoped>
@import "datepicker.less";
</style>
