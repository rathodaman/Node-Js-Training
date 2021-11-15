$(document).ready(function () {
	$("#form").validate({
		rules: {
			name: "required",
			gender: 'required',
			address: 'required',
			hobbies: 'required',
			city: 'required',
			image: 'required',

		},
		messages: {
			name: "Please enter the Name",

			gender: {
				required: "Please Select Gender",
			},
			address: {
				required: "Please Enter the Address",

			},

			hobbies: {
				required: "Please Select Hobbies",

			},
			city:
			{
				required: "Please enter the city",


			},

			image:
			{
				required: 'Please Select Image'
			}

		},

		submitHandler: function (form, e) {
			e.preventDefault();
			var formdata = new FormData($(form).get(0));
			$.ajax({
				url: "/",
				type: 'POST',
				data: formdata,
				cache: false,
				dataType: 'json',
				processData: false,
				contentType: false,
				success: function (data) {
					alert('Data inserted Success')
					if (data.msg === "success") {
						let mydata = data.mydata;
						if (mydata) {
							$("#table").append("<tr class=" + mydata._id + "><td>" + mydata.name + "</td><td>" + mydata.address + "</td><td>" + mydata.gender + "</td><td>" + mydata.city + "</td><td>" + mydata.hobbies + "</td>" + "<td><img src='/images/" + mydata.image + "' height=100></td>" + "<td><a class='edit' href='javascript:void(0)' data-id='" + mydata._id + "'>Edit</a> | <a class='delete' href='javascript:void(0)' data-id='" + mydata._id + "'>Delete</a></td></tr>");
						}
					} else {
						//show error
					}
				},
				error: function (response) {
					alert('server error');
				}
			});

		},

	});


	$(document).on('click', '.delete', function () {

		var id = $(this).data('id')
		console.log(id)
		$.ajax({
			type: 'delete',
			url: '/' + id,
			data: { id: id },
			success: (data) => {
				console.log(data);
				$('.' + id).remove();
			},
			error: (err) => {
				console.log(err);
			}
		});
	});

	$(document).on('click', '.edit', function () {
		$("#submit").remove();

		var id = $(this).data('id')
		$("#update").append("<input type=button data-id='" + id + "' class = update value=Update>");
		$("#reset").append("<input type=button data-id='" + id + "' class = reset value=Reset>");
		console.log(id)

		$.ajax({
			method: 'get',
			url: '/' + id,
			data: { id: id },
			success: (data) => {
				console.log("mm", data);
				console.log("am", data.image);
			
				$("#name").val(data.name)
				$("#address").val(data.address)
				$('#' + data.gender).prop('checked', 'checked');
				for (i = 0; i < data.hobbies.length; i++) {
					$('#' + data.hobbies[i]).prop('checked', 'checked');
				}
				$("#city").val(data.city)
				$('.myimg').append('<img src=/images/' + data.image + ' height=50>');
			},
			error: (err) => {
				console.log(err);
			}
		});
	});
	$(document).on('click', '.update', function () {
					
		var id = $(this).data('id')
		console.log("edt",id)
		 var formdata = new FormData($(form).get(0));
		

		$.ajax({
			type: 'put',
			url: '/' + id,
			data: formdata,
			dataType: 'json',
			processData: false,
			contentType: false,
			success: (data) => {
				console.log("neema", data);
				$("."+id).html("<td>" + data.name + "</td><td>" + data.address + "</td><td>" + data.gender + "</td><td>" + data.city + "</td><td>" + data.hobbies + "</td>" + "<td><img src='/images/" + data.image + "' height=100></td>" + "<td><a class='edit' href='javascript:void(0)' data-id='" + id + "'>Edit</a> | <a class='delete' href='javascript:void(0)' data-id='" + id + "'>Delete</a></td>");
			},
			error: (err) => {
				console.log(err);
			}
		});
	});
	$(document).on('click', '.reset', function () {
					
		$('#form').reset();
	});
})