import jtw from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generarJWT = ( id_user, name, tipo ) => {

    //console.log(process.env)
    //console.log(process.env.SECRET_JWT_SEED)

    return new Promise((resolve, reject) => {
        
        const payload = { id_user, name, tipo };
        
        jtw.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h',

        }, (err, token) => {
            if(err){
                console.log(err)
                reject('No se pudo generar el token')
            } 
            
            resolve(token)
            
        })
        


    })
}