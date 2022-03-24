
export const models: Array<string> = ["Tesla","Mercedes","BMW","Toyota","Zhiguli","Moscvich","Aston Martin",'Opel',"Porch"];

export const names: Array<string> = ["Model 5","CLK","7","Camry","Comby","9","Corsa","DB9","Coyen"];

export const getRandomName = ():string => {
    const model=models[Math.floor(Math.random()*models.length)];
    const name=names[Math.floor(Math.random()*names.length)];
    return `${model} ${name}`;
}


export const getRandomColor = (): string=>{
    const letters='0123456789ABCDEF';
    let color='#';
    for (let i = 0 ; i < 6; i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}

export const getWindowWidth =(): number=> {
    let innerWidth = window.innerWidth-120;
    return innerWidth
}
export function generateRandomCar (count:number=100){
    new  Array(count).fill(1).map(_ =>(
        {
         name:getRandomName(),
         color:getRandomColor(),
         id:_.id,
         isEngineStart:false
        }
    ));
}

