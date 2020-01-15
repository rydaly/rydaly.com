<script>
export default {
  methods: {
    widont: function(text) {
      var inlineTags = 'a|em|span|strong|i|b';
      var word = '(?:<(?:'+inlineTags+')[^>]*?>)*?[^\\s<>]+(?:</(?:'+inlineTags+')[^>]*?>)*?';
      var re = function (regexp, flag) {
        return new RegExp(regexp, flag);
      };
      var reWidont = re(
            '('+                                                     // matching group 1
              '\\s+'+word+                                           // space and a word with a possible bordering tag
              '\\s+'+word+                                           // space and a word with a possible bordering tag
            ')'+
            '(?:\\s+)'+                                              // one or more space characters
            '('+                                                     // matching group 2
              '[^<>\\s]+'+                                           // nontag/nonspace characters
              '(?:\\s*</(?:a|em|span|strong|i|b)[^>]*?>\\s*\\.*)*?'+ // one or more inline closing tags
                                                                    // can be surronded by spaces
                                                                    // and followed by a period.
              '(?:\\s*?</(?:p|h[1-6]|li|dt|dd)>|$)'+                 // allowed closing tags or end of line
            ')', 'gi');

      return text.replace(reWidont, '$1<span class="widont">&nbsp;</span>$2');
    }
  }
};
</script>
