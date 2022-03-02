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

