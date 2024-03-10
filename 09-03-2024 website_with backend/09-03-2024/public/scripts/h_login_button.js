const button = document.querySelector(".loginbtn");
 
    button.addEventListener("click", (e) => {
      e.preventDefault;
      button.classList.add("animate");
      setTimeout(() => {
        button.classList.remove("animate");
      }, 800);
      setTimeout(() => {
       window.open("./html/loginpage/login.html");
      }, 900);
     
    });