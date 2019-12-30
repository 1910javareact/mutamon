import { Mutation } from "./mutation"

export class Monster{
    monsterId: number
    userId: number
    level: number
    name: string
    wins: number
    isCurrent: boolean
    mutations: Mutation[]

    constructor(monsterId: number, userId: number, level: number, name: string, wins: number, isCurrent: boolean, mutations: Mutation[]){
        this.monsterId = monsterId
        this.userId = userId
        this.level = level
        this.name = name
        this.wins = wins
        this.isCurrent = isCurrent
        this.mutations = mutations
    }
}