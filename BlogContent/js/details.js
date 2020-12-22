$(document).ready(function () {
    if (localStorage.user == undefined)  
    {
        window.location.href = "index.html";
    }

    

    var url_string = window.location;
    var url = new URL(url_string);
    var blog_id = url.searchParams.get("blog_id");

    if (blog_id == null) 
    {
        window.location.href = "Index.html";
    }

    //Load Perticular Post
    var loadPost = function () {
        $.ajax({
            url: "http://localhost:53646/api/blog/" + blog_id,
            method: "GET",
            // headers: {
            //     'Authorization': 'Basic ' + localStorage.authUser,
            // },
            complete: function (xhr, status) {
                if (xhr.status == 200) 
                {
                    var data = xhr.responseJSON;
                    
                    if(data.post_by == localStorage.user)  
                    {
                        $("#text").removeAttr("readonly", "readonly");
                        $("#update").removeAttr("hidden", "hidden");
                        $("#delete").removeAttr("hidden", "hidden");
                    }

                    else
                    {
                        $("#text").attr("readonly", "readonly");
                        $("#update").attr("hidden", "hidden");
                        $("#delete").attr("hidden", "hidden");
                        //$("#update").removeAttr("hidden", "hidden");
                    }

                    $("#text").text(data.text);    
                    
                } 
                
                else
                {
                    window.location.href = "http://localhost/BlogContent/blogs.html";   
                }
            
            }
        });
    }

    loadPost();

    //Load Comments of that Post
    var loadCommentsByBlog = function () {
        $.ajax({
            url: "http://localhost:53646/api/blog/"+blog_id+"/comment",
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
                            if(data[i].commet_by == localStorage.user || data[i].blog.post_by == localStorage.user)
                            {
                                str += "<tr>"+
                                        "<td align='center'>"+ data[i].commet_by + "</td>"+
                                        "<td>"+ data[i].comment1 + "</td>"+
                                        "<td align='center'> <a href='modifycomment.html?blog_id=" + data[i].post_id + "&comment_id=" + data[i].id + "'>Modify</a></td>"+
                                    "</tr>";
                                sl++;
                            }

                            else
                            {
                                str += "<tr>"+
                                        "<td align='center'>"+ data[i].commet_by + "</td>"+
                                        "<td>"+ data[i].comment1 + "</td>"+
                                        "<td> </td>"+
                                    "</tr>";
                                sl++;
                            }
                            
                            
                        }
                    }

                    else
                    {
                        str += "<tr><td colspan='3' align='middle'>NO DATA FOUND</td></tr>";
                    }

                    $("#comments tbody").html(str);
                }
                else {
                    alert("Something Went Wrong.");
                }
            }
        });
    }

    loadCommentsByBlog();

    //Update Post
    var updatePost = function () {
        if($.trim($("#text").val()) !== "")
        {
            $.ajax({
                url: "http://localhost:53646/api/blog/" + blog_id,
                method: "PUT",
                header: "Content-Type:application/json",
                data: {
                    id: blog_id,
                    text: $("#text").val(),
                },
                // headers: {
                //     'Authorization': 'Basic ' + localStorage.authUser,
                // },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        alert("Post Updated...");
                        loadPost;
                        loadCommentsByBlog();
                    } 
                    else {
                        alert("Error while updating.");
                    }
                }
            });
        }
        else
        {
            alert("Write Something......");
        }
    }
    $("#update").on("click",function(){
        updatePost();
    }); 

    //Delete Post
    var deletePost = function () {
        $.ajax({
            url: "http://localhost:53646/api/blog/" + blog_id,
            method: "DELETE",
            header: "Content-Type:application/json",
            // data: {
            //     id: blog_id,
            //     text: $("#text").val(),
            // },
            // headers: {
            //     'Authorization': 'Basic ' + localStorage.authUser,
            // },
            complete: function (xhr, status) {
                if (xhr.status == 204) {
                    alert("Post Deleted...");
                    window.location.href = "http://localhost/BlogContent/blogs.html";
                } 
                else {
                    alert("Error while deleting.");
                }
            }
        });
    }
    $("#delete").on("click",function(){
        if (confirm("Do you really want to delete the post?"))
        {
            deletePost();
        }       
    }); 

    //Add Comment
    var addComment = function() 
    {
        if($.trim($("#comment_text").val()) !== "")
        {
            $.ajax({
                url: "http://localhost:53646/api/blog/"+blog_id+"/comment",
                method: "POST",
                headers: "Content-Type:application/json",
                data: {
                    comment1: $("#comment_text").val(),
                    post_id: blog_id,
                    commet_by: localStorage.user,
                },
                complete: function(xmlhttp, status) {
                    if (xmlhttp.status == 201) {
                        loadPost();
                        loadCommentsByBlog();
                    } else {
                        alert("Something went wrong...");
                    }
                }
            })
        }
        else
        {
            alert("Fill Properly.");
        }
    }
    $("#comment").on("click",function(){
        addComment();
    });

    //Load Comment By PostID and Author
    var loadAllBlogsBYAuthor = function () {
        if($.trim($("#author").val()) !== "")
        {
            $.ajax({
                url: "http://localhost:53646/api/blog/"+blog_id+"/comment/comment_by/"+$("#author").val(),
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
                                if(data[i].commet_by == localStorage.user || data[i].blog.post_by == localStorage.user)
                                {
                                    str += "<tr>"+
                                            "<td align='center'>"+ data[i].commet_by + "</td>"+
                                            "<td>"+ data[i].comment1 + "</td>"+
                                            "<td align='center'> <a href='modifycomment.html?blog_id=" + data[i].post_id + "&comment_id=" + data[i].id + "'>Modify</a></td>"+
                                        "</tr>";
                                    sl++;
                                }
    
                                else
                                {
                                    str += "<tr>"+
                                            "<td align='center'>"+ data[i].commet_by + "</td>"+
                                            "<td>"+ data[i].comment1 + "</td>"+
                                            "<td> </td>"+
                                        "</tr>";
                                    sl++;
                                }
                                
                                
                            }
                        }
    
                        else
                        {
                            str += "<tr><td colspan='3' align='middle'>NO DATA FOUND</td></tr>";
                        }
    
                        $("#comments tbody").html(str);
                    }
                    else {
                        alert("Something Went Wrong.");
                    }
                }
            });
        }
        
        else
        {
            loadPost();
            loadCommentsByBlog();
        }
    }
    $("#author").on("keyup change",function(){
        loadAllBlogsBYAuthor();
    }); 

});