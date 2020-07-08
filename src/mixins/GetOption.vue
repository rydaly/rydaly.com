<script>
export default {
  methods: {
    getOption: function(val) {
      // return val;
      return this.$root.optionsData[val];
    },
    getHtmlOption: function(val) {
      // return val;
      return this.$root.optionsData[val].replace(/(\r\n|\n|\r)/g,'<br />');
    }
  }
};
</script>
