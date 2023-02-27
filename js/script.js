const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAllData(data.data, dataLimit)
}

const displayAllData = (phones, dataLimit) =>{
    const btnSeeAll = document.getElementById("btn-see-all");
    const phonesContainer = document.getElementById("phones-container");
    phonesContainer.innerHTML = "";
    
    if(dataLimit && phones.length > 9){
        phones = phones.slice(0, 9);
        btnSeeAll.classList.remove("hidden");
    }
    else{
        btnSeeAll.classList.add("hidden");
    }
    
    
    const nothingFound = document.getElementById("nothing-found-message");
    if(phones.length === 0){
        nothingFound.classList.remove("hidden");
    }
    else{
        nothingFound.classList.add("hidden");
    }
    phones.forEach(phone =>{
        // console.log(phone)
        const item = document.createElement("div");
        item.innerHTML = `
        <div class="card border pt-7 bg-base-100 shadow-xl">
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                <label id="details" onclick ="loadPhoneDetails('${phone.slug}')" for="my-modal-3" class="btn">Details</label>
            </div>
        </div>
        `
        phonesContainer.appendChild(item);
    })
}

document.getElementById("input-search").addEventListener("keypress",(e)=>{
    if(e.key === "Enter"){
        loadPhones(e.target.value, 9)
    }
});

document.getElementById("btn-see-all").addEventListener("click", ()=>{
    const search = document.getElementById("input-search").value;
    loadPhones(search);
})

const loadPhoneDetails = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data)
}

const displayPhoneDetails = (data) =>{
    console.log(data)
    document.getElementById("phone-image").src = data.image;
    document.getElementById("phone-name").innerText = data.name;
    const phoneDetailsContainer =  document.getElementById("phone-details");
    phoneDetailsContainer.innerHTML = `
    <p>${data.releaseDate}</p>
    <h4 class="font-bold text-lg my-3">Features:</h4>
    <ul>
        <li class="mb-2">${data.mainFeatures.displaySize}</li>
        <li class="mb-2">${data.mainFeatures.storage}</li>
        <li class="mb-2">${data.mainFeatures.chipSet}</li>
        <li class="mb-2">${data.mainFeatures.memory}</li>
    </ul>
    `;

    const sensorContainer = document.getElementById("sensors-container");
    const sensors = data.mainFeatures.sensors;
    sensors.forEach(sensor =>{
        const ul = document.createElement("ul");
        ul.innerHTML =`
        <li>${sensor}</;l>
        `
        sensorContainer.appendChild(ul);
    })
}

loadPhones("iphone");

window.addEventListener("load", ()=>{
    document.getElementById("spinner").classList.add("hidden")
})