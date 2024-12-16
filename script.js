// * declation des buttons
const btnCharger = document.querySelector("#btnChargerUtlisateur");
const container = document.querySelector(".container");

// * info de l'utilisateur
const infos = document.querySelector(".infos");
// * details de l'utilisateur
const details = document.querySelector("#details");

// * function pour retirer les espaces et rendre la première lettre du nom majuscule pour effectuer la recherche
/* function trimAndCapi(name) {
  return (
    name.trim().charAt(0).toUpperCase() + name.trim().slice(1).toLowerCase()
  );
} */
// * la fonction pour récuperer les données de l'API en utilisant la méthode fetch();
async function getUsers() {
  const url = "https://randomuser.me/api/?page=3&results=21&seed=abc";
  try {
    const response = await axios.get(url);
    if (response.status === 200 ) {
      const users = response.data.results;
      users.forEach((user, index) => {
        firstDiv = `
          <div id="info">
            <img src="${user.picture.large}" alt="image">
            <p>${user.name.first + " " + user.name.last}</p>
            <p>${user.email}</p>
            <p>${user.location.city + ", " + user.location.country}</p>
            <button class="btn btndown" data-index=${index}>More details</button>
            </div>
            `;
        infos.insertAdjacentHTML("afterbegin", firstDiv);
      });
      // * evenement pour récuperer les details de l'utilisateur
      infos.addEventListener("click", (event) => {
        if (event.target.classList.contains("btndown")) {
          const userIndex = event.target.getAttribute("data-index");
          const selectedUser = users[userIndex];
          const popup = document.createElement("div");
          popup.id = "popup";
          popup.innerHTML = `
          <div class="popup-content">
            <span id="close-popup">&#x2715;</span>
            <img src="${selectedUser.picture.large}" alt="Image of ${selectedUser.name.first}">
            <p><strong>Name:</strong> ${selectedUser.name.first} ${selectedUser.name.last}</p>
            <p><strong>Email:</strong> ${selectedUser.email}</p>
            <p><strong>Country:</strong> ${selectedUser.location.city}, ${selectedUser.location.country}</p>
            <p><strong>Phone:</strong> ${selectedUser.phone}</p>
          </div>
        `;
          document.body.appendChild(popup);

          document.getElementById("close-popup").addEventListener("click", () => {
              popup.remove();
            });
          popup.addEventListener("click", (e) => {
            if (e.target === popup) {
              popup.remove();
            }
          });
          document.addEventListener('keydown',(e)=>{
              if(e.key === 'Escape'){
                popup.remove();
              }
          })
        }
      });
    }
  } catch (error) {
    console.error(error);
  }
}
//* event for load of the window to display users
window.addEventListener("load", getUsers);


