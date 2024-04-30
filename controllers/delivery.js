import { response } from "express";
import { Alimento, Persona, Solicitud, Tiene_a, Tiene_d, Tiene_p, Producto, Dinero, Responsable_entrega, Participa, Usuario } from "../models/index_db.js";
import { ConstraintChecking, Op } from '@sequelize/core';

export const addSolicitud = async (req, res = response) => {
    const {id_user, fecha_solicitud, alimento, producto, dinero} = req.body;

    try{
        const solicitud = new Solicitud({fecha_solicitud, id_user, estado:0, estado_s:0});
        await solicitud.save();

        console.log(alimento, producto, dinero)

        if(alimento){
            // Agregar alimento
            alimento.map(async (alimentos) => {
                let {nombre_a, cantidad_a} = alimentos;
                let ali = await Alimento.findOne({where: {nombre_a:nombre_a}});
                let id_alimento = ali.id_alimento;
                let tiene_a = new Tiene_a({id_alimento, id_solicitud: solicitud.id_solicitud, cantidad_a: cantidad_a});
                await tiene_a.save();
            })
        }
        if(producto){
            // Agregar producto
            producto.map(async (productos) => {
                let {nombre_p, cantidad_p} = productos;
                let pro = await Producto.findOne({where: {nombre_p: nombre_p}});
                let id_producto = pro.id_producto;
                let tiene_p = new Tiene_p({id_producto, id_solicitud: solicitud.id_solicitud, cantidad_p: cantidad_p});
                await tiene_p.save();

            })
        }
        if(dinero){
            // Agregar dinero
            dinero.map(async (dineros) => {
                
                let {monto, cambio} = dineros;
                let din = await Dinero.findOne({where: {cambio: cambio}});
                let id_dinero = din.id_dinero;
                let tiene_d = new Tiene_d({id_dinero, id_solicitud: solicitud.id_solicitud, monto: monto});
                await tiene_d.save();
            })
        }

        res.status(200).json({
            ok: true,
            msg: "Solicitud agregada"
        })

    }

    catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Error en la solicitud"
        })
    }

}


export const confirmarSolicitud = async (req, res = response) => {
    const {id_solicitud} = req.body;

    try{
        let solicitud = await Solicitud.findOne({where: {id_solicitud: id_solicitud}});
        await solicitud.update({estado_s: 1}, {where: {id_solicitud: id_solicitud}});

        //restar los datos de la bd
        let alimentos = await Tiene_a.findAll(
            {
                where: {
                    id_solicitud: id_solicitud
                },
                include: {
                    model: Alimento
                }
            }
        );
       
        let productos = await Tiene_p.findAll(
            {
                where: {
                    id_solicitud: id_solicitud
                },
                include: {
                    model: Producto
                }
            }
        );

        let dineros = await Tiene_d.findAll(
            {
                where: {
                    id_solicitud: id_solicitud
                },
                include: {
                    model: Dinero
                }
            }
        );
        console.log(productos)
        alimentos.map(async (alimento) => {
            let ali = await Alimento.findOne({where: {id_alimento: alimento.id_alimento}});
            console.log(ali.cantidad_a, alimento.cantidad_a)
            await ali.update({cantidad_a: ali.cantidad_a - alimento.cantidad_a}, {where: {id_alimento: alimento.id_alimento}});
        })

        productos.map(async (producto) => {
            let pro = await Producto.findOne({where: {id_producto: producto.id_producto}});
            console.log(pro.cantidad_p, producto.cantidad_p)
            await pro.update({cantidad_p: pro.cantidad_p - producto.cantidad_a}, {where: {id_producto: producto.id_producto}});
        }

        )

        dineros.map(async (dinero) => {
            let din = await Dinero.findOne({where: {id_dinero: dinero.id_dinero}});
            await din.update({monto: din.monto - dinero.monto}, {where: {id_dinero: dinero.id_dinero}});
        }
        )





        res.status(200).json({
            ok: true,
            msg: "Solicitud confirmada"
        })

    }

    catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Error en la solicitud"
        })
    }
}


export const getSolicitudesPendientes = async (req, res = response) => {
    try{
        let solicitudes = []
        let solicitud = await Solicitud.findAll(
            {
                where:{
                    estado_s: 0
                },
                
                include: [
                    {
                        model: Usuario,
                        include: [{model: Persona}]
                    }
                ]
            
            }
            );

            solicitud.map( (sol) =>{
                solicitudes = [...solicitudes,{
                    id_solicitud: sol.dataValues.id_solicitud,
                    id_usuario: sol.dataValues.Usuario.dataValues.id_user,
                    ci: sol.dataValues.Usuario.dataValues.Persona.ci,
                    nombre: sol.dataValues.Usuario.dataValues.Persona.nombre,
                    ap_paterno: sol.dataValues.Usuario.dataValues.Persona.ap_paterno,
                    ap_materno: sol.dataValues.Usuario.dataValues.Persona.ap_materno
                    
                }]
                
            })
        res.status(200).json({
            ok: true,
            solicitudes
        })
    }

    catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Error en la solicitud"
        })
    }
}


export const getItemsDisponibles = async (req, res = response) => {
    try{
        let alimentos = await Alimento.findAll({
            where:{
                cantidad_a: {
                    [Op.gt]: 0
                }
            }
        });

        let productos = await Producto.findAll({
            where:{
                cantidad_p: {
                    [Op.gt]: 0
                }
            }
        });

        let dineros = await Dinero.findAll({
            where:{
                monto: {
                    [Op.gt]: 0
                }
            }
        });


        res.status(200).json({
            ok: true,
            alimentos,
            productos,
            dineros
        })
    }

    catch(error){
        console.log(error);
        res.status(500).json({
            msg: "Error en la solicitud"
        })
    }
}

export const postularResponsableDelivery = async(req, res = response) => {
    const {id_solicitud, id_user, cantidad} = req.body

    try{
        await new Responsable_entrega( { id_user, id_solicitud, estado: 0, cantidad, estado_c: 0 } ).save()
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

export const confirmarResponsableDelivery= async(req, res=response)=>{
    const { id_solicitud, id_user } = req.body

    try{
        await Responsable_entrega.update({estado: 1}, {
            where: {
                id_solicitud: id_solicitud,
                id_user: id_user
            }
        })

        await Solicitud.update({estado: 1}, {
            where: {
                id_solicitud: id_solicitud
            }
        })

        await Responsable_entrega.destroy({
            where:{
                id_solicitud: id_solicitud,
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

export const getPendingSolicitudesResponsableVoluntario = async (req, res = response) => { // ver solicitudes a las que te puedes postular
    let id_user = req.header('id_user');
    id_user = parseInt(id_user)
    try{
        let solicitudes = []
        const solis = await Solicitud.findAll(
            {
                where:{
                    estado_s: 1,
                    estado: 0
                },
                include: [
                    
                    {
                        model: Responsable_entrega
                    },
                    {
                        model: Usuario,
                        include: [{model: Persona}]
                    }
                ]
            }
        )
        
        console.log(solis)

        solis.map((solicitud) => {
            if(solicitud.dataValues.Responsable_entregas.length === 0 ){
                // console.log(solicitud.dataValues.Usuario.dataValues.Persona.dataValues.nombre)
                solicitudes = [...solicitudes,
                    {
                        id_solicitud: solicitud.dataValues.id_solicitud,
                        fecha_solicitud: solicitud.dataValues.fecha_solicitud,
                        estado: solicitud.dataValues.estado,
                        nombre_solicitante: solicitud.dataValues.Usuario.dataValues.Persona.dataValues.nombre,
                        ap_paterno_solicitante: solicitud.dataValues.Usuario.dataValues.Persona.dataValues.ap_paterno,
                    }
                ]
            }else{
                let sw = true;
                solicitud.dataValues.Responsable_entregas.map((responsable) => {
                if(responsable.dataValues.id_user === id_user && sw){
                    sw = false;
                }
                    
                })

                if(sw){
                    solicitudes = [...solicitudes,
                        {
                            id_solicitud: solicitud.dataValues.id_solicitud,
                            fecha_solicitud: solicitud.dataValues.fecha_solicitud,
                            estado: solicitud.dataValues.estado,
                            nombre_solicitante: solicitud.dataValues.Usuario.dataValues.Persona.dataValues.nombre,
                            ap_paterno_solicitante: solicitud.dataValues.Usuario.dataValues.Persona.dataValues.ap_paterno,
                        }
                    ]
                }
            }    
        })

        res.json({
            ok: true,
            solicitudes
        })
    }
    catch(e){
        console.log(e)
        res.json({
            ok: false,
            msg: "Error al mostrar las solicitudes disponibles"
        })
    }
}

export const getPendingSolicitudesResponsableAdmin = async (req, res = response) => { 
    try{

        let solicitudes = []

        const solis = await Solicitud.findAll(
            {
                where:{
                    estado_s: 1,
                    estado:0
                },
                include:[
                    {
                        model: Responsable_entrega,
                        include: 
                            [{model: Usuario, include: [{model: Persona}]}]  
                        
                    }
                ]
            }
        )

        solis.map((solicitud) => {
            if(solicitud.dataValues.Responsable_entregas.length !== 0){

                let postulantes = []

                solicitud.dataValues.Responsable_entregas.map( (postulante) => {
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
                solicitudes = [...solicitudes,
                    {

                        id_solicitud: solicitud.dataValues.id_solicitud,
                        fecha_solicitud: solicitud.dataValues.fecha_solicitud,
                        postulantes: postulantes
    
                    }
                ]
            }
            
        })
        res.status(200).json({
            ok: true,
            solicitudes
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

export const getDetalleSolicitud = async (req, res = response) => {
    let id_solicitud = req.header('id_solicitud')
    id_solicitud = parseInt(id_solicitud)

    try{
        const productos = await Tiene_p.findAll(
            {
                where: {
                    id_solicitud: id_solicitud
                },
                include: 
                    {
                        model: Producto
                    }
                
            }
        )

        const dineros = await Tiene_d.findAll(
            {
                where: {
                    id_solicitud: id_solicitud
                },
                include:{
                    model: Dinero
                }
            }

        )
        const alimentos = await Tiene_a.findAll(
            {
                where: {
                    id_solicitud: id_solicitud
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
                    cantidad: producto.cantidad_p
                }
            ]
        })

        dineros.map( (dinero) => {
            dine = [...dine,
                {
                    cambio: dinero.dataValues.Dinero.cambio,
                    cantidad: dinero.monto
                }

            ]
        })

        alimentos.map((alimento)=>{
            ali = [...ali,
                {
                    nombre: alimento.dataValues.Alimento.dataValues.nombre_a,
                    cantidad: alimento.cantidad_a
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


export const getSolicitudColaborador = async (req, res = response) => {
    let id_user = req.header('id_user')
    id_user = parseInt(id_user)
    try{
        const solicitudes = await Responsable_entrega.findAll({
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

        const colaboradores = await Participa.findAll({
            where: {
                id_user: id_user
            }
        })

        
        //si ya te encuentras como colaborador en la donacion no mostrar esa donacion

        let don = []
        
        solicitudes.map((solicitud) => {
            let sw = true;
            colaboradores.map((colaborador) => {
                if(solicitud.dataValues.id_solicitud === colaborador.dataValues.id_solicitud){
                    sw = false;
                }
            })
            
            if(sw){
                don = [...don,
                    {
                        id_solicitud: solicitud.dataValues.id_solicitud,
                        //fecha_d: donacion.dataValues.Donacion.dataValues.fecha_d,
                        nombre: solicitud.dataValues.Usuario.dataValues.Persona.dataValues.nombre,
                        ap_paterno: solicitud.dataValues.Usuario.dataValues.Persona.dataValues.ap_paterno,
                        //cantidad: donacion.dataValues.cantidad
                    }
                ]
            }
        })

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

export const postularColaboradorSolicitud = async (req, res = response) => {
    const { id_solicitud, id_user } = req.body
    try{

        const colaboradores = await Participa.findAll({where:{id_solicitud: id_solicitud}})

        const sol = await Responsable_entrega.findAll({where:{
            id_solicitud: id_solicitud     
         }})

        let cantidad = sol[0].dataValues.cantidad 
        if(colaboradores.length < cantidad - 1){
            await new Participa( { id_user, id_solicitud } ).save()
            res.status(201).json({
                ok: true,
                msg: 'Postulacion realizada'
            })
        }
        else if(colaboradores.length === cantidad - 1){
            await new Participa( { id_user, id_solicitud } ).save()
            await Responsable_entrega.update({estado_c: 1}, {
                where: {
                    id_solicitud: id_solicitud
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
        const postulacionesPendientes = await Responsable_entrega.findAll(
            {
                where: {
                    id_user: id_user,
                    estado: 0
                }
            }
        )

        const postulacionesAceptadas = await Responsable_entrega.findAll(
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
        const postulaciones = await Participa.findAll(
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