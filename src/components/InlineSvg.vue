<template>
  <span class="icon"></span>
</template>

<script>
// let cache = new Map();

export default {
  props: {
    src: { type: String, required: true }
  },
  async mounted() {
    // let filetype = this.src.split(".").pop();

    this.$el.innerHTML = "<img src=" + this.src + ' alt="brand-logo">';

    // if (filetype === "svg") {
    //   // This works, but SVGs need to be pristine - lots of jank with shitty SVGs
    //   var that = this;
    //   var request = new XMLHttpRequest();
    //   request.open("GET", this.src, true);
    //   request.onload = function() {
    //     if (request.status >= 200 && request.status < 400) {
    //       // Setup a parser to convert the response to text/xml in order for it
    //       // to be manipulated and changed
    //       var parser = new DOMParser(),
    //         result = parser.parseFromString(request.responseText, "text/xml"),
    //         inlinedSVG = result.getElementsByTagName("svg")[0];
    //       // console.log(result);
    //       console.log(this.$el);

    //       that.$el.appendChild(inlinedSVG);
    //     }
    //   };
    //   request.send();
    // } else {
    //   this.$el.innerHTML = "<img src=" + this.src + ' alt="brand-logo">';
    // }
  }
};
</script>
