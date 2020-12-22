$(document).ready(function(){
    $("#registrationform").attr("hidden", "hidden");
    $("#SignIn").on("click",function(){
        $("#registrationform").attr("hidden", "hidden");
        $("#loginform").removeAttr("hidden", "hidden");
    });
    $("#SignUp").on("click",function(){
        $("#loginform").attr("hidden", "hidden");
        $("#registrationform").removeAttr("hidden", "hidden");
    }); 

    //REGISTRATION
    var register = function() 
    {
        if($.trim($("#regusername").val()) !== "" && $.trim($("#regpassword").val()) !== "")
        {
            $.ajax({
                url: "http://localhost:53646/api/login/",
                method: "POST",
                headers: "Content-Type:application/json",
                data: {
                    username: $("#regusername").val(),
                    password: $("#regpassword").val(),
                },
                complete: function(xmlhttp, status) {
                    if (xmlhttp.status == 201) {
                        alert("Congratulations. You have been registered.");
                    } else {
                        alert("Try With Different Username.");
                    }
                }
            })
        }
        else
        {
            alert("Fill Properly.");
        }
    }
    $("#register").on("click",function(){
        register();
    }); 

    //LOGIN
    var login = function() 
    {
        if($.trim($("#username").val()) !== "" && $.trim($("#password").val()) !== "")
        {
            $.ajax({
                url: "http://localhost:53646/api/login/"+$("#username").val(),
                method: "GET",
                complete: function(xmlhttp, status) {
                    if (xmlhttp.status == 200) {

                        var user = xmlhttp.responseJSON;
                        
                        if($("#password").val() !== user.password)
                        {
                            alert("Incorrect Password.");
                        }
                        else
                        {
                            localStorage.user = user.username;
                            alert("Welcome: "+localStorage.user);
                            window.location.href = "http://localhost/BlogContent/blogs.html";
                        }
                               
                    } else {
                        alert("Invalid User");
                    }
                }
            })
        }
        else
        {
            alert("Fill Properly.");
        }
    }
    $("#login").on("click",function(){
        login();
    }); 
});
