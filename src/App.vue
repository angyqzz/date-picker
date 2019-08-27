<template>
  <div id="app">
    <date-picker @on-change="(val) => value = val" />
  </div>
</template>
<script>
import { DatePicker } from "./DatePicker";
export default {
  name: "App",
  props: [],
  components: {
    DatePicker
  },
  computed: {},
  methods: {},
  data() {
    return {
      value: ""
    };
  }
};
</script>
<style lang="less" scoped>
</style>
