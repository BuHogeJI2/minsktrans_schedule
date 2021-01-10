export const fetchStopsInfo = async (fileName, callback) => {
    try {
        let response = await fetch(fileName);
        let stops = await response.text();
        callback(stops);
    } catch (error) {
        console.log(error)
    }
}