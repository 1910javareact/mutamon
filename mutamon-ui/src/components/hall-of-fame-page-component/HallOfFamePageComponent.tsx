import React from 'react'
import  NavbarComponent  from '../navbar-component/NavbarContainer'
import { User } from '../../models/user'
import { Monster } from '../../models/monster'
import { WinnersDisplayComponent } from './winners-display-component/WinnersDisplayComponent'
import { mutamonApiGetWinningMonstersById } from '../../remote/mutamon-clients/mutamon-mutamon'

interface IHallOfFamePageComponentState{
    winners: Monster[]
}

interface IHallOfFamePageComponentProps{
    user: User
}

export class HallOfFamePageComponent extends React.Component<IHallOfFamePageComponentProps,IHallOfFamePageComponentState>{

    constructor(props: any){
        super(props)
        this.state = {
            winners: []
        }
    }

    async componentDidMount(){
        
        try{
            let winners = await mutamonApiGetWinningMonstersById(1)
            if(winners.status === 200){
                
                this.setState({
                    ...this.state,
                    winners: winners.body
                })
            }
            
        } catch {
            
        }
        
    }

    render(){
        return(
            <div>
                <NavbarComponent/>
                <WinnersDisplayComponent winners={this.state.winners}/>
            </div>
        )
    }
}