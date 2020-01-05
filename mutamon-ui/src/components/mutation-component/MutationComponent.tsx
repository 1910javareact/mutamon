import React from 'react'
import { Mutation } from '../../models/mutation';
import { Card, CardBody, CardText, CardFooter } from 'reactstrap';

interface IMutationComponentProps {
    mutation: Mutation
}

export class MutationComponent extends React.PureComponent<IMutationComponentProps>{

    render() {
        return (
            <div>
                <div className="center">
                    <Card className="text-left card-element">
                        <CardBody>
                            <CardText><h5>Click Me!</h5></CardText>
                            <CardText><h6>Name: {this.props.mutation.name}</h6></CardText>
                            <CardText>Speed: {this.props.mutation.speed}</CardText>
                            <CardText>Strength: {this.props.mutation.strength}</CardText>
                            <CardText>Defence: {this.props.mutation.defence}</CardText>

                        </CardBody>
                        <CardFooter></CardFooter>
                    </Card>
                </div>
            </div>
        )
    }

}