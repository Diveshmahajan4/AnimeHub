

import prismadb from '@/lib/prismadb'
import serverAuth from '@/lib/serverAuth'
import { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method != 'GET'){
        return res.status(405).end();
    }

    try{
        await serverAuth(req , res);

        const { movieId } = req.query;

        if(typeof movieId != 'string'){
            throw new Error("Invalid Id");
        }

        if(!movieId){
            throw new Error("No movie Id revieved");
        }

        const movie = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        })

        if(!movie){
            throw new Error("Invalid movie recieved");
        }

        return res.status(200).json(movie)
    }catch(error){
        console.log(error);
        return res.status(400).end("error from api/movie/movie.ts ");
    }
}