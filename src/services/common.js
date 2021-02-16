export const splitData = (file) => {
    const splitedData = file.split('\n');
    return splitedData.map(line => line.split(';'))
}