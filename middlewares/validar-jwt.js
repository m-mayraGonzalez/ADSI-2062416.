import jwt from 'jsonwebtoken'
import Usuario from '../models/usuario.js'; 
import Persona from '../models/persona.js'; 
import Categoria from '../models/categoria.js'; 
import Articulos from '../models/articulos.js'

const generarJWT=(id)=>{
    return new Promise((resolve, reject)=>{
        const payload={uid:id}
        jwt.sign(payload, process.env.SECRETPRIVATEKEY,{
            expiresIn:'4h'
        },(err, token)=>{
            if(err){
                reject('No se pudo generar el token')
            }else{
                resolve(token)
            }
        })
    })
}

const validarJWT=async(req, res, next)=>{
    const token=req.header('token')
    if(! token){
        return res.status(401).json({
            msg:'No existe token en la petición'
        })
    }

    try{
        const {uid}=jwt.verify(token,process.env.SECRETPRIVATEKEY)
        const usuario=await Usuario.findById(uid)
        if(! usuario){
            return res.status(401).json({
                msg:'Token no válido'
            })
        }

        if(usuario.estado===0){
            return res.status(401).json({
                msg:'Token no válido'
            })
        }

        req.usuario=usuario

        next()

    }catch (error){
        res.status(401).json({
            msg:'Token no válido'
        })
    }
}

const generarPJWT=(id)=>{
    return new Promise((resolve, reject)=>{
        const payload={uid:id}
        jwt.sign(payload, process.env.SECRETPRIVATEKEY,{
            expiresIn:'4h'
        },(err, token)=>{
            if(err){
                reject('No se pudo generar el token')
            }else{
                resolve(token)
            }
        })
    })
}

const validarPJWT=async(req, res, next)=>{
    const token=req.header('token')
    if(! token){
        return res.status(401).json({
            msg:'No existe token en la petición'
        })
    }

    try{
        const {uid}=jwt.verify(token,process.env.SECRETPRIVATEKEY)
        const persona=await Persona.findById(uid)
        if(! persona){
            return res.status(401).json({
                msg:'Token no válido'
            })
        }

        if(persona.estado===0){
            return res.status(401).json({
                msg:'Token no válido'
            })
        }

        req.persona=persona

        next()

    }catch (error){
        res.status(401).json({
            msg:'Token no válido'
        })
    }
}

const generarCJWT=(id)=>{
    return new Promise((resolve, reject)=>{
        const payload={uid:id}
        jwt.sign(payload, process.env.SECRETPRIVATEKEY,{
            expiresIn:'4h'
        },(err, token)=>{
            if(err){
                reject('No se pudo generar el token')
            }else{
                resolve(token)
            }
        })
    })
}

const validarCJWT=async(req, res, next)=>{
    const token=req.header('token')
    if(! token){
        return res.status(401).json({
            msg:'No existe token en la petición'
        })
    }

    try{
        const {uid}=jwt.verify(token,process.env.SECRETPRIVATEKEY)
        const categoria=await Categoria.findById(uid)
        if(! categoria){
            return res.status(401).json({
                msg:'Token no válido'
            })
        }

        if(categoria.estado===0){
            return res.status(401).json({
                msg:'Token no válido'
            })
        }

        req.categoria=categoria

        next()

    }catch (error){
        res.status(401).json({
            msg:'Token no válido'
        })
    }
}

const generarAJWT=(id)=>{
    return new Promise((resolve, reject)=>{
        const payload={uid:id}
        jwt.sign(payload, process.env.SECRETPRIVATEKEY,{
            expiresIn:'4h'
        },(err, token)=>{
            if(err){
                reject('No se pudo generar el token')
            }else{
                resolve(token)
            }
        })
    })
}

const validarAJWT=async(req, res, next)=>{
    const token=req.header('token')
    if(! token){
        return res.status(401).json({
            msg:'No existe token en la petición'
        })
    }

    try{
        const {uid}=jwt.verify(token,process.env.SECRETPRIVATEKEY)
        const articulos=await Articulos.findById(uid)
        if(! articulos){
            return res.status(401).json({
                msg:'Token no válido'
            })
        }

        if(articulos.estado===0){
            return res.status(401).json({
                msg:'Token no válido'
            })
        }

        req.articulos=articulos

        next()

    }catch (error){
        res.status(401).json({
            msg:'Token no válido'
        })
    }
}
export {generarJWT, validarJWT, generarPJWT, validarPJWT, generarCJWT, validarCJWT, generarAJWT, validarAJWT}