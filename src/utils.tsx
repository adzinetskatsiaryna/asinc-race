


export const models=["Tesla","Mercedes","BMW","Toyota","Zhiguli","Moscvich","Aston Martin",'Opel',"Porch"];

export const names=["Model 5","CLK","7","Camry","Comby","9","Corsa","DB9","Coyen"];

export const getRandomName=()=>{
    const model=models[Math.floor(Math.random()*models.length)];
    const name=names[Math.floor(Math.random()*names.length)];
    return `${model} ${name}`;
}

export const getRandomColor=()=>{
    const letters='0123456789ABCDEF';
    let color='#';
    for (var i = 0 ; i < 6; i++){
        color += letters[Math.floor(Math.random()*16)];
    }
    return color;
}

export const  generateRandomCar = (count:number=100)=>{
    new  Array(count).fill(1).map(_ =>(
        {name:getRandomName(),
         color:getRandomColor()
        }));
}

export function getPositionCenter(element:any){
    const {top, left, width,height}=element.getBoundingClientRect();
    return{
        x:left+width/2,
        y:top+height/2
    }
}

export  function getDistanceBetweenElement(a:any,b:any) {
const aPosition=getPositionCenter(a);
const bPosition=getPositionCenter(b);

return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y)
}

export function animation(car:any,distance:number,animationTime:number) {
    let start:number|null = null;
    const state = {};

    function step(timestamp: number) {
        if (!start) start = timestamp;
        const time = timestamp - start;
        const passed = Math.round(time*(distance/animationTime));
        car.style.transform = `translateX(${Math.min(passed,distance)}px)`;
        if(passed<distance){
            // @ts-ignore
            state.id=window.requestAnimationFrame(step)
        }
    }
}
