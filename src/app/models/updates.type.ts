export interface Update {
    id: string,
    date: string,
    content: string,
    link?: string
}
export interface Updates {
    projects: Update[]
}