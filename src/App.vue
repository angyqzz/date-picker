<template>
  <div id="app">
    <date-picker @on-change="(val) => value = val" />
    <code-example />
  </div>
</template>
<script>
import { DatePicker } from "./DatePicker";
import CodeExample from "./Highlight/CodeExample";
export default {
  name: "App",
  props: [],
  components: {
    DatePicker,
    CodeExample
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
