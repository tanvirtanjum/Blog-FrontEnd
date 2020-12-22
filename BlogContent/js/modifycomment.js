$(document).ready(function () {
    if (localStorage.user == undefined)  
    {
        window.location.href = "index.html";
    }

    

    var url_string = window.location;
    var url = new URL(url_string);
    var blog_id = url.searchParams.get("blog_id");
    var comment_id = url.searchParams.get("comment_id");

    if (blog_id == null || comment_id == null) 
    {
        window.location.href = "Index.html";
    }

    //Load Blog and Comment
    var loadBlogComment = function () {
        $.ajax({
            url: "http://localhost:53646/api/blog/"+blog_id+"/comment/"+comment_id,
            method: "GET",
            /*headers: {
                'Authorization': 'Basic ' + localStorage.authUser,
            },*/
            complete: function (xhr, status) {
                if (xhr.status == 200) {
                    var data = xhr.responseJSON;

                    $("#text").text(data[0].blog.text);
                    $("#comment").text(data[0].comment1);
                    $("#sender").text(data[0].commet_by);

                    console.log(data[0].blog.login.username);

                    if(data[0].commet_by == localStorage.user || data[0].blog.login.username == localStorage.user)
                    {
                        $("#update").removeAttr("hidden", "hidden");
                        $("#delete").removeAttr("hidden", "hidden");
                        $("#comment").removeAttr("readonly", "readonly");

                        if(data[0].commet_by != localStorage.user)
                        {
                            $("#update").attr("disabled", "disabled");
                        }
                    }
                    
                    else
                    {
                        $("#update").attr("hidden", "hidden");
                        $("#delete").attr("hidden", "hidden");
                        $("#comment").attr("readonly", "readonly");
                    }

                    
         
                }
                else {
                    alert("Something Went Wrong.");
                }
            }
        });
    }

    loadBlogComment();

    //Update Post
    var updateComment = function () {
        if($.trim($("#comment").val()) !== "")
        {
            $.ajax({
                url: "http://localhost:53646/api/blog/"+blog_id+"/comment/"+comment_id,
                method: "PUT",
                header: "Content-Type:application/json",
                data: {
                    id: blog_id,
                    comment1: $("#comment").val(),
                },
                // headers: {
                //     'Authorization': 'Basic ' + localStorage.authUser,
                // },
                complete: function (xhr, status) {
                    if (xhr.status == 200) {
                        alert("Comment Updated...");
                        loadPost;
                        loadBlogComment();
                    } 
                    else {
                        alert("Error while updating.");
                    }
                }
            });
        }
        else
        {
            alert("Write Something....");
        }
    }
    $("#update").on("click",function(){
        updateComment();
    });

    //Delete Comment
    var deleteComment = function () {
        $.ajax({
            url: "http://localhost:53646/api/blog/"+blog_id+"/comment/"+comment_id,
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
                    alert("Comment Deleted...");
                    window.location.href = "http://localhost/BlogContent/details.html?blog_id="+blog_id;
                } 
                else {
                    alert("Error while deleting.");
                }
            }
        });
    }
    $("#delete").on("click",function(){
        if (confirm("Do you really want to delete the comment?"))
        {
            deleteComment();
        }       
    }); 
});