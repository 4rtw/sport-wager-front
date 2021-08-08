export function colors(): any[] {
    const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);

    const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

    const colors: any[] = [];

    for(let i=0; i<=1000; i++){
        colors.push(randomRGB());
    }
    return colors;
}
