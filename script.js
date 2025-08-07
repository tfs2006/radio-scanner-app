document.addEventListener('DOMContentLoaded', () => {
    const sampleData = [
        { name: 'City Police Dispatch', frequency: '155.550', type: 'P25', zip: '10001' },
        { name: 'County Fire', frequency: '154.250', type: 'Analog', zip: '10001' },
        { name: 'Public Works', frequency: '152.300', type: 'DMR', zip: '10002' },
        { name: 'State Patrol', frequency: '158.750', type: 'Analog', zip: '10003' },
        { name: 'Forest Service', frequency: '151.550', type: 'NXDN', zip: '10003' },
        { name: 'Airport Ops', frequency: '154.050', type: 'Analog', zip: '10004' }
    ];

    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', () => {
        const zipInput = document.getElementById('zip-input').value.trim();
        const radioTypeCheckboxes = document.querySelectorAll('input[name="radio-type"]:checked');
        const selectedTypes = Array.from(radioTypeCheckboxes).map(checkbox => checkbox.value);

        const results = sampleData.filter(item => {
            const zipMatch = zipInput === '' || item.zip === zipInput;
            const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(item.type);
            return zipMatch && typeMatch;
        });

        displayResults(results);
    });

    function displayResults(results) {
        const resultsList = document.getElementById('results-list');
        resultsList.innerHTML = '';

        if (results.length === 0) {
            const noResultsItem = document.createElement('li');
            noResultsItem.textContent = 'No frequencies found. Please refine your search.';
            resultsList.appendChild(noResultsItem);
            return;
        }

        results.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('result-item');
            listItem.innerHTML = `<strong>${item.name}</strong> - ${item.frequency} MHz (${item.type}, ZIP: ${item.zip})`;
            resultsList.appendChild(listItem);
        });
    }
});
