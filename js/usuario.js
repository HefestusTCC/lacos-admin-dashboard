
document.querySelector(".dropdown-btn").addEventListener("click", function () {
  document.querySelector(".dropdown-content").classList.toggle("show");
});

window.onclick = function (event) {
  if (!event.target.matches(".dropdown-btn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

 const searchBtn = document.getElementById("search-btn");
 const filters = document.getElementById("filters");
 const executeSearchBtn = document.getElementById("execute-search");

 searchBtn.addEventListener("click", () => {
   filters.classList.toggle("hidden");
   
 });

 executeSearchBtn.addEventListener("click", () => {
   const id = document.getElementById("search-id").value;
   const name = document.getElementById("search-name").value;
   const username = document.getElementById("search-username").value;

   // Aqui você pode integrar com sua API para buscar usuários com base nos valores
   console.log("Buscando usuário com:", { id, name, username });
 });