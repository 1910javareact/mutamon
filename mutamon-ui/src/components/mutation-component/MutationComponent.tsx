import React from 'react'
import { Mutation } from '../../models/mutation';
import { Card, CardBody, CardText, Button } from 'reactstrap';

interface IMutationComponentProps {
    mutation: Mutation
}

export class MutationComponent extends React.PureComponent<IMutationComponentProps>{

    render() {
        return (
            <div>
                <div className="page-columns">
                    <div className="row">
                        <div className="column">
                            <div className="center">



                                <Card className="text-left card-element">
                                    <CardBody>
                                        <CardText className="mutation">Mutation: {this.props.mutation.name}</CardText>
                                        <CardText>Speed: {this.props.mutation.speed}</CardText>
                                        <CardText>Strength: {this.props.mutation.strength}</CardText>
                                        <CardText>Defence: {this.props.mutation.defence}</CardText>

                                        <Button color="primary " size="lg">
                                            <CardText><h5>Click Me!</h5></CardText>
                                        </Button>
                                    </CardBody>
                                </Card>



                            </div>

                        </div>

                    </div>

                </div>
            </div>
        )
    }

}