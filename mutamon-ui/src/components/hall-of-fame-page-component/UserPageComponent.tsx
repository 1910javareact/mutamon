import { render } from "@testing-library/react";
import React from "react";
import { NavbarComponent } from "../navbar-component/NavbarComponent";
import { Monster } from "../../models/monster";
import { Mutation } from "../../models/mutation";
import { ButtonToolbar, Button } from "reactstrap";

interface IUserPageComponentProps{
    monster: Monster
}

interface IUserPageStats{
    monsterId: number, 
    userId: number, 
    level: number, 
    name: string, 
    wins: number, 
    isCurrent: boolean, 
    mutations: Mutation[]
}

export class UserPageComponet extends React.Component<any,any>{

render(){
    return(
        <div>
            <NavbarComponent/>

            
                
                    <Button variant="Next Fight" size="lg">
                    Next Fight
                    </Button>
 
                



        </div>

        
    )
 }
}