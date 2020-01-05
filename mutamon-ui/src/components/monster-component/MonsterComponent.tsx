import React from 'react'
import { Monster } from '../../models/monster';
import { Table } from 'reactstrap';

interface IMonsterComponentProps {
    monster: Monster
}

export class MonsterComponent extends React.PureComponent<IMonsterComponentProps>{

    render() {

        let mutations = this.props.monster.mutations.map((mutation) => {
            return <li key={'mutationId ' + mutation.mutationId}>{mutation.name}</li>
        })

        return (
            <div>
                <Table borderless className="table" id="currentStats">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Level</th>
                            <th>Speed</th>
                            <th>Strength</th>
                            <th>Defence</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{this.props.monster.name}</td>
                            <td>{this.props.monster.level}</td>
                            <td>{this.props.monster.speed}</td>
                            <td>{this.props.monster.strength}</td>
                            <td>{this.props.monster.defence}</td>
                        </tr>
                    </tbody>
                </Table>

                <Table>
                    <thead>
                        <tr>
                            <th>Mutations</th>
                        </tr>
                    </thead>
                    <tbody>
                        <td><ul>{mutations}</ul></td>
                    </tbody>
                </Table>
            </div>
        )
    }
}