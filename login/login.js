<script>
    var loginDiv = document.getElementById("login");
    var divW = loginDiv.clientWidth;
    var divH = loginDiv.clientHeight;
    var w = window.innerWidth||document.body.clientWidth||document.documentElement.clientWidth;
    var h = window.innerHeight||document.body.clientHeight||document.documentElement.clientHeight;
    var x = (w-divW)/2;
    var y = (h-divH)/2;
    loginDiv.style.left = x + "px";
    loginDiv.style.top = y + "px";
    function Name(){
	var Na=document.getElementById("Na").value;
	if (Na!="20201415204"){
		document.getElementById("name").innerHTML="UserName Error";
		return false;}
	document.getElementById("name").innerHTML="UserName Right";
	return true;}
    function checkPwd(){
	var pwd=document.getElementById("pwd").value;
	if (pwd!="123456"){
		document.getElementById("pwdId").innerHTML="Password Error";
		return false;}
    if (pwd=="123456"){
	document.getElementById("pwdId").innerHTML="Password Right";
	return true;}}
</script>