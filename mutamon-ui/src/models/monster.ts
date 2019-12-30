import { Mutation } from "./mutation"

export class Monster{
    monsterId: number
    userId: number
    level: number
    name: string
    wins: number
    isCurrent: boolean
    speed: number
    strength: number
    defence: number
    mutations: Mutation[]

    constructor(monsterId: number, userId: number, level: number, name: string, wins: number, isCurrent: boolean, mutations: Mutation[]){
        this.monsterId = monsterId
        this.userId = userId
        this.level = level
        this.name = name
        this.wins = wins
        this.isCurrent = isCurrent
        this.mutations = mutations

        this.speed = level
        this.strength = level
        this.defence = level
        for(let mutation of mutations){
            this.speed += mutation.speed
            this.strength += mutation.strength
            this.defence += mutation.defence
        }
    }
}