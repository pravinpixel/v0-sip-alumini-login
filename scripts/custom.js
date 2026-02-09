let countryRequestToken = 0;

function populateCountryCodeSelect(locationType) {
    const selectEl = document.getElementById('country-code-select');
    if (!selectEl) return;

    // create a unique token for this request
    const currentToken = ++countryRequestToken;

    selectEl.innerHTML = '<option value="">Loading...</option>';

    fetch(`https://sip-admin.designonline.in/api/essentials?required=country_code&location_type=${locationType}`)
        .then(response => response.json())
        .then(result => {

            //  Ignore outdated responses
            if (currentToken !== countryRequestToken) return;

            const countries = result?.data?.country_code || [];

            // Reset select
            selectEl.innerHTML = '<option value="">Select country code</option>';

            // Deduplicate dial codes
            const uniqueDialCodes = [
                ...new Set(
                    countries
                        .map(item => item.dial_code)
                        .filter(Boolean)
                )
            ];

            // Populate options
            uniqueDialCodes.forEach(code => {
                const dialCode = `+${code}`;
                selectEl.add(new Option(dialCode, dialCode));
            });

            //  Select first value by default
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




