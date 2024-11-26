


 const searchBtn = document.getElementById("search-btn");
 const filters = document.getElementById("filters");
 const executeSearchBtn = document.getElementById("execute-search");

 searchBtn.addEventListener("click", () => {
   filters.classList.toggle("hidden");
   
 });

 executeSearchBtn.addEventListener("click", () => {
  console.log("a")
   const id = document.getElementById("search-id").value;
   const name = document.getElementById("search-name").value;
   const username = document.getElementById("search-username").value;

   // Aqui você pode integrar com sua API para buscar usuários com base nos valores
   console.log("Buscando usuário com:", { id, name, username });
 });