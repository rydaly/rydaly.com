<template>
  <div id="contact">
    <div class="content">
      <div class="content__inner">
        <h2 class="text-title">{{ getOption('cp_header') }}</h2>
        <p>{{ getOption('cp_lead_text') }}</p>
        <div class="contact-form">
          <form v-on:submit.prevent="submitForm" autocomplete="on">
            <label for="name">Your Name</label>
            <input
              v-model="name"
              type="text"
              id="name"
              name="name"
              placeholder=""
              required
            />
            <label for="email">Your Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              name="email"
              placeholder=""
              required
            />
            <label for="message">Your Message</label>
            <textarea
              v-model="message"
              id="message"
              name="message"
              placeholder=""
              required
            ></textarea>
            <input type="submit" class="btn btn--small" value="Say Hello" />
          </form>
        </div>
        <div
          id="form-feedback-msg"
          class="display-msg"
          v-bind:class="{ show: formSubmitted, error: hasError }"
        >
          <p>{{ displayMsg }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GetOption from '../mixins/GetOption';

export default {
  name: 'Contact',
  mixins: [GetOption],
  data() {
    return {
      name: '',
      email: '',
      message: '',
      displayMsg: '',
      formSubmitted: false,
      hasError: false
    };
  },
  methods: {
    submitForm() {
      this.formSubmitted = false;
      this.hasError = false;

      let data = {
        name: this.name,
        email: this.email,
        message: this.message
      };

      this.$http
        .post(
          'https://rydaly.com/app/php/processContactForm.php',
          this.parameterize(data),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
          }
        )
        .then(response => {
          this.formSubmitted = true;
          // console.log('success :: ', response);
          if (response.body.success) {
            this.displayMsg = response.body.messageSuccess;
            this.name = this.email = this.message = '';
          } else {
            this.displayMsg = response.body.messageError;
            this.hasError = true;
            this.displayMsg =
              'Uh oh, something went wrong! Please give it another go.';
          }
          this.scrollToMsg();
        })
        .catch(error => {
          console.log('error :: ', error);
          this.hasError = true;
          this.displayMsg =
            'Uh oh, something went wrong! Please give it another go.';
          this.scrollToMsg();
        });
    },
    parameterize(data) {
      let returnString = '',
        d;
      for (d in data) {
        if (data.hasOwnProperty(d)) returnString += d + '=' + data[d] + '&';
      }
      return returnString.slice(0, returnString.length - 1);
    },
    scrollToMsg() {
      var el = document.getElementById('form-feedback-msg');
      el.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }
};
</script>
