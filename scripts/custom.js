let countryRequestToken = 0;

function populateCountryCodeSelect(locationType) {
    const selectEl = document.getElementById('country-code-select');
    if (!selectEl) return;

    //  unique token for this request
    const currentToken = ++countryRequestToken;

    // CLEAR OLD OPTIONS FIRST
    selectEl.innerHTML = '<option value="">Select country code</option>';

    fetch(`https://sip-admin.designonline.in/api/essentials?required=country_code&location_type=${locationType}`)
        .then(response => response.json())
        .then(result => {

            //  Ignore outdated responses
            if (currentToken !== countryRequestToken) return;

            const countries = result?.data?.country_code || [];

            // Deduplicate by dial_code (within response)
            const unique = {};
            countries.forEach(item => {
                if (item.dial_code && !unique[item.dial_code]) {
                    unique[item.dial_code] = item;
                }
            });

            Object.values(unique).forEach(item => {
                const dialCode = `+${item.dial_code}`;
                const countryCode = item.country_code || '';

                const option = document.createElement('option');
                option.value = dialCode;
                option.textContent = countryCode
                    ? `${countryCode} ${dialCode}`
                    : dialCode;

                selectEl.appendChild(option);
            });

            // Select first actual value
            if (selectEl.options.length > 1) {
                selectEl.selectedIndex = 1;
            }
        })
        .catch(error => {
            if (currentToken !== countryRequestToken) return;
            console.error('Failed to load country codes', error);
            selectEl.innerHTML = '<option value="">Unable to load</option>';
        });
}
