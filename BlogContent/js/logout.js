$(document).ready(function () {
    var loadLogout = function () {
        localStorage.clear();
        window.location.href = "http://localhost/BlogContent/index.html";
    }

    $("#logout").click(function () {
        loadLogout();
    });

});