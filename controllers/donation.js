import { response } from 'express';
import { Donacion, Responsable_recojo, Usuario, Persona, Voluntario, Producto, Dinero, Alimento } from '../models/index_db.js';
import { insert_alimento, insert_producto, insert_dinero } from '../helpers/insertions.js'

export const addDonation = async (req, res = response) => {
    const { id_user, alimento, producto, dinero, fecha_d } = req.body;

    
    try{
        
        const donacion = new Donacion({fecha_d, userD: id_user, estado: 0})
        await donacion.save();
        console.log(id_user, alimento, producto, dinero, fecha_d)

        if(alimento){
            const { alimento } = req.body;
            alimento.forEach(element => {
                let {nombre_a, cantidad_a, medida_unitaria_a, caducidad_a} = element
                insert_alimento(nombre_a, cantidad_a, medida_unitaria_a, caducidad_a, donacion.id_donacion)
            });
        }

        if(producto){
            const { producto } = req.body;
            console.log(producto)
            producto.forEach(element => {
                let {nombre_p, tipo_p, cantidad_p, medida_unitaria_p} = element
                insert_producto(nombre_p, tipo_p, cantidad_p, medida_unitaria_p, donacion.id_donacion)
            });
        }

        if(dinero){
            const { dinero } = req.body;
            dinero.forEach(element => {
                let {monto, cambio} = element
                insert_dinero(monto, cambio, donacion.id_donacion)
            });
        }


        res.status(201).json({
            ok: true,
            msg: 'Donacion creada',
        })

    }
    catch(e){
        console.log(e)
        res.status(500).json({
            ok: false,
            msg: 'Error en la creacion de la donacion'
        })
    }
    
}


export const postularResponsableDonacion = async (req, res = response) => {
    const { id_donacion, id_user } = req.body
    try{
        await new Responsable_recojo( { id_user, id_donacion, estado: 0 } ).save()
        res.status(201).json({
            ok: true,
            msg: 'Postulacion realizada'
        })
    }
    catch{
        res.status(500).json({
            ok: false,
            msg: 'Error al postular'
        })
    }
}



export const confirmarResponsableDonacion = async (req, res = response) => {
    const { id_donacion, id_user } = req.body

    try{
        await Responsable_recojo.update({estado: 1}, {
            where: {
                id_donacion: id_donacion,
                id_user: id_user
            }
        })

        await Donacion.update({estado: 1}, {
            where: {
                id_donacion: id_donacion
            }
        })

        await Responsable_recojo.destroy({
            where:{
                id_donacion: id_donacion,
                estado: 0
            }
        })

       

        res.json({
            ok: true,
            msg: 'Postulante seleccionado'
        })
    }
    catch{
        res.status(500).json({
            ok: false,
            msg: 'Error al seleccionar al encargado'
        })
    }
}

export const getPendingDonationsResponsableVoluntario = async (req, res = response) => {
    let id_user = req.header('id_user');
    id_user = parseInt(id_user)
    try{
        let donaciones = []
        const donations = await Donacion.findAll(
            {
                where:{
                    estado: 0
                },
                include: [
                    
                    {
                        model: Responsable_recojo
                    },
                    {
                        model: Usuario,
                        include: [{model: Persona}]
                    }
                ]
            }
        )
        

        donations.map((donacion) => {
            if(donacion.dataValues.Responsable_recojos.length === 0 ){
                console.log(donacion.dataValues.Usuario.dataValues.Persona.dataValues.nombre)
                donaciones = [...donaciones,
                    {
                        id_donacion: donacion.dataValues.id_donacion,
                        fecha_d: donacion.dataValues.fecha_d,
                        estado: donacion.dataValues.estado,
                        nombre_donante: donacion.dataValues.Usuario.dataValues.Persona.dataValues.nombre,
                        ap_paterno_donante: donacion.dataValues.Usuario.dataValues.Persona.dataValues.ap_paterno,
                    }
                ]
            }else{
                let sw = true;
                donacion.dataValues.Responsable_recojos.map((responsable) => {
                //console.log(donacion.dataValues.id_donacion, id_user, responsable.dataValues.id_user)
                if(responsable.dataValues.id_user === id_user && sw){
                    sw = false;
                }
                    
                })

                if(sw){
                    donaciones = [...donaciones,
                        {
                            id_donacion: donacion.dataValues.id_donacion,
                            fecha_d: donacion.dataValues.fecha_d,
                            estado: donacion.dataValues.estado,
                            nombre_donante: donacion.dataValues.Usuario.dataValues.Persona.dataValues.nombre,
                            ap_paterno_donante: donacion.dataValues.Usuario.dataValues.Persona.dataValues.ap_paterno,
                        }
                    ]
                }
            }    
        })

        res.json({
            ok: true,
            donaciones
        })
    }
    catch(e){
        console.log(e)
        res.json({
            ok: false,
            msg: "Error al mostrar las donaciones disponibles"
        })
    }
}

export const getPendingDonationsResponsableAdmin = async (req, res = response) => {
    try{

        let donaciones = []

        const donations = await Donacion.findAll(
            {
                where:{
                    estado: 0
                },
                include:[
                    {
                        model: Responsable_recojo,
                        include: 
                            [{model: Usuario, include: [{model: Persona}]}]  
                        
                    }
                ]
            }
        )

        donations.map((donacion) => {
            if(donacion.dataValues.Responsable_recojos.length !== 0){

                let postulantes = []

                donacion.dataValues.Responsable_recojos.map( (postulante) => {
                    postulantes = [...postulantes,
                        {
                            id_user: postulante.dataValues.Usuario.dataValues.id_user,
                            ci: postulante.dataValues.Usuario.dataValues.Persona.dataValues.ci,
                            nombre: postulante.dataValues.Usuario.dataValues.Persona.dataValues.nombre,
                            ap_paterno: postulante.dataValues.Usuario.dataValues.Persona.dataValues.ap_paterno,
                            ap_materno: postulante.dataValues.Usuario.dataValues.Persona.dataValues.ap_materno,
                        }
                    ]
                })


                donaciones = [...donaciones,
                    {

                        id_donacion: donacion.dataValues.id_donacion,
                        fecha_d: donacion.dataValues.fecha_d,
                        postulantes: postulantes
    
                    }
                ]
            }
            
        })

        //console.log(donaciones)
        res.status(200).json({
            ok: true,
            donaciones
        })

        

    }
    catch(e){
        console.log(e)
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las donaciones',
        })
    }
}


export const getDetalleDonacion = async (req, res = response) => {
    let id_donacion = req.header('id_donacion')
    id_donacion = parseInt(id_donacion)

    try{
        const productos = await Producto.findAll({where: {id_donacion: id_donacion}})
        const dineros = await Dinero.findAll({where: {id_donacion: id_donacion}})
        const alimentos = await Alimento.findAll({where: {id_donacion: id_donacion}})

        let body = {
            producto: productos, 
            dinero: dineros,
            alimento: alimentos
        }

        res.status(200).json(
            {
                ok: true, 
                body
            }
        )
    }

    catch(e){
        res.status(500).json({
            ok: false,
            msg: "Fallo al encontrar los productos"
        })
    }



}