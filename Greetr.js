;(function(global, $) {
  "use strict";

  // returns new Instance of Greetr
  var Greetr = function(firstname, lastname, language) {
    return new Greetr.init(firstname, lastname, language);
  };

  // supported languages
  var supportedLanguages = ['en', 'es'];

  // informal greetings
  var greetings = {
    en: 'Hello',
    es: 'Hola'
  };

  // formal greetings
  var formalGreetings = {
    en: 'Greetings',
    es: 'Saludos'
  };

  // message used when logging.
  var logMessages = {
    en: 'Logged in',
    es: 'Inició sesión'
  };

  // initialises Greetr with the firstname, lastname and language
  Greetr.init = function(firstname, lastname, language) {
    var self = this;
    self.firstname = firstname || '';
    self.lastname = lastname || '';
    self.language = language || 'en';

    // validates that the language passed in is valid.
    self.validate();
  };

  // Methods on the Greetr prototype.
  // This same prototype is used when initialising Greetr.
  Greetr.init.prototype = Greetr.prototype = {
    fullName: function() {
      return this.firstname + ' ' + this.lastname;
    },

    // validates that the language is valid / supported.
    validate: function() {
      if (supportedLanguages.indexOf(this.language) === -1) {
        throw new Error('Invalid language.');
      }

      return this;
    },

    // Returns an informal greeting.
    greeting: function() {
      return greetings[this.language] + ' ' + this.firstname + '!';
    },

    // returns a formal greeting
    formalGreeting: function() {
      return formalGreetings[this.language] + ', ' + this.fullName();
    },

    // generic greet function, that returns a greeting.
    // if the first parameter is defined and tueish a formal greeting is used.
    greet: function(formal) {
        var msg = formal ?
          this.formalGreeting() : this.greeting();

        console.log(msg);
        return this; // return the Greetr object to allow method chaining
    },

    // logs details about the object.
    log: function() {
      if (console) {
        console.log(logMessages[this.language] + ': ' + this.fullName());
      }

      return this; // return the Greetr object to allow method chaining
    },

    // Sets the language and validates that it is supported
    setLang: function(newLang) {
      this.language = newLang || 'en';
      this.validate();
      return this; // return the Greetr object to allow method chaining
    },

    // Generates a greeting and adds as text to the element matching the selector.
    // jQuery is used for this, and needs to be defined for this to work.
    // an error is thrown if jQuery is not available.
    HTMLGreeting: function(selector, formal) {
      if (!$) {
        throw new Error('jQuery not loaded');
      }

      if (!selector) {
        throw new Error('No selector specified');
      }

      var msg = formal ? this.formalGreeting() : this.greeting();

      $(selector).text(msg);
      return this; // return the Greetr object to allow method chaining
    }
  };

  // attaches Greetr to the global (window) object with an alias of G$
  global.Greetr = global.G$ = Greetr;

})(window, $);
