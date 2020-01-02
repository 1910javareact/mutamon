import React from 'react'
import { Monster } from '../../models/monster';
import { Card, CardBody, CardText, CardFooter } from 'reactstrap';

interface IMonsterComponentProps{
    monster: Monster
}

export class MonsterComponent extends React.PureComponent<IMonsterComponentProps>{

    render(){

        let mutations = this.props.monster.mutations.map((mutation) => {
            return <li key={'mutationId '+ mutation.mutationId}>{mutation.name}</li>
        })

        return (
            <div>
                <div className="center">
                    <Card className="text-left card-element">
                        <CardBody>
                            <CardText>Name: {this.props.monster.name}</CardText>
                            <CardText>Speed: {this.props.monster.speed}</CardText>
                            <CardText>Strength: {this.props.monster.strength}</CardText>
                            <CardText>Defence: {this.props.monster.defence}</CardText>
                            <CardText>Mutations: <ul>{mutations}</ul></CardText>
                        </CardBody>
                        <CardFooter></CardFooter>
                    </Card>
                </div>
            </div>
        )
    }
}