$(document).ready(function () {

  // HIDE SIDE MOBILE BAR
  $(".side-nav li a").click(function(event) {
    $('.button-collapse').sideNav('hide');
  })

  // ACTIVATE DATE PICKER MATERIALIZE
  $('.datepicker').pickadate({
    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15 // Creates a dropdown of 15 years to control year
  });

  // INITIALIZE SELECT INPUT
  $("select").material_select();

});
