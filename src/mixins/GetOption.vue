<script>
export default {
  methods: {
    getOption: function(val) {
      return this.$root.optionsData.acf[val];
    },
    getHtmlOption: function(val) {
      return this.$root.optionsData.acf[val].replace(/(\r\n|\n|\r)/g,'<br />');
    }
  }
};
</script>
