import React from 'react'
import { Progress, Button, Table } from 'reactstrap'

export class BattleComponent extends React.Component<any, any>{


    render() {
        return (
            <div className="battlePage" id="battlePage">

                {/* Player side of page */}
                <div className="playerSide" id="playerSide">

                    <p className="playerTitle" id="playerTitle">
                        <h2>Player</h2>
                    </p>

                    
                    {/* Players Current stats */}
                    <Table borderless className="playerStats" id="playerStats">
                        <thead>
                            <tr>
                                <th>Strength</th>
                                <th>Agility</th>
                                <th>Defence</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">0</th>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                        </tbody>
                    </Table>

                    {/* Player health bar */}
                    <div className="playerHealth" id="playerHealth">
                        100%
                    </div>
                    <Progress value="100" />

                    {/* Run away button */}
                    <br/>
                    <Button color="warning" className="btnRun" id="btnRun">
                        <h4>Run Away</h4>
                    </Button>{' '}
                </div>

                <div>
                    
                </div>

                <div className="opponentSide" id="opponentSide">
                    {/* Opponent side of page */}

                    <br />
                    <p className="opponentTitle" id="opponentTitle">
                        <h2>Opponent</h2>
                    </p>

                    {/* Opponents stats */}
                    <Table borderless className="opponentStats" id="opponentStats">
                        <thead>
                            <tr>
                                <th>Strength</th>
                                <th>Agility</th>
                                <th>Defence</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">0</th>
                                <td>0</td>
                                <td>0</td>
                            </tr>
                        </tbody>
                    </Table>

                    {/* Opponent health bar */}

                    <div className="oppenentHealth" id="opponentHealth">
                        100%
                    </div>
                    <Progress value="100" />
                </div>
            </div>
        )
    }
}