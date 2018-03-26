// CASHIER SCRIPTS //

////////////////////////////////////////////////
//GLOBAL DECLARATIONS
var count = 2;  // starting number of next transaction
var message = "clicked"; //error handling

$('.othersPayment, #btn-add-particular, #others-summary, .method, .partial, .others, .details, .tuitionPayment').hide();

////////////////////////////////////////////////
//TRANSACTION TOGGLE SCRIPT
$('#othersBtn').click(function() {
  
  $(this).addClass("active");
  $('#enrollmentBtn').removeClass("active");
  $('.enrollmentPayment, .addPayment, .enrollment-summary, #btn-add').hide();
  $('.othersPayment, #btn-add-particular, #others-summary,.addParticularPayment').show();
});
$('#enrollmentBtn').click(function() {
  
  $('.addParticularPayment').hide();
  $(this).addClass("active");
  $("#othersBtn").removeClass("active");
  $('.othersPayment, #btn-add-particular, #others-summary').hide();
  $('.enrollmentPayment, #btn-add, .enrollment-summary').show();
  $('.othersPaymentRows').hide();
  
});
    
////////////////////////////////////////////////
// INPUT FUNCTIONS
// TRIGGERS THE MONTH INPUT, ONLY APPEARS WHEN PARTICULAR == TUITION FEE 
// DISABLES/ENABLES ADD PAYMENT BUTTON DEPENDING ON THE PARTICULAR
$("#particularList").change(function(){
  /*var month= '<div class="details">'+
      '<label class="card-subtitle">Month:</label>'+
      '<select class="custom-select btn-block" required>'+
      '<option selected>Choose payment month:</option>'+
      '<option value="January">January</option>'+
      '<option value="February">February</option>'+
      '<option value="March">March</option></select></div>';*/
      
  if ($(this).val() != "TuitionFee"){
      $( ".details").hide();             
      $("#paymentTypeRow").show();        
      $("#btn-add").prop("disabled", true); //adds disabled attribute
                                            //to #btn-add if
                                            //particular is not tuition fee
      $(".addPayment").hide();
      $('.tuitionPayment').hide();
  }
  else{
    //alert("Clicked tuition fee");
      $("#paymentTypeRow").hide();
      $('.details').show();
      $("#btn-add").removeAttr('disabled');
      $('.tuitionPayment').show();
    // You may use JSON file for the months or a Django package
  }
});

////////////////////////////////////////////////
// TRIGGERS THE AMOUNT INPUT IF USER PICKS PARTIAL PAYMENT
// ONLY SHOWS UP IF PAYMENT TYPE == PARTIAL
// DOES NOT APPEAR IF PARTICULAR == TUITION FEE
$("#paymentType").change(function(){
  /*var partial = '<div class="partial">'+
                '<label class="card-subtitle">Amount:</label>'+
                '<input type="text" class="form-control">'+
                '</div>';*/
                
  if ($(this).val() == "Partial"){
    //$('#partial').append(partial);
    $( ".partial" ).show();
  }
  else{
    $( ".partial" ).hide();
  }
});
  
////////////////////////////////////////////////
//INCREMENTS PAYMENT #
//ADDS A NEW PAYMENT TRANSACTION FOR TUITION FEES *ONLY*
//ISSUES: MAY SKIP PAYMENT NUMBERS. too lengthy.
var add = function (){
    var num = 1;
    if(num >=100) return;
    var transaction = '<div class="addPayment addParticularPayment">'+
        '<div class="row paymentPanel">'+
          '<div class="col-md-10">'+
            '<h5 class="payment-heading">Payment Details #'+count+'</h5>'+
          '</div>'+
          '<div class="col-md-2">'+
            '<button type="button" class="btn btn-danger btn-sm" onclick="deleteRow(this)">Remove</button>'+
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
              '<option value="March">March</option></select></div>'+
            '</div>'+
          '</div>'+
          '<div class="row">'+
            '<div class="col-md-6">'+
              '<div class="tuitionPayment">'+
               '<label class="card-subtitle">Amount:</label>'+
               '<input type="text" class="form-control">'+
              '</div>'+
            '</div>'+
          '</div>'+
          '<div class="col-md-6">'+
            '<div id="partial"></div>'+
          '</div>'+
      '</div>';
      
    $('#paymentsPanel').append(transaction);
    num++;
    count++;
 };
 

////////////////////////////////////////////////
//FOR OTHERS INPUT IN PARTICULAR NAME
//USE JSON TO PASS INPUT DATA TO THE APPENDED VALUES
$("#feesParticularList").on("change",function(){
 /* var selected = '<div class="others">'+
                '<label class="card-subtitle">Specify:</label>'+
                '<h3 class="link">Level 3 Backpack</h3>'+
                '</div>';*/
                
  if ($(this).val() == "others"){
    $('#othersModal').modal('show');
    $('.others').show();
  }
  else{
    $('.others').hide();
  }
});


////////////////////////////////////////////////
//ADDS ANOTHER PAYMENT TRANSACTION FOR OTHERS
//ISSUES: 'OTHERS' MODAL DOESN'T WORK IN NEXT ITERATION
var addParticular = function (){
    var num = 1;
    if(num >=100) return;
  var transaction = '<div class="addParticularPayment">'+
      '<div class="row">'+
        '<div class="col-md-6">'+
          '<label class="card-subtitle">Particular Name:</label>'+
          '<select onchange="particular(value)" class="custom-select btn-block" id="feesParticularList" required>'+
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
          '<div class="modal" tabindex="-1" role="dialog" id="othersModal">'+
            '<div class="modal-dialog modal-sm" role="document">'+
              '<div class="modal-content">'+
                '<div class="modal-header">'+
                  '<h5 class="modal-title">Item details</h5>'+
                  '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
                    '<span aria-hidden="true">&times;</span>'+
                  '</button>'+
                '</div>'+
                '<div class="modal-body">'+
                  '<div class="row">'+
                    '<div class="col">'+
                      '<label>Specific Name:</label>'+
                      '<input type="text" class="form-control" id="particularName"/>'+
                    '</div>'+
                  '</div>'+
                  '<div class="row">'+
                    '<div class="col">'+
                      '<label>Price Amount:</label>'+
                      '<input type="text" class="form-control" id="priceAmount"/>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="modal-footer">'+
                  '<button type="button" class="btn btn-primary">Save Item</button>'+
                  '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'+
                '</div>'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>'+
        '<div class="col-md-4">'+
          '<div class="others" id="specify">'+
            '<label class="card-subtitle">Specify:</label>'+
            '<h3 class="link">Level 3 Backpack</h3>'+
           '</div>'+
        '</div>'+
        '<div class="col-md-2">'+
          '<button type="button" class="btn btn-danger btn-sm" onclick="deleteParticularRow(this)">Remove</button>'+
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
    num++;
};


function particular ($val){
  if($val != "others"){
    $('#specify').remove()
  }
  else{
    $('#specify').show();
    $('#othersModal').modal('show');
  }
};

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
//DELETE ROWS
function deleteRow(obj){
  $(obj).closest('.addPayment').remove();
}
function deleteParticularRow(obj){
  $(obj).closest('.addParticularPayment').remove();
}


/*function deleteRow(obj){
  $(obj).closest('.row').remove();
}*/
