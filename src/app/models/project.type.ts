export interface Project {
    id: number,
    name: string,
    date: string,
    description: string,
    userStory?: string,
    tech: string[],
    done: boolean,
    images?: string[],
    github?: string,
    link?: string
}
export interface ProjectResult {
    projects: Project[]
}

export interface Dict {
    [key: string]: boolean;
}