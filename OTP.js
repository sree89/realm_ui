function add(){	
	 var config = {
      apiKey: 'AIzaSyBM1J3z7HKuCphgwEGC1ZYCAzCHRPB0nT8',
      authDomain: 'realm-c19e0.firebaseapp.com',
      databaseURL: 'https://realm-c19e0.firebaseio.com',
      storageBucket: 'realm-c19e0.appspot.com',
    };
  // Initilize Firebase App, get DB and Storage services
  var app = firebase.initializeApp(config),
      database = app.database(),
      storage = app.storage();
	var filenamearr=[];
    var urlarr=[];
	var id="Voicegate";
	database.ref().child('AddImages/'+id+'/').once("value", function(snapshot) {
       urlarr=[];
       filenamearr=[];
        var data= JSON.stringify(snapshot.val(), null, 2);
        var obj= JSON.parse(data);
        for(var key in obj){
          urlarr.push(obj[key]);
        }
			showimage(urlarr);
} ,function (error) {
   console.log("Error: " + error.code);
});
	function showimage(arrayurl){
	var ran=Math.floor(Math.random() * arrayurl.length);
	var url=arrayurl[ran];
    var img=document.getElementById("adimg");
	img.src=url;
	img.classList.add("img-responsive");   		
	var hostname,filename,filetype;
	var time=5000;
	var modal = document.getElementById('myModal');
	var span = document.getElementsByClassName("close")[0];
	modal.style.display = "block";	
	setTimeout(function(){span.style.display="block";},time);
	span.onclick = function() {
    modal.style.display = "none";
    }
}
   }

        function fadeOutDiv(element) {
			var json;
			var valid=true;
         if (element == 'tel') {
			var	phno=document.getElementById("phno").value;	
				if(phno==""){
					alert("pls enter your phone number");
					valid=false;
				}
				else{
				if(phno.length==11)
					{
						var no=/^[0]\d{10}$/;
						var noarray=no.exec(phno);
						if(noarray==null)
							{
								alert("invalid phone number");
								valid=false;
							}
						else{
							var num=noarray[0].substring(1,10);						
						    post(num);
							
							}
					}
				else{
					
			    var myRe = /^[2-9]\d{9}$/;
                var myArray = myRe.exec(phno);
			     if(myArray==null)
					 {
						alert("invalid phone number");
						 valid=false;
					 }
					else{
						var num1=myArray[0];
						post(num1);
						}
				}
				}
			 if(valid==true){
                var myButtonClasses = document.getElementById("mobileDiv").classList;
                myButtonClasses.add("animated");
                myButtonClasses.add("fadeOutUp");
                var myOtpDiv = document.getElementById("otpDiv");
                myOtpDiv.className = myOtpDiv.className.replace(new RegExp('( |^)' + "noneDisplay" + '( |$)', 'g'), ' ').trim();
                myOtpDiv.classList.add("animated");
                myOtpDiv.classList.add("fadeInUp");
			 }
				
		}
            else if (element == 'otp') {
				var otp = document.getElementById("userotp").value;	
				if(otp == uotp){				
                var myButtonClasses = document.getElementById("otpDiv");
				myButtonClasses.className = myButtonClasses.className.replace(new RegExp('( |^)' + "fadeInUp" + '( |$)', 'g'), ' ').trim();
                myButtonClasses.classList.add("fadeOutUp");
                var emailDiv = document.getElementById("emailDiv");
                emailDiv.className = emailDiv.className.replace(new RegExp('( |^)' + "noneDisplay" + '( |$)', 'g'), ' ').trim();
                emailDiv.classList.add("animated");
                emailDiv.classList.add("fadeInUp");
				document.getElementById("bg").style.height="450px";
				}
				else{
					alert("invalid otp");
				}
            }
            else {
				var fname=document.getElementById("firstname").value;
				var lname=document.getElementById("lastname").value;
				var email=document.getElementById("uemail").value;	
				var emailre=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				var earray=emailre.exec(email);
				if(earray==null)
					{
						alert("invalid email id");
						
					}
				else{
					postuser(fname,lname,email,phno,"email","","");					
			        login();
				
					}
            }
			
			function post(mobile){	
			var host="http://202.153.34.228:3000/";
			xhr = new XMLHttpRequest();
			var url=host+"mobile";	
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-type", "application/json");
            xhr.onreadystatechange = function () { 
            if (xhr.readyState == 4 && xhr.status == 200) {
                json = JSON.parse(xhr.responseText);			
				uotp=json.otp;			
                 }
               }
          var data = JSON.stringify({mobile});
          xhr.send(data);
			}
			
        }
      function postuser(fname,lname,email,phno,datasource,gender,agerange)
			{
				var host="http://202.153.34.228:3000/";
				var id="voicegate";
				var nVer = navigator.appVersion;
                var nAgt = navigator.userAgent;
                var browser = navigator.appName;
				var lang=navigator.language;
		        var screenSize = '';
               if (screen.width) {
                   width = (screen.width) ? screen.width : '';
                   height = (screen.height) ? screen.height : '';
                   screenSize += '' + width + " x " + height;
                }
		 var device={firstname:fname,lastname:lname,email:email,mobileno:phno,nVer:nVer,nAgt:nAgt,browser:browser,screensize:screenSize,datasource:datasource,gender:gender,agerange:agerange,lang:lang,deviceid:id};
		 var devicejson=JSON.stringify(device);
		  xhr = new XMLHttpRequest(); 
		  var url=host+"newuser";
				xhr.open("POST", url, true);
				xhr.setRequestHeader("Content-type", "application/json");
                xhr.onreadystatechange = function () { 
                if (xhr.readyState == 4 && xhr.status == 200) {
                var djson = JSON.parse(xhr.responseText);
                 }
               }
          xhr.send(devicejson);  	
								
			}
           function login(){
			    document.login.username.value = document.getElementById("phno").value;
                document.login.password.value = "laks5347";
                document.getElementById("login").submit();		
			}
       
       (function(){
var apiKey = 'AIzaSyDonX0liokIppYwJX3zgdx5nSY2WCTpxx0';
var clientId = '52381240004-gpvnjsh1c3stirep8fn52dc62nhuuu8p.apps.googleusercontent.com';
var scopes = 'profile email https://www.googleapis.com/auth/user.phonenumbers.read https://www.googleapis.com/auth/user.addresses.read';

function initAuth() {
  gapi.client.setApiKey(apiKey);
  gapi.auth2.init({
      client_id: clientId,
      scope: scopes
  }).then(function () {
   
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    signinButton.addEventListener("click", handleSigninClick);
   
  });
}

function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    signinButton.style.display = 'block';
    //signoutButton.style.display = 'block';
    //makeApiCall();
  } else {
    signinButton.style.display = 'block';
    //signoutButton.style.display = 'none';
  }
}
function handleSigninClick(event) {
  gapi.auth2.getAuthInstance().signIn().then(function() {
    makeApiCall();
  });
  }
  
  function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}
gapi.load('client:auth2', initAuth);

function makeApiCall() {
  gapi.client.load('people', 'v1', function() {
    var request = gapi.client.people.people.get({
      resourceName: 'people/me'
    });
	  
    request.execute(function(resp) {
		var ph=document.getElementById("phno").value;
		var name=resp.names["0"].displayNameLastFirst;
		var uname=name.split(',');
		var fname=uname[0];
		var lname=uname[1];
		postuser(fname,lname,resp.emailAddresses["0"].value,ph,"google","null",resp.ageRange);
        login();
      
    });
  });
}
	   })();
 