<template>
  <div class="code-snippet">
    rules = [
    {
    xpath = "//xportse == true"
    }
    ]
  </div>
</template>
<script>
import HighLight from "./highlight";
const highlight = new HighLight();
export default {
  name: "CodeExample",
  props: [],
  components: {},
  computed: {},
  methods: {},
  mounted() {
    let block = document.querySelector(".code-snippet");
    highlight.formatCode(block);
  },
  data() {
    return {};
  }
};
</script>
<style lang="less">
table {
  white-space: pre;
  font-family: monospace;
}
/**** Parsed Code  ****/
.string {
  color: #a1e46d;
}
.special {
  color: #d6665d;
}
.special-js {
  color: #6de4d1;
}
.special-js-glob {
  color: #a1e46d;
  font-weight: bold;
}
.special-comment {
  color: #aaa;
}
.special-js-meth {
  color: #e46d8a;
}
.special-html {
  color: #e4d95f;
}
.special-sql {
  color: #1d968c;
}
.special-php {
  color: #597ea7;
}
</style>
