$("document").ready(function(){
        $("#signupForm").validate({  
          rules: {
                    fname: {
                                required :true,
                                minlength:3
                            },
                    lname: "required",
                    interest: {
                      required: true
                    },
                    gender: {
                      required: true,
                    },
                    hobby: {
                      required: true,
                    },
                    address: {
                      required: true,
                      minlength: 4,
                      maxlength: 80
                    },
                    image:{
                        required: true
                    }
                    
          },
          messages: {
                    fname:{
                      required: "Please enter your firstname",
                      minlength: "Your firstname must consist of at least 3 characters"
                    },
                    lname: "Please enter your lastname",
                    interest: "Please choose your interest",
                    gender: "select Gender",
                    hobby: "Please select at least one hobby",
                    address: {
                      required: "Please Enter Address Details",
                      minlength: "Address must be at least 10 char long",
                      maxlength: "Address must be at least 150 char long",
                    },
                    image:{
                          required : "Select Your Image"
                        }      
          },
           submitHandler: function() {
                     let data = new FormData($("#signupForm")[0]);
                     console.log(data+"calling from")
                      $.ajax({
                        url:'/form',
                        enctype: "multipart/form-data",
                        contentType: false,
                        processData: false,
                        cache: false,
                        async: false,
                        type: 'POST',
                        data: data,
                        success: function(signupForm,status){
                          alert("Success")
                          $('#dynamic').load(location.href.replace('form','users'));
                          $('#signupForm')[0].reset();
                        }
                      })
            }
        })
        $(document).on('click', '.delete', function () {
          // function myFunction() {
          //   var txt;
          //   if (confirm("Press a button!")) {
          //     txt = "You pressed OK!";
          //   } else {
          //     txt = "You pressed Cancel!";
          //   }
          //   document.getElementById("demo").innerHTML = txt;
          // }
                var id = $(this).data('id')
                console.log(id)
                $.ajax({
                    type: 'delete',
                    url: '/' + id,
                    data: { id: id },
                    success: function(data){
                      console.log(data);
                      $('#' + id).remove(); 
                    },
                    error: function (err){
                      console.log(err);
                    }
                });
        });
        $(document).on('click', '.edit', function () {
                console.log("hello aman");
                $('#submit').hide();
                $('#update').show();
                $('#form-reset').show();
                $('.formName').hide();
                $('.UpdateformName').show();
                let id=$(this).data('id')
                console.log(id)
                $.ajax({
                    type:'GET',
                    url:'/edit/'+id,
                    success: function(data){
                      console.log(data);
                        $("#update").attr('data-id',id);
                        $("#fname").val(data.firstName)
                        $("#lname").val(data.LastName)
                        $("#interest").val(data.interest)
                        $('#' + data.gender).prop('checked', 'checked');
                        console.log(data.hobby)
                        for (let i = 0; i < data.hobby.length; i++) {
                          console.log(data.hobby[i])
                          $('#' + data.hobby[i]).prop('checked', 'checked');
                        }
                        $("#address").val(data.address)
                        console.log(data.image)
                        $(".image").html('<img src=/images/'+ data.image + ' height=50>');
                    },
                    error: function (err){
                      console.log(err);
                    }
                })         
        })
        $(document).on('click', '.form-re', function () {
          //console.log(45454)
          $('.image').html('');
        })
        // $(document).on('click', '#update', function () {      
        //         var id = $(this).data('id')
        //         console.log("id")
        //         console.log(id)
        //         let formdata = new FormData($("#signupForm")[0]);
        //         $.ajax({
        //           type: 'put',
        //           url: '/' + id,
        //           data: formdata,
        //           enctype: "multipart/form-data",
        //           dataType: 'json',
        //           processData: false,
        //           contentType: false,
        //           success: function(data){
        //              alert("Update Successful")
        //                   $('#dynamic').load(location.href.replace('form','users'));
        //           },
        //           error: function(err){
        //             console.log(err);
        //           }
        //         });
        // });
}); 
            