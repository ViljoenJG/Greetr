
$('#loginbtn')
  .click(function () {
    var lng = $('#lang').val() || 'en';
    var greeter = G$('Kobus', 'Viljoen');
    $('#logindiv').hide();

    greeter
      .setLang(lng)
      .greet(true)
      .HTMLGreeting('#greeting', true);
  });
