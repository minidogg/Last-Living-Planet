import {engine} from '../js/_main.js'

export function StartUIRender(){
    engine.onRender.push(RenderUI)
}

function RenderUI(){

}