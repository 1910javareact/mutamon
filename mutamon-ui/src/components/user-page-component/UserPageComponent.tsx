
import React from "react";
import { NavbarComponent } from "../navbar-component/NavbarComponent";
import { Monster } from "../../models/monster";
import { Mutation } from "../../models/mutation";
import { Button, Table } from "reactstrap";

interface IUserPageComponentProps{
    monster: Monster
}

interface IUserPageStats{
    monster: Monster

}

export class UserPageComponet extends React.Component<IUserPageComponentProps,IUserPageStats>{
    constructor(props:any) {
        super(props)
        this.state = {
            monster: new Monster(0,0,0,'',0,true, [new Mutation(0,'',0,0,0,0)])

        }
    }

 

    

render(){
    return(
        <div>
            <NavbarComponent/>

            <Table bordered color='blue'>

                    <tr>
                        <td>Monster Name</td>
                        <td>{this.props.monster.name}</td>
                    </tr>

                    <tr>
                        <td>speed</td>
                        <td>{this.props.monster.speed}</td>
                    </tr>
                    <tr>
                        <td>strength</td>
                        <td>{this.props.monster.strength}</td>
                    </tr>
                    <tr>
                        <td>Defence</td>
                        <td>{this.props.monster.defence}</td>
                    </tr>
                    <tr>
                        <td>wins</td>
                        <td>{this.props.monster.wins}</td>
                    </tr>
              
                </Table>
                
                    <Button variant="Next Fight" size="lg">
                    Next Fight
                    </Button>
 
                



        </div>

        
    )
 }
}