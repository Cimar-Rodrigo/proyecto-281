import Alimento from './alimento.js'
import Areas_de_servicio from './areas_de_servicio.js'
import Dinero from './dinero.js'
import Donacion from './donacion.js'
import Donante_natural from './donante_natural.js'
import Donante from './donante.js'
import Encargado_donante from './encargado_donante.js'
import Encargado_org_ben from './encargado_org_ben.js'
import Encargado_receptor from './encargado_receptor.js'
import Entrega from './entrega.js'
import Organizacion_benefica from './organizacion_benefica.js'
import Organizacion_donante from './organizacion_donante.js'
import Organizacion_receptora from './organizacion_receptora.js'
import Participa from './participa.js'
import Persona from './persona.js'
import Producto from './producto.js'
import Receptor_natural from './receptor_natural.js'
import Receptor from './receptor.js'
import Solicitud from './solicitud.js'
import Sucursal from './sucursal.js'
import Tiene_a from './tiene_a.js'
import Tiene_d from './tiene_d.js'
import Tiene_p from './tiene_p.js'
import Usuario from './usuario.js'
import Voluntario from './voluntario.js'
import Usuario_n from './usuario_n.js'
import Administrador from './administrador.js'

Usuario.belongsTo(Persona, {foreignKey: "ci"})
Persona.hasMany(Usuario, {foreignKey: "ci"})

Donante.belongsTo(Usuario, {foreignKey: "id_user"})
Usuario.hasMany(Donante, {foreignKey:"id_user"})


Voluntario.belongsTo(Usuario, {foreignKey:'id_user'})
Usuario.hasMany(Voluntario, {foreignKey:"id_user"})

export {
    Alimento,
    Areas_de_servicio,
    Dinero,
    Donacion,
    Donante,
    Donante_natural,
    Encargado_donante,
    Encargado_org_ben,
    Encargado_receptor,
    Entrega,
    Organizacion_benefica,
    Organizacion_donante,
    Organizacion_receptora,
    Participa,
    Persona,
    Producto,
    Receptor,
    Receptor_natural,
    Solicitud,
    Sucursal,
    Tiene_a,
    Tiene_d,
    Tiene_p,
    Usuario,
    Voluntario,
    Usuario_n,
    Administrador
}