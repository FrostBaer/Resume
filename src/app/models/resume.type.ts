export interface Resume {
    pdf: string,
    hobbies: Icon[],
    favourites: Icon[],
    languages: Language[],
    competences: string[],
    progLanguages: Skill[],
    frameworks: Skill[],
    concepts: string[],
    other: string[],
    software: Icon[],
    jobs: Job[]
}
export interface Icon {
    name: string,
    iconLink: string
}
export interface Language {
    name: string,
    level: string,
    certification: string,
    year: number
}
export interface Skill {
    skills: Icon[],
    level: number
}
export interface Job {
    startDate: number,
    endDate: number,
    duration: number,
    company: string,
    position: string,
    tasks: string[]
}