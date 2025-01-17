import { Objeto } from "../../analizadorXML/helpers";
import { ErroresGlobal } from "../../analizadorXPath/AST/Global";
import { Error } from "../Tabla/Error";

export class Menor {
    linea = 0; 
    columna = 0; 
    opeIzq = null; 
    opeDer = null; 
    tipoObj = null; 
    tipo = null; 
    especial = false

    constructor(linea, columna, tipoObj, tipo, opeIzq, opeDer, especial){
        this.linea = linea; 
        this.columna = columna; 
        this.opeIzq = opeIzq; 
        this.opeDer = opeDer; 
        this.tipoObj = tipoObj; 
        this.tipo = tipo; 
        this.especial = especial; 
    }   

    getValor(tabla, xml){
        this.opeIzq.getValor(tabla, xml)
        this.opeDer.getValor(tabla, xml)
    }
    
}

export class Mayor{
    linea = 0; 
    columna = 0; 
    opeIzq = null; 
    opeDer = null; 
    tipoObj = null; 
    tipo = null; 
    especial = null; 

    constructor(linea, columna, tipoObj, tipo, opeIzq, opeDer, especial){
        this.linea = linea; 
        this.columna = columna; 
        this.opeIzq = opeIzq; 
        this.opeDer = opeDer; 
        this.tipoObj = tipoObj; 
        this.tipo = tipo; 
        this.especial = especial; 
    }   

    getValor(tabla, xml){
        let resIzq = this.opeIzq.getValor(tabla, xml)
        if(resIzq instanceof Error)
            return resIzq; 

        let resDer = this.opeDer.getValor(tabla, xml)
        if(resDer instanceof Error)
            return resDer

        console.log('MAYOR', resIzq, resDer)
        
            if(resIzq instanceof Objeto){
                let retorno =  new Objeto('/', [], [], resIzq.linea, resIzq.columna, ""); 
                for(let hijo  of resIzq.hijos){
                    if(typeof resDer === 'string'){
                        if(hijo.texto > resDer){
                            retorno.hijos.push(hijo.padre)
                        }
                    }else{
                        // es otra subconsulta 

                    }
                }
                return retorno
            }else{
                if(resIzq > resDer)return true 
                return false            
            }


    }
    
}


export class MenorIgual{
    linea = 0; 
    columna = 0; 
    opeIzq = null; 
    opeDer = null; 
    tipoObj = null; 
    tipo = null; 
    especial = false; 

    constructor(linea, columna, tipoObj, tipo, opeIzq, opeDer, especial){
        this.linea = linea; 
        this.columna = columna; 
        this.opeIzq = opeIzq; 
        this.opeDer = opeDer; 
        this.tipoObj = tipoObj; 
        this.tipo = tipo; 
        this.especial = especial; 
    }   
    
    getValor(entorno){
        let resIzq = this.opeIzq.getValor(entorno)
        if(resIzq instanceof Error)
            return resIzq
        

        let resDer = this.opeDer.getValor(entorno)
        if(resDer instanceof Error)
            return resDer

            console.log('MAYOR', resIzq, resDer)
        
            if(resIzq instanceof Objeto){
                let retorno =  new Objeto('/', [], [], resIzq.linea, resIzq.columna, ""); 
                for(let hijo  of resIzq.hijos){
                    if(typeof resDer === 'string'){
                        if(hijo.texto <= resDer){
                            retorno.hijos.push(hijo.padre)
                        }
                    }else{
                        // es otra subconsulta 

                    }
                }
                return retorno
            }else{
                if(resIzq <= resDer)return true 
                return false            
            }
    }
}

export class MayorIgual {
    linea = 0; 
    columna = 0; 
    opeIzq = null; 
    opeDer = null; 
    tipoObj = null; 
    tipo = null; 
    especial = false; 

    constructor(linea, columna, tipoObj, tipo, opeIzq, opeDer, especial){
        this.linea = linea; 
        this.columna = columna; 
        this.opeIzq = opeIzq; 
        this.opeDer = opeDer; 
        this.tipoObj = tipoObj; 
        this.tipo = tipo; 
        this.especial = especial; 
    }   
    
    getValor(tabla, xml){
        this.opeIzq.getValor(tabla, xml)
        this.opeDer.getValor(tabla, xml)
    }
}

export class Igualdad{
    linea = 0; 
    columna = 0; 
    opeIzq = null; 
    opeDer = null; 
    tipoObj = null; 
    tipo = null; 
    especial = false; 

    constructor(linea, columna, tipoObj, tipo, opeIzq, opeDer, especial){
        this.linea = linea; 
        this.columna = columna; 
        this.opeIzq = opeIzq; 
        this.opeDer = opeDer; 
        this.tipoObj = tipoObj; 
        this.tipo = tipo; 
        this.especial = especial; 
    }   
    
    getValor(entorno){
        console.log('Ejecutando la Igualdad', this)
        let resIzq = this.opeIzq.getValor(entorno); 
        if(resIzq instanceof Error)
            return resIzq

        let resDer = this.opeDer.getValor(entorno); 
        if(resDer instanceof Error)
            return resDer
        
        console.log('Igualdad', resIzq, resDer)

        if(resIzq instanceof Objeto){
            let retorno = new Objeto('/', [], [], resIzq.linea, resIzq.columna, "")
            for(let hijo of resIzq.hijos){
                if(typeof resDer === 'string'){
                    if(hijo.texto === resDer){
                        retorno.hijos.push(hijo.padre)
                    }
                }
            }
            return retorno
        }else{
              if(resIzq == resDer)return true
              return false

        }
    }
}

export class Desigualdad{
    linea = 0; 
    columna = 0; 
    opeIzq = null; 
    opeDer = null; 
    tipoObj = null; 
    tipo = null; 
    especial = false; 

    constructor(linea, columna, tipoObj, tipo, opeIzq, opeDer, especial){
        this.linea = linea; 
        this.columna = columna; 
        this.opeIzq = opeIzq; 
        this.opeDer = opeDer; 
        this.tipoObj = tipoObj; 
        this.tipo = tipo; 
        this.especial = especial; 
    }   
    
    getValor(tabla, xml){
        let resIzq = this.opeIzq.getValor(tabla, xml); 
        if(resIzq instanceof Error)
            return resIzq

        let resDer = this.opeDer.getValor(tabla, xml); 
        if(resDer instanceof Error)
            return resDer
    }
}