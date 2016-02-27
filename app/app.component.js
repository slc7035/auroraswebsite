(function(app) {
  app.AppComponent =
    ng.core.Component({
      selector: 'my-app',
      template: '<h1>My First Angular 2 App</h1>' +
        '<a id="Setmore_button_iframe" style="float:none; position: fixed; right: -2px; top: 25%; display: block; z-index: 20000" href="https://my.setmore.com/shortBookingPage/047a7c9e-6675-4dfb-bce8-445458e61280">'+
          '<img border="none" src="https://my.setmore.com/images/bookappt/Setmore-Book-Now.png" alt="Book an appointment with Auroras Barber and beauty shop using SetMore" />' +
        '</a>'
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));
