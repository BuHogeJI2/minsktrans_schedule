export const fetchInfo = async (fileName, callback) => {
    try {
        let response = await fetch(fileName);
        let responseText = await response.text();
        callback(responseText)
    } catch (error) {
        console.error('ERROR:', error)
    }
}