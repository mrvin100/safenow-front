export type Reaction = {
    likes: number
    dislikes: number
} 

export type DisasterModel = {
    id: string;
    title: string
    reactions: Reaction
    userId: string
}