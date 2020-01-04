export class Mutation{
    mutationId: number
    name: string
    level: number
    speed: number
    strength: number
    defence: number
    constructor(mutationId: number, name:string, level: number, speed:number, strength: number, defence: number){
        this.mutationId = mutationId
        this.name = name
        this.level = level
        this.speed = speed
        this.strength = strength
        this.defence = defence
    }
}