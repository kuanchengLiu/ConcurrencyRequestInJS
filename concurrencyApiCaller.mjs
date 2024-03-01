import fetch from "node-fetch";
async function fetchParallel(urls, headersArray) {
    try {
        // Map each URL into a fetch promise
        const fetchPromises = urls.map((url, index) => fetch(url, { method: 'GET', headers: headersArray[index] }));

        // Wait for all requests to complete
        const responses = await Promise.all(fetchPromises);

        // Map each response into its JSON data
        const dataPromises = responses.map(response => response.json());

        // Wait for all JSON data to be resolved
        const data = await Promise.all(dataPromises);

        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Usage
const urls = ['URL', 'URL', 'URL'];
const headersArray = [
    { 'Accept': 'application/json', 'PDNGTranID': 'Bearer your_token1' },
    { 'Accept': 'application/json', 'PDNGTranID': 'Bearer your_token2' },
    { 'Accept': 'application/json', 'PDNGTranID': 'Bearer your_token3' }
];
fetchParallel(urls, headersArray)
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
