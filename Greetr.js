;(function(global, $) {
  "use strict";

  var Greetr = function(firstname, lastname, language) {
    return new Greetr.init(firstname, lastname, language);
  };

  var supportedLanguages = ['en', 'es'];

  var greetings = {
    en: 'Hello',
    es: 'Hola'
  };

  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };

  var logMessages = {
    en: 'Logged in',
    es: 'Inició sesión'
  };

  Greetr.init = function(firstname, lastname, language) {
    var self = this;
    self.firstname = firstname || '';
    self.lastname = lastname || '';
    self.language = language || 'en';

    self.validate();
  };

  Greetr.init.prototype = Greetr.prototype = {
    fullName: function() {
      return this.firstname + ' ' + this.lastname;
    },

    validate: function() {
      if (supportedLanguages.indexOf(this.language) === -1) {
        throw new Error('Invalid language.');
      }

      return this;
    },

    greeting: function() {
      return greetings[this.language] + ' ' + this.firstname + '!';
    },

    formalGreeting: function() {
      return formalGreetings[this.language] + ', ' + this.fullName();
    },

    greet: function(formal) {
        var msg = formal ?
          this.formalGreeting() : this.greeting();

        console.log(msg);
        return this;
    },

    log: function() {
      if (console) {
        console.log(logMessages[this.language] + ': ' + this.fullName());
      }

      return this;
    },

    setLang: function(newLang) {
      this.language = newLang || 'en';
      this.validate();
      return this;
    },

    HTMLGreeting: function(selector, formal) {
      if (!$) {
        throw new Error('jQuery not loaded');
      }

      if (!selector) {
        throw new Error('No selector specified');
      }

      var msg = formal ? this.formalGreeting() : this.greeting();

      $(selector).text(msg);
      return this;
    }


  };

  global.Greetr = global.G$ = Greetr;


})(window, $);
