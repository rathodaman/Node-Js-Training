$("document").ready(function(){
    //SignUp Validation
    $("#signupForm").validate({  
      rules: {
                name: {
                  required :true,
                  minlength:3
                },
                email: "required",
                interest: {
                  required: true
                },
                phone: {
                  required: true,
                },
                password: {
                  required: true,
                  minlength: 6,
                  maxlength: 15
                }
      },
      messages: {
                name:{
                  required: "Please enter your Name",
                  minlength: "Your Name must consist of at least 3 characters"
                },
                email: "Please enter your Email Address",
              
                phone: {
                   required: "Please Enter Phone No.",
                },
                password: {
                  required: "Please Enter Password",
                  minlength: "Password must be at least 6 char long",
                  maxlength: "Password must be at least 15 char long",
                },
      },
      //signUp Ajax call
      submitHandler: function() {
        $.ajax({
            url:'/signup',
            type: 'post',
            data: {
              name: $("#name").val(),
              email: $("#email").val(),
              phone: $("#phone").val(),
              password:$("#password").val()
            },
            success: function(data) {
             console.log("data");
             console.log(data);
              if(data.status==200){
              // alert("SignUp Successfully")
               toastr.success('SignUp Successfully')
               $('#dynamic').load(location.href.replace('signup','add'));
               $('#signupForm')[0].reset();
              } else {
              //  alert("error")
                toastr.error('Error','Error in SignUp')
              }
            },
            error: function (error){
             console.log("aman error is:---");
             console.log(error);
             //alert(error);
            }
        })
      }
    });

    //Login Ajax call
    $(document).on('click', '#loginSubmit', function () {  
    $.ajax({
        type: 'post',
        url: '/login' ,
        data: {
              email: $("#email").val(),
              password:$("#password").val()
        },
        dataType: 'json',
        success: function(data){
          console.log(data);
          if(data.status==200){
            alert("Login successfully")
            //toastr.success('Login Success')
            $(location).attr("href", "/signup");
          }
        },
        error: function(err){
          console.log(err);
        }
    });
    });

    var currentFileId;
    //import Ajax call
    $(document).on('click', '#importButton', function () {  
    var fd = new FormData();
    var files = $('#file')[0].files[0];
    fd.append('file',files);
    $.ajax({
      type: 'post',
      url: '/upload' ,
      mimeType: "multipart/form-data",
      contentType: false,
      cache: false,
      processData: false,
      data: fd,
      dataType: 'json',
      success: function(data){
        console.log("success");
        console.log(data);
        if(data.status==200){
          currentFileId=data.currentFileId;
          // console.log("currentFileId");
          // console.log(currentFileId);
          console.log("If");
          $("#mydiv").empty();
          console.log("data.fields");
          console.log(data.fields);
          let options =" ";
          for(var i=0; i<data.fields.length; i++){
            options=options+`<option value="${data.fields[i].fields}">${data.fields[i].fields}</option>`
          }
          //let dbFields = ["name", "email", "phone"];
          for (let fieldIndex = 0; fieldIndex < data.firstRow.length; fieldIndex++) {
            let Row = `
            <tr id="${data.firstRow[fieldIndex]}-header">
                <td>${data.firstRow[fieldIndex]}</td>
                <td>${data.secondRow[fieldIndex]}</td>
                <td>
                  <select name="dbField" id="select" class="drop-select dropDown">
                    <option value=" " selected>select </option>
                    ${options}
                    <option value="addField" id="add" >Add More Fields</option>
                  </select>
                </td>
            </tr>`
            $("#mydiv").append(Row);
          }
          $('#fileForm')[0].reset();
          $("#hideData").append(`<div hidden>${data.fileName}</div>`);
        }
        else{
          $(location).attr("href", "/signup");
        }
      },
      error: function(err){
        console.log(err);
      }
    });
    });

    //import mapping call
    $(document).on('click', '#importMapping', function () {  
      console.log("currentFileId");
      console.log(currentFileId);
    // alert("Import for mapping");
    let fileName=$('#hideData').text();
    let skip=  false;
    if($("#skipFirstRow").prop('checked') == true){
          console.log("........")
          skip=true
    }
    console.log("skipFirstRow: " + skip);
    let data=[];
    $(".dropDown").each(function(index){
          if($(this).val()){
            if(data.includes($(this).val())){
              console.log("error in Mapping");
              toastr.error('Error','Choose Unique Mapping Field can not be repeated');
              data=[];
            }else{
              data.push($(this).val())
              console.log($(this).val());
              console.log(data);
            }
          }
    })
    if(!(data.includes("email")) && !(data.includes("phone"))){
            console.log("Email is Mandatory Field");
            toastr.error('Error','Email or phone is Mandatory Field');
            return true;
    }
    console.log("mylog");
    console.log(data);
    $.ajax({
          type: 'post',
          url: '/import' ,
          data: { data,fileName,skip,currentFileId},
          dataType: 'json',
          success: function(data){
            console.log("success");
            console.log(data);
            if(data.status==504){
              console.log("hey toster");
              toastr.error('Error','Choose Unique Mapping Field')
            } 
          },
          error: function(err){
            console.log(err);
          }
    });
    });

    //Add fields Ajax 
    $(document).on('change','.dropDown',function(){
    let temp=$(this);
    if ($(this).val() === "addField") {
          $('#myModal1').modal('show');
    }
    let data;
    $(document).on('click','#addfieldButton',function(){
          data= $("#addInputField").val()
          console.log("data: " + data);
          console.log(data);
          $.ajax({
                url: "/addFields",
                type: 'post',
                data:{newFieldName:data},
                success: function (data) {
                  console.log("aman",data)
                  console.log(data);
                  console.log(data.newField);
                  if(data.msg === "success"){
                    $('#addFieldForm')[0].reset();
                    console.log("inner h");
                    let newRow=`<option value="${data.newField}" id="${data.newField}">${data.newField}</option>`
                    $(newRow).insertBefore('.dropDown #add')
                    temp.val(data.newField).attr('selected',true)
                  }
                  else {
                    // alert("Field Already Exist")
                   $(".dropDown").prop('selectedIndex',0);
                  }
                },
                error: function (response) {
                  alert('server error');
                }
          })
    })
    });			
});            