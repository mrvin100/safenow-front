import { DisasterModel } from '@src/helpers/models/disaster.model';
import { createServerAction, ZSAError } from 'zsa';


/**
 *  disasters/
 */

export const disastersAction = createServerAction().handler(async () => {
    try{
        const response = await fetch(`${process.env.API_URL}'/posts?limit=10&skip=0&select=title,reactions,userId`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const jsonResponse = await response.json()
        if(!response.ok){
            throw new ZSAError('ERROR', jsonResponse.error)
        }
        return Object.keys(jsonResponse).map(key => jsonResponse[key] as DisasterModel[])
    }catch(error){
        console.error('Error while getting disasters: ', (error as any).message)
        throw new ZSAError('ERROR', (error as any).message)
    }
}) 