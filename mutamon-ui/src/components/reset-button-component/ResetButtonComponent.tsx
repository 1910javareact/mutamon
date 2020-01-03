import React, { SyntheticEvent } from 'react'
import { User } from '../../models/user';
import { Monster } from '../../models/monster';
import { Button } from 'reactstrap';

interface IResetButtonProps {
    user: User
    monster: Monster
    mutamonApiUpdateMonster:(monsterId: number) => void
}

interface IResetButtonState {
    user: User
    monster: Monster
}


export class ResetButton extends React.Component<IResetButtonProps, IResetButtonState>{
    constructor(props: any){
        super(props)
    }

    resetMonster = async (e: SyntheticEvent) => {
        e.preventDefault()
        this.state.monster.isCurrent = false
        this.props.mutamonApiUpdateMonster(this.state.monster.monsterId)
    }

    render(){
        return(
            <div>
                <Button onClick={this.resetMonster}>
                    Reset
                </Button>
            </div>
        )
    }
}