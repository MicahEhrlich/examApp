export const sortAnswersRandomly = (answers: string[]): string[] => {
    return [...answers].sort((a, b) => 0.5 - Math.random());
}

