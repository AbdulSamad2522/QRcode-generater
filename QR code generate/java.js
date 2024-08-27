$(document).ready(function(){
 $("#submit").click(function(event){
    event.preventDefault();
    var fname = $("#fullname").val().trim();
    var pass = $("#password").val().trim();
    var email = $("#email").val().trim();
    var cnic = $("#cnic").val().trim();
    var address = $("#address").val().trim();
    var country = $("#country").val();

    if(fname && pass && email && cnic && address && country){
        var userData = {
            name: fname,
            password: pass,
            email: email,
            idcard: cnic,
            town: address,
            coun: country
         };
         // console.log("Name: " + fname,"Password: " + pass,"Email: " + email,"Cnic " + cnic,"Address " + address,"country " + country);
         localStorage.setItem('userData', JSON.stringify(userData));
         alert("You are Registered Successfully, Now Login you Account.");
        window.location.href= 'login.html';

    }else{
        alert("Please fill the all Fields.");
    }
 });

 $("#login").click(function(){
    var loginmail = $("#email-login").val().trim();
    var loginpass = $("#password-login").val().trim();
    if(loginmail && loginpass){
        var storedUserData = JSON.parse(localStorage.getItem('userData'));

        if(loginmail === storedUserData.email && loginpass === storedUserData.password){
            window.location.href = 'dashboard.html' 
            alert("login Successful");
        }else{
            alert("Invalid Email or Password");
        }
    }else{
        alert("Please enter Email and Password.");
    }
 });

 $("#showdata").click(function(){
    var storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData) {
        var userDataDisplay = `
            <p><strong>Name:</strong> ${storedUserData.name}</p>
            <p><strong>Email:</strong> ${storedUserData.email}</p>
            <p><strong>CNIC:</strong> ${storedUserData.idcard}</p>
            <p><strong>Address:</strong> ${storedUserData.town}</p>
            <p><strong>Country:</strong> ${storedUserData.coun}</p>
        `;
        $("#data").html(userDataDisplay);
        $("#data").css({'padding': '10px', 'margin-top': '10px', 'border-radius': '15px'});
    }
    var size = $("select[name='size']").val();
    var sizesplit = size.split ('x');
    var width = sizesplit[0];
    var height = sizesplit[1];
    generateQRcode(width, height, JSON.stringify(storedUserData));
    return false;
 });
 function generateQRcode(width, height, text){
    $("#box").empty();
    $("#box").qrcode({
        width: width,
        height: height,
        text: text,
        background: "#ffffff",
        foreground: "#000000"
    });
 }
});


