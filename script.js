'use strict';

const phoneContainer = document.getElementById('phone-container');
const phoneDetail = document.getElementById('phone-detail');
const spinner = document.getElementById('spinner');
const emptySearchBox = document.getElementById('empty-search-box');
const showAllButton = document.getElementById('show-all');

const loadPhones = () => {
    const input = document.getElementById('search-box');
    const error = document.getElementById('error');
    const searchText = input.value;
    input.value = '';

    ////Phone Search api url-
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data.data.length == 0);
            if (data.data.length == 0) {
                error.innerHTML = 'Opps, Please enter a brand name';

                // Clearing previous entry from search box
                phoneContainer.textContent = '';

                // Clearing previous results
                phoneDetail.textContent = '';

                // Optional Loading bar         
                spinner.style.display = 'block';
            }
            else if (searchText == '') {
                emptySearchBox.innerHTML = 'Please enter a phone name.';

                // Clearing previous entry from search box
                phoneContainer.textContent = '';

                // Clearing previous results
                phoneDetail.textContent = '';

                // Optional Loading bar   
                spinner.style.display = 'block';
            }
            else {
                // Clear error Massage
                error.innerHTML = '';
                emptySearchBox.innerHTML = '';

                // Clearing previous results
                phoneDetail.textContent = '';

                // Clearing previous entry from search box
                phoneContainer.textContent = '';

                // Optional Loading bar   
                spinner.style.display = 'block';

                displayPhones(data.data);

                // Clear Loading Bar
                spinner.style.display = 'none';
            }
        });
};

const displayPhones = (phones) => {

    //showing only results in between 0 to 20
    const firstTweentyPhones = phones.slice(0, 20);


    firstTweentyPhones.forEach((phone) => {

        const div = document.createElement('div');

        div.innerHTML = `
      <div class="card text-center border-0">
        <img src="${phone.image}" class="card-img-top w-50 h-50 mx-auto pt-3">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <h5 class="card-title">${phone.brand}</h5>
          <a href="#"><button onclick="loadSinglePhone('${phone.slug}')"   class="btn btn-danger">See Details</button> </a>
        </div>
      </div>`;

        phoneContainer.appendChild(div);
    });
};

//Load single phone data 
const loadSinglePhone = (phoneId) => {

    //Phone Detail api url
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => displayPhoneDetails(data.data));
};

const displayPhoneDetails = (phone) => {

    // Clearing previous results
    phoneDetail.textContent = '';

    //Showing phone release date
    const releaseDate =
        phone.releaseDate !== '' ? phone.releaseDate : 'Release date unknown';


    const div = document.createElement('div');

    //Showing single phone detailed specification
    div.innerHTML = `
    <div>
       <img src="${phone.image}" class="card-img-top mx-auto pt-3 phone-image mb-3">
       <div>
          <h3 class="text-center text-danger">${phone.name}</h3>
          <h6 class="text-center ">Release Date: ${releaseDate}</h6>
          <h3 class="text-center text-danger">${phone.brand}</h3>
          <br>
          
          <h5 class="text-center text-danger">Main Features</h5>
          <div class="card border-1 border-success">
          <div class="card-body">
          <p> Chipset: ${phone?.mainFeatures?.chipSet} </p> 
          <p> Display Size: ${phone?.mainFeatures?.displaySize} </p>
          <p> Memory: ${phone?.mainFeatures?.memory} </p>
          <p> Storage: ${phone?.mainFeatures?.storage} </p>
          </div>
          </div>
          
          <br>
          <h5 class="text-center text-danger">Sensors</h5>

          <div class="card border-1 border-success">
          <div class="card-body">
          <p> ${phone?.mainFeatures?.sensors[0]},  
              ${phone?.mainFeatures?.sensors[1]},
              ${phone?.mainFeatures?.sensors[2]} </p> 
          <p> ${phone?.mainFeatures?.sensors[3]},
              ${phone?.mainFeatures?.sensors[4]},  
              ${phone?.mainFeatures?.sensors[5]},
              ${phone?.mainFeatures?.sensors[6]} </p>
          </div>
          </div>
        
          <br>
          <h5 class="text-center text-danger">Other Features</h5>

          <div class="card border-1 border-success">
          <div class="card-body">
          <p> Bluetooth: ${phone?.others?.Bluetooth} </p> 
          <p> GPS: ${phone?.others?.GPS} </p>
          <p> NFC: ${phone?.others?.NFC} </p>
          <p> Radio: ${phone?.others?.Radio} </p>
          <p> USB: ${phone?.others?.USB} </p>
          <p> WLAN: ${phone?.others?.WLAN} </p>
          </div>
          </div>
         
          <br>
      </div>
    </div>`;

    phoneDetail.appendChild(div);
};

