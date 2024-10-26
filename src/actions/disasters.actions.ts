import { DisasterModel } from '@src/helpers/models/disaster.model';
import { createServerAction, ZSAError } from 'zsa';


/**
 *  disasters/
 *  api link = https://dummyjson.com/posts?limit=10&skip=0&select=title,reactions,userId,
 */

export const disastersAction = createServerAction().handler(async () => {
    try{
        const response = await fetch(`${process.env.API_URL}/posts?limit=10&skip=0&select=title,reactions,userId`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        console.log("API_URL:", process.env.API_URL);
        const jsonResponse = await response.json()
        if(!response.ok){
            throw new ZSAError('ERROR', jsonResponse.error)
        }
        console.log(" datas fetched : ", jsonResponse)
        return Object.keys(jsonResponse).map(key => jsonResponse[key] as DisasterModel[])
    }catch(error){
        console.error('Error while getting disasters: ', (error as any).message)
        throw new ZSAError('ERROR', (error as any).message)
    }
}) 