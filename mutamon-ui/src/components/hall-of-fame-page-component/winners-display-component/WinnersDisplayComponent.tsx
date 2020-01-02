import React from 'react'
import { Monster } from '../../../models/monster'
import { MonsterComponent } from '../../monster-component/MonsterComponent'

interface IWinnersDisplayComponentProps {
    winners: Monster[]
}

export class WinnersDisplayComponent extends React.PureComponent<IWinnersDisplayComponentProps>{

    render() {

        let blocks = this.props.winners.map((monster) => {
            return <MonsterComponent monster={monster} key={"monsterId " + monster.monsterId}></MonsterComponent>
        })

        return (
            <div>
                {blocks}
            </div>
        )
    }
}