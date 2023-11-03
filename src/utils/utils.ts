export const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const capitalizeFirstLetter = (str: string) => {
    return str.replace(/(^\w{1})/, (match) => match.toUpperCase());
};