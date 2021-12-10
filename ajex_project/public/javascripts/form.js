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
                    // image:{
                    //     required: true
                    // }
                    
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
                    // image:{
                    //       required : "Select Your Image"
                    //     }      
          },
          //Submit Form data using Post method
           submitHandler: function() {
                     let data = new FormData($("#signupForm")[0]);
                     //console.log(data+"calling from")
                      $.ajax({
                        url:'/form',
                        enctype: "multipart/form-data",
                        contentType: false,
                        processData: false,
                        cache: false,
                        async: false,
                        type: 'POST',
                        data: data,
                        success: function(data) {
                          console.log("mm")
                          console.log(data.msg)
                          
                          if(data.type==="success"){
                            console.log("data"+data)
                            alert(data.msg);
                            $('#dynamic').load(location.href.replace('form','users'));
                            $('#signupForm')[0].reset();
                          } else {
                            alert(data.msg);
                          }
                          //alert("error")
                        },
                        error: function (error){

                          console.log("aman error is:---");
                          console.log(error);
                          //alert(error);
                        }
                      })
            }
        })

        //Delete click event using Delete method
        $(document).on('click', '.delete', function () {
                var id = $(this).data('id')
                console.log(id)
                $.ajax({
                    type: 'delete',
                    url: '/' + id,
                    data: { id: id },
                    success: function(data){
                      console.log(data);
                      alert("record Deleted");
                      $('#' + id).remove(); 
                    },
                    error: function (err){
                      console.log(err);
                    }
                });
        });
      
        //Update click event using Get method
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

        //Reset Form click event 
        $(document).on('click', '.form-re', function () {
          $('.image').html('');
        })

        //Update click event using Put method
        $(document).on('click', '#update', function () {      
                var id = $(this).data('id')
                console.log("id")
                console.log(id)
                let formdata = new FormData($("#signupForm")[0]);
                $.ajax({
                  type: 'put',
                  url: '/' + id,
                  data: formdata,
                  enctype: "multipart/form-data",
                  dataType: 'json',
                  processData: false,
                  contentType: false,
                  success: function(data){
                    let a= $("#signupForm").valid();
                    if(a==true){
                      if(data.type==="success"){
                        alert(data.msg);
                          $('#dynamic').load(location.href.replace('form','users'));
                          $('#signupForm')[0].reset();
                          $('.image').html('');
                          $('#submit').show();
                          $('#update').hide();
                          $('#form-reset').hide();
                          $('.formName').show();
                          $('.UpdateformName').hide();
                      }
                      else{
                        alert(data.msg);
                      }
                    }
                     
                  },
                  error: function(err){
                    console.log(err);
                  }
                });
        });

        //Search table click event
        $(document).on('click', '#table-search', function () {      
                console.log("id")
                //const href = location.href.replace('form','users')+'?' + $("#searchForm").serialize();
                const href = location.href.replace('form','users')+'?' + $("#searchForm").serialize();
                console.log("href"+href);
                console.log(href)
                $('#dynamic').load(href);
        });

        //Reset Searching table click event
        $(document).on('click', '#table-reset', function () {
          $('#dynamic').load(location.href.replace('form','users'));
        })

        //sorting click event
        $(document).on('click', '.sortingHeader', function () {
          let url = $(this).attr('data-url');
          console.log("before");
          console.log(url)
          // let url1=location.href.replace('form','users') + url + '&' + $("#searchForm").serialize();
          $('#dynamic').load(location.href.replace('form','users') + url + '&' + $("#searchForm").serialize());
          console.log(location.href.replace('form','users') + url + '&' + $("#searchForm").serialize());
          if(url.indexOf('asc') > 0){
            url = url.replace('asc','desc');
          } else if(url.indexOf('desc') > 0){
            url = url.replace('desc','asc');
          }
          console.log(url)
          console.log("after")
          $(this).attr('data-url', url);
        })

        //pagination click event
        $(document).on('click', '.page-item', function () {
          //console.log("aman rathod");
          let url = $(this).attr('data-url');
          $('#dynamic').load(location.href.replace('form','users') + url+ '&' + $("#searchForm").serialize()); 
        })

         //Export Button click event
         $(document).on('click', '#export', function () {
          let search=$("#searchForm").serialize();
          console.log("my search data is:"+search);
          const href = location.href.replace('form','users')+'?' +search;
          console.log("aman");
          console.log(href);
          $.ajax({
            url:href,
            type:'GET',
            success: function(data){

            }
          })
        })
        
        //Export To Email Button click event
        $(document).on('click', '#toemail', function () {
          //let url = $(this).attr('data-url');
          let search=$("#searchForm").serialize();
          console.log("my search data is:"+search);
          const href = location.href.replace('form','users')+'?' + $("#exportEmailForm").serialize()+'&'+search;
          console.log("aman");
          console.log(href);
          $.ajax({
            url:href,
            type:'GET',
            success: function(data){

            }
          })
        })
});            