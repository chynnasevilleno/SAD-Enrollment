// CASHIER SCRIPTS //

////////////////////////////////////////////////
//GLOBAL DECLARATIONS
var count = 2;  // starting number of next transaction
var message = "clicked"; //error handling

$('.othersPayment, #btn-add-particular, #others-summary, .method').hide();

////////////////////////////////////////////////
//TRANSACTION TOGGLE SCRIPT
$('#othersBtn').click(function() {
  
  $(this).addClass("active");
  $('#enrollmentBtn').removeClass("active");
  $('.enrollmentPayment, .addPayment, .enrollment-summary, #btn-add').hide();
  $('.othersPayment, #btn-add-particular, #others-summary').show();
});
$('#enrollmentBtn').click(function() {
  
  $(this).addClass("active");
  $("#othersBtn").removeClass("active");
  $('.othersPayment, #btn-add-particular, #others-summary').hide();
  $('.enrollmentPayment, #btn-add, .enrollment-summary').show();
  $('.othersPaymentRows').remove();
  
});
    
////////////////////////////////////////////////
// INPUT FUNCTIONS
// TRIGGERS THE MONTH INPUT, ONLY APPEARS WHEN PARTICULAR == TUITION FEE 
// DISABLES/ENABLES ADD PAYMENT BUTTON DEPENDING ON THE PARTICULAR
$("#particularList").change(function(){
  var month= '<div class="details">'+
      '<label class="card-subtitle">Month:</label>'+
      '<select class="custom-select btn-block" required>'+
      '<option selected>Choose payment month:</option>'+
      '<option value="January">January</option>'+
      '<option value="February">February</option>'+
      '<option value="March">March</option></select></div>';
      
  if ($(this).val() != "TuitionFee"){
      $( ".details" ).remove();             
      $( "#paymentTypeRow" ).show();        
      $("#btn-add").prop("disabled", true); //adds disabled attribute
                                            //to #btn-add if
                                            //particular is not tuition fee
      $( ".addPayment" ).remove();
  }
  else{
    //alert("Clicked tuition fee");
      $( "#paymentTypeRow" ).hide();
      $('#particularDetails').append(month);
      $("#btn-add").removeAttr('disabled');

    // You may use JSON file for the months or a Django package
  }
});

////////////////////////////////////////////////
// TRIGGERS THE AMOUNT INPUT IF USER PICKS PARTIAL PAYMENT
// ONLY SHOWS UP IF PAYMENT TYPE == PARTIAL
// DOES NOT APPEAR IF PARTICULAR == TUITION FEE
$("#paymentType").change(function(){
  var partial = '<div class="partial">'+
                '<label class="card-subtitle">Amount:</label>'+
                '<input type="text" class="form-control">'+
                '</div>';
                
  if ($(this).val() == "Partial"){
    $('#partial').append(partial);
  }
  else{
    $( ".partial" ).remove();
  }
});
  
////////////////////////////////////////////////
//INCREMENTS PAYMENT #
//ADDS A NEW PAYMENT TRANSACTION FOR TUITION FEES *ONLY*
//ISSUES: MAY SKIP PAYMENT NUMBERS. too lengthy.
$("#btn-add").click(function(){
  var transaction = '<div class="addPayment">'+
        '<div class="row paymentPanel">'+
          '<div class="col-md-10">'+
            '<h5 class="payment-heading">Payment Details #'+count+'</h5>'+
          '</div>'+
          '<div class="col-md-2">'+
            '<button type="button" class="btn btn-danger btn-sm" onclick="deleteRow()">Remove</button>'+
          '</div>'+
        '</div>'+
        '<div class="row">'+
          '<div class="col-md-6">'+
            '<label class="card-subtitle">Particular:</label>'+
            '<select class="custom-select btn-block" id="particularList" required>'+
              '<option selected>Choose particular:</option>'+
              '<option value="TuitionFee">Tuition Fee</option>'+
            '</select>'+
          '</div>'+
          '<div class="col-md-6">'+
            '<div class="details">'+
              '<label class="card-subtitle">Month:</label>'+
              '<select class="custom-select btn-block" required>'+
              '<option selected>Choose payment month:</option>'+
              '<option value="January">January</option>'+
              '<option value="February">February</option>'+
              '<option value="March">March</option></select></div>';
            '</div>'+
          '<div class="col-md-6">'+
            '<div id="partial"></div>'+
          '</div>'+
      '</div>';
    $('#paymentsPanel').append(transaction);
    count++;
 });
 

////////////////////////////////////////////////
//FOR OTHERS INPUT IN PARTICULAR NAME
//USE JSON TO PASS INPUT DATA TO THE APPENDED VALUES
$("#feesParticularList").on("change",function(){
  var selected = '<div class="others">'+
                '<label class="card-subtitle">Specify:</label>'+
                '<h3 class="link">Level 3 Backpack</h3>'+
                '</div>';
                
  if ($(this).val() == "others"){
    $('#othersInput').append(selected);
    $('#othersModal').modal('show');
  }
  else{
      $( ".others" ).remove();
  }
});


////////////////////////////////////////////////
//ADDS ANOTHER PAYMENT TRANSACTION FOR OTHERS
//ISSUES: 'OTHERS' MODAL DOESN'T WORK IN NEXT ITERATION
$("#btn-add-particular").click(function(){
  var transaction = '<div class="othersPaymentRows">'+
      '<div class="row">'+
        '<div class="col-md-6">'+
          '<label class="card-subtitle">Particular Name:</label>'+
          '<select class="custom-select btn-block" id="feesParticularList" required>'+
            '<option selected>Choose particular:</option>'+
            '<option value="1">Form 137</option>'+
            '<option value="2">Diploma</option>'+
            '<option value="3">Certificate</option>'+
            '<option value="4">Entrance Test</option>'+
            '<option value="5">Identification Card</option>'+
            '<option value="6">Uniform</option>'+
            '<option value="7">Books</option>'+
            '<option value="others">Others</option>'+
          '</select>'+
        '</div>'+
        '<div class="col-md-6">'+
          '<div id="othersInput"></div>'+
        '</div>'+
      '</div>'+
      '<div class="row">'+
        '<div class="col-md-6">'+
          '<label class="card-subtitle">Price Amount:</label>'+
          '<h2 class="link"><span class="currency"> 0.00</span></h2>'+
        '</div>'+
      '</div>'+
    '</div>';
    $('#paymentsPanel').append(transaction);
});


////////////////////////////////////////////////
//SPECIFY PAYMENT METHOD
$("#paymentMethod").change(function(){
  /*var method = '<div class="method">'+
                '<label class="card-subtitle">Specify:</label>'+
                '<input type="text" class="form-control">'+
                '</div>';*/
      
  if ($(this).val() == "Others"){
    //$('#paymentOthers').append(method);
    $('.method').show();
    $("#paymentAmount").removeAttr('disabled');
    $("#ORNumber").removeAttr('disabled');
  }
  else if ($(this).val() == "Promissory"){
    $( ".method" ).hide();
    $('#paymentAmount').prop("disabled", true);
    $('#ORNumber').prop("disabled", true);
  }
  else{
    $( ".method" ).hide();
    $("#paymentAmount").removeAttr('disabled');
    $("#ORNumber").removeAttr('disabled');
  }
});


////////////////////////////////////////////////
//TOMORROW PLS FIX CHYNNA KJDSHAKJFGDSJHFGJHKDSF
function deleteRow(){
  $(obj).closest('.addPayment .paymentPanel').remove();
}
