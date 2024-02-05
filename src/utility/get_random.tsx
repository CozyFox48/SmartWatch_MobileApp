export const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const find_devices = () => {
    const device_number = getRandomNumber(1, 3);
    let data = [];
    for (let i = 0; i < device_number; i++) {
        data.push({
            name: 'New Device ' + (i + 1),
            uuid: getRandomNumber(1000, 9999),
            strength: getRandomNumber(1, 100)
        })
    }
    return data;
}