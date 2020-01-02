import React from 'react'
import { Mutation } from '../../models/mutation';
import { Monster } from '../../models/monster';
import { Redirect } from 'react-router';
import { mutamonApiGetMutationChoices } from '../../remote/mutamon-clients/mutamon-mutations';

interface MutationSelectionPageComponentProps {
    currentMutamon: Monster
    updateCurrentMutamon: (monster: Monster) => void
}

interface MutationSelectionPageComponentState {
    mutations: Mutation[],
    validMutation: boolean,
}

export class MutationSelectionPageComponent extends React.Component<MutationSelectionPageComponentProps, MutationSelectionPageComponentState>{

    constructor(props: any) {
        super(props)
        this.state = {
            mutations: [],
            validMutation: true
        }
    }

    async componentDidMount() {
        //if the current mutamon is at a valid mutation state
        if ((this.props.currentMutamon.level === 1 || this.props.currentMutamon.level === 3 || this.props.currentMutamon.level === 5 || this.props.currentMutamon.level === 7) &&
            this.props.currentMutamon.mutations.length < (this.props.currentMutamon.level + 1) / 2) {
            try {
                let res = await mutamonApiGetMutationChoices(this.props.currentMutamon.level)

                if (res.status === 200) {
                    this.setState({
                        ...this.state,
                        mutations: res.body
                    })
                }
            } catch (e) {
                
            }
        } else {
            this.setState({
                ...this.state,
                validMutation: false
            })
        }
    }

    render() {

        return (
            this.state.validMutation ?
                <div>

                </div>
                :
                <Redirect to='/test'></Redirect>
        )
    }
}