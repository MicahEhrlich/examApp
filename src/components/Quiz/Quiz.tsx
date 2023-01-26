import { useEffect, useState } from "react"
import { apiService } from "../../api/api"
import { QuestionData } from "../../types/question-data.type";
import { sortAnswersRandomly } from "../../utils/utils";
import { Question } from "../Question/Question";

export const Quiz = () => {
    const [questionData, setQuestionData] = useState<QuestionData>()

    const getNextQuestion = async () => {
        const questionDataResponse: QuestionData | undefined = await apiService.getQuestion();
        setQuestionData(questionDataResponse)
    }

    useEffect(() => {
        getNextQuestion()
    }, [])

    if (questionData?.german_word && questionData?.random_translations && questionData.correct_translation) {
        const { german_word, random_translations, correct_translation } = questionData;
        const allAnswers = sortAnswersRandomly([...random_translations, correct_translation])
        return (
            <Question nextQuestion={getNextQuestion} germanWord={german_word} answers={allAnswers} correctAnswer={correct_translation} />
        )
    }
    else return (<div><h1>Ooops! an error has occured</h1></div>)
}