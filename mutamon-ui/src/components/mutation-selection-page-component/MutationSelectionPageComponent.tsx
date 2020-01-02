import React from 'react'
import { Mutation } from '../../models/mutation';
import { Monster } from '../../models/monster';

interface MutationSelectionPageComponentProps{
    currentMutamon: Monster
    updateCurrentMutamon: (monster: Monster) => void
}

interface MutationSelectionPageComponentState{
    mutations: Mutation[],
}

export class MutationSelectionPageComponent extends React.Component<MutationSelectionPageComponentProps, MutationSelectionPageComponentState>{
    
    

    render(){
        return(
            <div>

            </div>
        )
    }
}