let myGif = document.getElementById("my-gifos");

myGif.addEventListener("click", () => {
  document.getElementsByClassName("search-section")[0].style.display = "none";
  document.getElementsByClassName("main")[0].style.display = "none";
});
