import { response } from 'express';
import { Donacion, Responsable_recojo, Usuario, Persona, Producto, Dinero, Alimento, Postulacion_recojo, Contiene_a, Contiene_d, Contiene_p } from '../models/index_db.js';
import { insert_alimento, insert_producto, insert_dinero } from '../helpers/insertions.js'
import { Op } from '@sequelize/core';

export const addDonation = async (req, res = response) => {
    const { id_user, alimento, producto, dinero, fecha_d } = req.body;

    try{
        
        const donacion = new Donacion({fecha_d, userD: id_user, estado: 0})
        await donacion.save();
        //console.log(id_user, alimento, producto, dinero, fecha_d)

        if(alimento){
            const { alimento } = req.body;

            alimento.forEach(async element => {
                let {cantidad_a, caducidad_a, nombre_a} = element
                
                let ali = await Alimento.findAll({where: {nombre_a: nombre_a}})
                let cantidad = ali[0].dataValues.cantidad_a + cantidad_a;
                console.log(cantidad)
                await Alimento.update({cantidad_a: cantidad}, {
                    where: {
                        nombre_a: nombre_a
                    }
                })

                await new Contiene_a({id_alimento: ali[0].dataValues.id_alimento, id_donacion: donacion.id_donacion, monto: cantidad_a, caducidad_a: caducidad_a}).save()
                
            });
        }

        if(producto){
            const { producto } = req.body;
            //console.log(producto)


            producto.forEach(async element => {
                let {cantidad_p, nombre_p} = element

                let pro = await Producto.findAll({where: {nombre_p: nombre_p}});
                let cantidad = pro[0].dataValues.cantidad_p + cantidad_p;
                console.log(cantidad)
                await Producto.update({cantidad_p: cantidad}, {
                    where: {
                        nombre_p: nombre_p
                    }
                })

                await new Contiene_p({id_producto: pro[0].dataValues.id_producto, id_donacion: donacion.id_donacion, monto: cantidad_p}).save()
            });
        }

        if(dinero){
            const { dinero } = req.body;
            dinero.forEach(async element => {
                let {monto, cambio, id_dinero} = element
                
                let din = await Dinero.findAll({where: {cambio: cambio}});
                let cantidad = din[0].dataValues.monto + monto;
                console.log(cantidad)
                await Dinero.update({monto: cantidad}, {
                    where: {
                        cambio: cambio
                    }
                })

                await new Contiene_d({id_donacion: donacion.id_donacion, id_dinero: din[0].dataValues.id_dinero,  monto: monto}).save()

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
    const { id_donacion, id_user, cantidad } = req.body
    try{
        await new Responsable_recojo( { id_user, id_donacion, estado: 0, cantidad, estado_c: 0 } ).save()
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
                            cantidad: postulante.dataValues.cantidad
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
        const productos = await Contiene_p.findAll(
            {
                where: {
                    id_donacion: id_donacion
                },
                include: 
                    {
                        model: Producto
                    }
                
            }
        )

        const dineros = await Contiene_d.findAll(
            {
                where: {
                    id_donacion: id_donacion
                },
                include:{
                    model: Dinero
                }
            }

        )
        const alimentos = await Contiene_a.findAll(
            {
                where: {
                    id_donacion: id_donacion
                },
                include: {
                    model: Alimento
                }
            }
        )
        let produ = []
        let ali = []
        let dine = []

        productos.map( (producto) => {
            produ = [...produ,
                {
                    nombre: producto.dataValues.Producto.dataValues.nombre_p,
                    cantidad: producto.monto
                }
            ]
        })

        dineros.map( (dinero) => {
            dine = [...dine,
                {
                    cambio: dinero.dataValues.Dinero.cambio,
                    cantidad: dinero.dataValues.monto
                }

            ]
        })

        alimentos.map((alimento)=>{
            ali = [...ali,
                {
                    nombre: alimento.dataValues.Alimento.dataValues.nombre_a,
                    cantidad: alimento.dataValues.monto
                }

            ]
        })




        let body = {
            producto: produ, 
            dinero: dine,
            alimento: ali
        }

        res.status(200).json(
            {
                ok: true, 
                body
            }
        )
    }

    catch(e){
        console.log(e)
        res.status(500).json({
            ok: false,
            msg: "Fallo al encontrar los productos"
        })
    }

}


//--------------------------------------------------------------------------
export const getDonacionColaborador = async (req, res = response) => {
    let id_user = req.header('id_user')
    id_user = parseInt(id_user)
    try{
        const donaciones = await Responsable_recojo.findAll({
            where: {
                estado: 1,
                estado_c: 0,
                id_user: {[Op.ne]: id_user}
            },
            include: [
                {
                    model: Usuario,
                    include: [{model: Persona}]
                    
                }
            ]
        })

        const colaboradores = await Postulacion_recojo.findAll({
            where: {
                id_user: id_user
            }
        })

        //si ya te encuentras como colaborador en la donacion no mostrar esa donacion

        let don = []
        
        donaciones.map((donacion) => {
            let sw = true;
            colaboradores.map((colaborador) => {
                if(donacion.dataValues.id_donacion === colaborador.dataValues.id_donacion){
                    sw = false;
                }
            })
            
            if(sw){
                don = [...don,
                    {
                        id_donacion: donacion.dataValues.id_donacion,
                        //fecha_d: donacion.dataValues.Donacion.dataValues.fecha_d,
                        nombre: donacion.dataValues.Usuario.dataValues.Persona.dataValues.nombre,
                        ap_paterno: donacion.dataValues.Usuario.dataValues.Persona.dataValues.ap_paterno,
                        //cantidad: donacion.dataValues.cantidad
                    }
                ]
            }
        })

        //let body = []
        //donaciones.map((donacion) => {
        //    body = [...body,
        //        {
        //            id_donacion: donacion.dataValues.id_donacion,
        //            cantidad: donacion.dataValues.cantidad,
        //            nombre: donacion.dataValues.Usuario.dataValues.Persona.dataValues.nombre,
        //            ap_paterno: donacion.dataValues.Usuario.dataValues.Persona.dataValues.ap_paterno,
        //        }
        //    ]
        //})

        res.status(200).json({
            ok: true,
            don
        })
    }
    catch(e){
        console.log(e)
        res.status(500).json({
            ok: false,
            msg: 'Error al obtener las postulaciones'
        })
    }

}


export const postularColaboradorDonacion = async (req, res = response) => {
    const { id_donacion, id_user } = req.body
    try{

        const colaboradores = await Postulacion_recojo.findAll({where:{id_donacion: id_donacion}})

        const don = await Responsable_recojo.findAll({where:{
            id_donacion: id_donacion     
         }})

        let cantidad = don[0].dataValues.cantidad 
        if(colaboradores.length < cantidad - 1){
            await new Postulacion_recojo( { id_user, id_donacion } ).save()
            res.status(201).json({
                ok: true,
                msg: 'Postulacion realizada'
            })
        }
        else if(colaboradores.length === cantidad - 1){
            await new Postulacion_recojo( { id_user, id_donacion } ).save()
            await Responsable_recojo.update({estado_c: 1}, {
                where: {
                    id_donacion: id_donacion
                }
            })
            res.status(201).json({
                ok: true,
                msg: 'Postulacion realizada'
            })
        }
        else{
            res.status(400).json({
                ok: false,
                msg: 'No hay cupos disponibles'
            })
        }
    }
    catch{
        res.status(500).json({
            ok: false,
            msg: 'Error al postular'
        })
    }
}




export const getEstadoPostulacionResponsable = async (req, res = response) => {
    let id_user = req.header('id_user')
    id_user = parseInt(id_user)
    
    try{
        const postulacionesPendientes = await Responsable_recojo.findAll(
            {
                where: {
                    id_user: id_user,
                    estado: 0
                }
            }
        )

        const postulacionesAceptadas = await Responsable_recojo.findAll(
            {
                where: {
                    id_user: id_user,
                    estado: 1
                }
            }
        )

        let body = {
            postulacionesPendientes: postulacionesPendientes,
            postulacionesAceptadas: postulacionesAceptadas
        };

        res.status(200).json({
            ok: true,
            body
        })


    }
    catch(e){
        res.status(400).json({
            ok: false,
            msg: 'Fallo al obtener las postulaciones pendientes'
        })
    }

}


export const getPostulacionColaborador = async (req, res = response) => {
    let id_user = req.header('id_user')
    id_user = parseInt(id_user)
    
    try{
        const postulaciones = await Postulacion_recojo.findAll(
            {
                where: {
                    id_user: id_user
                }
            }
        )

        let body = {
            postulaciones: postulaciones
        };

        res.status(200).json({
            ok: true,
            body
        })
    }
    catch(e){
        res.status(400).json({
            ok: false,
            msg: 'Fallo al obtener las postulaciones pendientes'
        })
    }
}