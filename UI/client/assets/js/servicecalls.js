var service = {
	
    validateLogin: function (uname, pwd) {
        console.log("service called");

        var loginJSONReq = {
            "username": uname,
            "password": pwd
        };
        console.log(loginJSONReq);
        $.ajax({
            type: 'GET',
            url: "http://52.206.121.100/appengage/getUserValidated",
            contentType: "application/json",
            dataType: "json",
            timeout: 180000,  //180 sec
            //data: JSON.stringify(loginJSONReq),
            data: "username="+uname+"&password="+pwd,
            success: function (data) {
                console.log(data);
                if (data.msg === "Success") {
                    sessionStorage.setItem("userName", data.name);
                    window.location.href = "index.html";
                }
                else {
                    alert("Login Failed");
                }

            },
            error: function () {
                alert("Error");
            }

        });
    },
	
	messaging: function(){
		console.log("messaging service called");
		
		$.ajax({
			type: 'GET',
			url: "http://52.206.121.100/appengage/getCampaignData",
			contentType: "application/json",
			dataType: "json",
			timeout: 180000,
			success: function(data){
				console.log(data);
				showMessagingTable(data, 'tbl-messaging');
			}
		});
	}
	
};