export const fetchInfo = async (fileName) => {
    try {
        let response = await fetch(fileName);
        return await response.text();
    } catch (error) {
        console.error('ERROR:', error)
    }
}