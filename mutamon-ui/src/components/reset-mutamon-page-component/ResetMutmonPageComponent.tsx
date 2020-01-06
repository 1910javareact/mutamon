import React, { SyntheticEvent } from 'react'
import { Monster } from '../../models/monster';
import { Button, Form, FormGroup, Label, Col, Input, Container, Row } from 'reactstrap';
import { Redirect } from 'react-router';
import { User } from '../../models/user';
import Monsterpic from "../../assests/Create-a-new-Mutamon.png"

interface IResetMutamonPageProps {
    user: User
    currentMutamon: Monster
    updateCurrentMutamon: (monster: Monster) => void
}

interface IResetMutamonPageState {
    name: string
    mutamonUpdated: boolean
}

export class ResetMutamonPageComponent extends React.Component<IResetMutamonPageProps, IResetMutamonPageState>{
    constructor(props: any) {
        super(props)
        this.state = {
            name: '',
            mutamonUpdated: false
        }
    }

    updateName = (input: any) => {
        this.setState({
            ...this.state,
            name: input.target.value
        })
    }

    goToHome = () => {
        return (<Redirect to='/mutate' />)
    }

    resetMonster = async (e: SyntheticEvent) => {
        e.preventDefault()
        if (this.props.currentMutamon.monsterId) {
            let oldMon = { ...this.props.currentMutamon }
            oldMon.activeMonster = false
            await this.props.updateCurrentMutamon(oldMon)
            await this.props.updateCurrentMutamon(new Monster(0, this.props.currentMutamon.userId, 1, this.state.name, 0, true, []))
            this.setState({
                ...this.state,
                mutamonUpdated: true
            })
        } else {
            await this.props.updateCurrentMutamon(new Monster(0, this.props.user.userId, 1, this.state.name, 0, true, []))
            this.setState({
                ...this.state,
                mutamonUpdated: true
            })
        }

    }

    render() {
        return (
            this.props.user.userId ?
                <div>
                    <img id='Create-a-new-Mutamon' src={Monsterpic} alt='Monster' />
                    <Container>
                        <Col></Col>
                        <Col>
                            <Form onSubmit={this.resetMonster}>

                                <FormGroup row className="text-input">
                                    <Label for="exampleName" id="" lg={12} style={{ fontWeight: "bold" }}>Name: </Label>
                                    <Row></Row>

                                    <Container className="themed-container">

                                        <Input
                                            type="text"
                                            name="name"
                                            id="exampleName"
                                            placeholder="Name"
                                            value={this.state.name}
                                            onChange={this.updateName}
                                        />
                                    </Container>
                                </FormGroup>
                                <Button color="primary" size="lg">
                                    New Mutamon!
                        </Button>
                            </Form>
                            <Row></Row>
                            <Col></Col>
                            {this.state.mutamonUpdated && this.goToHome()}
                        </Col>
                        <Col></Col>

                    </Container>
                </div>
                :
                <Redirect to='/login'></Redirect>
        )
    }
}