import {CarInterface} from "./Garage/Car/Car";



const baseUrl='http://localhost:3000';
const path={
    cars: '/garage',
    engine:'/engine',
    winners:'/winners'
}

export const getAllCars = async (page,limit=7) => {
    const response= await fetch(`${baseUrl}${path.cars}?_page=${page}&_limit=${limit}`);
    const items = await response.json();
    return {
        items:items,
        count: Number(response.headers.get('X-Total-Count')),
    };
};

export const getCar = async (id) => {
    const response= await fetch(`${baseUrl}${path.cars}/${id}`);
    const car = await response.json();
    return car ;
};

//create newCar
export const createNewCar = async (body) => {
    const response= await fetch(`${baseUrl}${path.cars}`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(body)
    })
    const newCar = await response.json();
};

export const updateCar = async (id, body) => {
    const response= await fetch(`${baseUrl}${path.cars}/${id}`,{
        method:"PUT",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(body)
    });
    const newCarUpdated = await response.json();
    return newCarUpdated ;
};

export const updateEmployerParam = async (id, body) => {
    const response= await fetch(`${baseUrl}${path.cars}/${id}`,{
        method:"PATCH",
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify(body)
    });
    const updateSomeParams = await response.json();
    return updateSomeParams;
};

export const deleteCar = async (id) => {
    const response= await fetch(`${baseUrl}${path.cars}/${id}`,{
        method:"DELETE"
    });
    const deleteCar = await response.json();
    return deleteCar ;
};

export const startEngine=async (id) => {
   const response = await fetch(`${baseUrl}${path.engine}?id=${id}&status=started`,{
    method: "PATCH"
   })
   const isStartEngine = await response.json();
   return isStartEngine
}

export const stopEngine=async (id) =>{
    const response = await fetch(`${baseUrl}${path.engine}?id=${id}&status=stopped`,{
     method: "PATCH"
    })
    const isStoptEngine = await response.json();
    return isStoptEngine
 }

export  const drive = async (id) => {
    const  res = await  fetch(`${baseUrl}${path.engine}&id=${id}&status=drive`).catch();
    return res.status !== 200 ? {success:false} : { ...(await res.json())};
};
const getSortOrder = (sort,order)=>{
    if(sort && order) return `&_sort=${sort}&_order=${order}`;
    return  '';
};


// export const getWinners = async ({page , limit, sort, order}) =>{
//     const response = await fetch(`${baseUrl}${path.winners}?_page=${page}&_limit=${limit}${getSortOrder(sort,order)}`);
//     const items= await  response.json();
//     return {
//         items:await Promise.all(items.map(async (winner: { id }) => ({...winner, car:await getCar(winner.id)}))),
//         count: response.headers.get('X-Total-Count'),
//     };
// };
//
// export const getWinner  = async (id) => (await fetch(`${baseUrl}${path.winners}/${id}`)).json();
//
// export  const  getWinnerStatus = async (id => (await fetch(`${baseUrl}${path.winners}/${id}`)).status);
//
// export  const deleteWinner = async (id) => (await fetch(`${baseUrl}${path.winners}/${id}`,{method:"DELETE"})).json();
//
// export  const  createWinner = async (body) => (await fetch(`${baseUrl}${path.winners}`,{
//     method:'POST',
//     body:JSON.stringify(body),
//     headers:{
//         'Content-Type':'application/json'
//     },
// })).json();
//
// export const updateWinner = async (id,body) =>(await  fetch(`${baseUrl}${path.winners}`,{
//     method:'PUT',
//     body:JSON.stringify(body),
//     headers: {
//         'Content-Type': 'application/json'
//     },
// })).json();
//
//
// export  const saveWinner = async ({id:number,time:number}) =>{
//     const winnerStatus = await getWinnerStatus(id);
//     if(winnerStatus === 404){
//         await createWinner({
//             id,
//             wins:1,
//             time,
//         });
//     } else {
//         const winner= await getWinner(id);
//         await updateWinner(id,{
//             id,
//             wins:winner.wins+1,
//             time:time<winner.time ? time : winner.time,
//         });
//     }
// };
