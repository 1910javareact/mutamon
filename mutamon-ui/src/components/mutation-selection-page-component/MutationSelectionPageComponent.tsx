import React from 'react'
import { Mutation } from '../../models/mutation';
import { Monster } from '../../models/monster';
import { Redirect } from 'react-router';
import { mutamonApiGetMutationChoices } from '../../remote/mutamon-clients/mutamon-mutations';
import { User } from '../../models/user';
import { MutationComponent } from '../mutation-component/MutationComponent';

interface MutationSelectionPageComponentProps {
    user: User
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
    }

    chooseMutation = async (mutation: Mutation) => {
        try {
            let mutamon = { ...this.props.currentMutamon }
            mutamon.mutations = [...this.props.currentMutamon.mutations]
            mutamon.mutations.push(mutation)
            await this.props.updateCurrentMutamon(mutamon)
            this.setState({
                ...this.state,
                validMutation: false
            })
        } catch (e) {

        }
    }

    render() {

        let mutations = this.state.mutations.map((mutation) => {
            return <div onClick={() => { this.chooseMutation(mutation) }}><MutationComponent key={'mutationId ' + mutation.mutationId} mutation={mutation}></MutationComponent></div>
        })

        return (
            this.props.user.userId ?
                this.state.validMutation ?
                    <div>
                        {mutations}
                    </div>
                    :
                    <Redirect to='/users'></Redirect>
                :
                <Redirect to='/login'></Redirect>
        )
    }
}