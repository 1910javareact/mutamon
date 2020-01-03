import React from "react";
import { Monster } from "../../models/monster";
import { Mutation } from "../../models/mutation";

interface IFightingComponentPorps{
    userMonster: Monster,
    npcMonster: Monster
}

interface IFightingComponentState{
    userMonster: Monster,
    npcMonster: Monster
}

export class FightingComponent extends React.Component<any,any>{
    constructor(props:any){
        super(props)
        this.state={
            monster: new Monster(0,0,0,'',0,true,[new Mutation(0,'',0,0,0,0)])
            
        }
    }

    //fighting logic

    



    render(){
        return(
            
        <p>battle starts</p>
        )
    }







}