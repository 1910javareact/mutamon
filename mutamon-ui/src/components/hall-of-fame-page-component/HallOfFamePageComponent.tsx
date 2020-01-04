import React from 'react'
import  NavbarComponent  from '../navbar-component/NavbarContainer'
import { User } from '../../models/user'
import { Monster } from '../../models/monster'
import { WinnersDisplayComponent } from './winners-display-component/WinnersDisplayComponent'
import { mutamonApiGetWinningMonstersById } from '../../remote/mutamon-clients/mutamon-mutamon'
import { Link, Redirect } from 'react-router-dom'
import { Button } from 'reactstrap'

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
            let winners = await mutamonApiGetWinningMonstersById(this.props.user.userId)
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
            this.props.user.userId?
            <div>
                <NavbarComponent/>
                <WinnersDisplayComponent winners={this.state.winners}/>
                <Link to='/mutate'><Button>Mutate</Button></Link>
            </div>
            :
            <Redirect to="/login"></Redirect>
        )
    }
}