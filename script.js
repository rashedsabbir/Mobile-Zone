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