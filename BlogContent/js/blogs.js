$(document).ready(function(){
     if (localStorage.user == undefined)  
     {
         window.location.href = "index.html";
     }

    $("#identity").text("Welcome, "+localStorage.user);


    //Load All Blogs
    var loadAllBlogs = function () {
        $.ajax({
            url: "http://localhost:53646/api/blog",
            method: "GET",
            /*headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },*/
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    console.log(xhr.responseJSON);

                    var data = xhr.responseJSON;

                    var str = '';
                    var sl = 1;
                    if(data.length>0)
                    {
                        for (var i = 0; i < data.length; i++) 
                        {
                            
                            str += "<tr>"+
                                        "<td>"+ sl + "</td>"+
                                        "<td><p>"+ data[i].text.substr(0,180) + "....</p></td>"+
                                        "<td>"+ data[i].post_by + "</td>"+
                                        "<td> <a href='details.html?blog_id=" + data[i].id + "'>Details</a></td>"+
                                "</tr>";
                            sl++;
                        }
                    }

                    else
                    {
                        str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#blogs tbody").html(str);
                }
                else {
                    alert("Something Went Wrong.");
                }
            }
        });
    }

    loadAllBlogs();

    //Load By Author
    var loadAllBlogsBYAuthor = function () {
        if($.trim($("#author").val()) !== "")
        {
            $.ajax({
                url: "http://localhost:53646/api/blog/post_by/"+$("#author").val(),
                method: "GET",
                /*headers: {
                    'Authorization': 'Basic ' + localStorage.authUser,
                },*/
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        console.log(xhr.responseJSON);
    
                        var data = xhr.responseJSON;
    
                        var str = '';
                        var sl = 1;
                        
                        if(data.length>0)
                        {
                            for (var i = 0; i < data.length; i++) 
                            {
                                
                                str += "<tr>"+
                                            "<td>"+ sl + "</td>"+
                                            "<td><p>"+ data[i].text.substr(0,180) + "....</p></td>"+
                                            "<td>"+ data[i].post_by + "</td>"+
                                            "<td> <a href='details.html?blog_id=" + data[i].id + "'>Details</a></td>"+
                                    "</tr>";
                                sl++;
                            }
                        }

                        else
                        {
                            str += "<tr><td colspan='4' align='middle'>NO DATA FOUND</td></tr>";
                        }
    
                        $("#blogs tbody").html(str);
                    }
                    else {
                        alert("Something Went Wrong.");
                    }
                }
            });
        }
        
        else
        {
            loadAllBlogs();
        }
    }
    $("#author").on("keyup change",function(){
        loadAllBlogsBYAuthor();
    }); 

    //Create Blogs
    var createBlog = function () {
        if($.trim($("#text").val()) !== "")
        {
            $.ajax({
                url: "http://localhost:53646/api/blog",
                method: "POST",
                data: {
                    text: $("#text").val(),
                    post_by: localStorage.user,
                    comment_count: 0,
                },
                /*headers: {
                    'Authorization': 'Basic ' + localStorage.authUser,
                },*/
                complete: function (xhr, status) {
                    if (xhr.status == 201) {                
                        loadAllPosts();
                    }
                    else {
                        alert("Something Went Wrong...");
                    }
                }
            });
        }

        else
        {
            alert("Please Write Something...");
        }
        
    }
    $("#post").on("click",function(){
        createBlog();
    }); 

});


