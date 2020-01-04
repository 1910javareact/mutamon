import { Mutation } from "./mutation"

export class Monster{
    monsterId: number
    userId: number
    level: number
    name: string
    wins: number
    activeMonster: boolean
    speed: number
    strength: number
    defence: number
    mutations: Mutation[]

    constructor(monsterId: number, userId: number, level: number, name: string, wins: number, activeMonster: boolean, mutations: Mutation[]){
        this.monsterId = monsterId
        this.userId = userId
        this.level = level
        this.name = name
        this.wins = wins
        this.activeMonster = activeMonster
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