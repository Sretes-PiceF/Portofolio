// src/types.ts
export type Project = {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    githubLink: string;
    demoLink?: string;
};
