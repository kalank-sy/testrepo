const wrapper = document.querySelector(".wrapper"),
selectBtn = wrapper.querySelector(".select-btn"),
searchInp = wrapper.querySelector("input"),
location_options = wrapper.querySelector(".location-options");
let cities = ["Ahmedabad",
"Amreli district",
"Anand",
"Banaskantha",
"Bharuch",
"Bhavnagar",
"Dahod",
"The Dangs",
"Gandhinagar",
"Jamnagar",
"Junagadh",
"Kutch",
"Kheda",
"Mehsana",
"Narmada",
"Navsari",
"Patan",
"Panchmahal",
"Porbandar",
"Rajkot",
"Sabarkantha",
"Surendranagar",
"Surat",
"Vyara",
"Vadodara",
"Valsad"]

function addCity() {
    cities.forEach(city =>{
        let li =`<li onclick="updateName(this)">${city}</li>`;
        location_options.insertAdjacentHTML("beforeend", li);
    });
}
addCity();

function updateName(selectedLi){
    wrapper.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;
}

searchInp.addEventListener("keyup", ()=>{
    let arr = [];
    let searchedVal = searchInp.value.toLowerCase();
    arr = cities.filter(data => {
        return data.toLowerCase().startsWith(searchedVal);
    }).map(data => `<li onclick="updateName(this)">${data}</li>`).join("");
   location_options.innerHTML = arr ? arr : `<p>Oops! city not found</p>`;
});
selectBtn.addEventListener("click", ()=>{
    wrapper.classList.toggle("active");
})