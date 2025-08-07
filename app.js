const sampleData = [
    { name: 'City Police Dispatch', frequency: '155.550', type: 'P25', zip: '10001' },
    { name: 'Fire Department', frequency: '154.370', type: 'Analog', zip: '10001' },
    { name: 'County EMS', frequency: '151.625', type: 'Analog', zip: '90210' },
    { name: 'State Police', frequency: '460.475', type: 'P25', zip: '30301' },
    { name: 'Railroad Operations', frequency: '159.100', type: 'Analog', zip: '60601' },
    { name: 'Air Traffic Control', frequency: '118.300', type: 'Analog', zip: '10001' },
    { name: 'Sheriff Dispatch', frequency: '453.675', type: 'DMR', zip: '30301' },
    { name: 'Public Works', frequency: '453.950', type: 'NXDN', zip: '60601' },
];

// Event listener for search button
const searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', () => {
    const zipValue = document.getElementById('zip-input').value.trim();
    const checkedBoxes = document.querySelectorAll('input[name="radio-type"]:checked');
    const selectedTypes = Array.from(checkedBoxes).map(cb => cb.value);

    const results = sampleData.filter(item => {
        const zipMatch = zipValue === '' || item.zip === zipValue;
        const typeMatch = selectedTypes.length === 0 || selectedTypes.includes(item.type);
        return zipMatch && typeMatch;
    });

    displayResults(results);
});

// Display results in the results container
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No frequencies found. Please refine your search.</p>';
        return;
    }

    const ul = document.createElement('ul');
    results.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.name}</strong> - ${item.frequency} MHz (${item.type}), ZIP: ${item.zip}`;
        ul.appendChild(li);
    });
    resultsContainer.appendChild(ul);
}

// Load saved credentials (if any) from local storage
function loadCredentials() {
    const username = localStorage.getItem('rr_username');
    const password = localStorage.getItem('rr_password');
    // For now, just log them; later use them for API calls
    console.log('Loaded Radio Reference credentials:', username, password);
}

// Call loadCredentials on page load
loadCredentials();
