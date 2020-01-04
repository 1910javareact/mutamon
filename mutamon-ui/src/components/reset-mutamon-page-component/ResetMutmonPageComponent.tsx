import React, { SyntheticEvent } from 'react'
import { Monster } from '../../models/monster';
import { Button, Form, FormGroup, Label, Col, Input } from 'reactstrap';
import { Redirect } from 'react-router';
import { User } from '../../models/user';

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
                    <Form onSubmit={this.resetMonster}>
                        <FormGroup row className="text-input">
                            <Label for="exampleName" id="" sm={2}>Name: </Label>
                            <Col sm={10}>
                                <Input
                                    type="text"
                                    name="name"
                                    id="exampleName"
                                    placeholder="Name"
                                    value={this.state.name}
                                    onChange={this.updateName}
                                />
                            </Col>
                        </FormGroup>
                        <Button>
                            New Mutamon!
                        </Button>
                    </Form>
                    {this.state.mutamonUpdated && this.goToHome()}
                </div>
                :
                <Redirect to='/login'></Redirect>
        )
    }
}