import * as React from 'react';
import './Question.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useState } from 'react';
import { Container } from '@mui/material';

type QuestionPropTypes = {
    nextQuestion: () => void;
    germanWord: string;
    answers: string[];
    correctAnswer: string;
}

export const Question = (props: QuestionPropTypes) => {
    const { germanWord, answers, correctAnswer, nextQuestion } = props;

    const [answer, setAnswer] = useState<string>("");
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [isUserCorrect, setIsUserCorrect] = useState<boolean>(false);

    const handleAnswer = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setAnswer(event.target.value)
    }

    const resetQuestion = () => {
        setAnswer("")
        setShowAlert(false);
        setIsUserCorrect(false)
    }

    const skipQuestion = async (): Promise<void> => {
        resetQuestion()
        await nextQuestion();
    }

    const submitAnswer = (): void => {
        if (answer === correctAnswer) {
            setIsUserCorrect(true);
        }
        setShowAlert(true)
    }

    return (
        <Container className='container'>
            <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">Translate the following word: {germanWord}</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                    value={answer}
                    onChange={event => handleAnswer(event)}
                >
                    {
                        answers.map((answer: string, index: number) =>
                            <FormControlLabel disabled={showAlert} key={`${answer + index}`} value={answer} control={<Radio />} label={answer} />
                        )
                    }
                </RadioGroup>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" disabled={!answer || showAlert} onClick={submitAnswer}>Submit</Button>
                    <Button variant="outlined" disabled={!showAlert} onClick={skipQuestion}>Next Question</Button>
                </Stack>
                {showAlert && <Stack className='alert-answer'>
                    <Alert severity={isUserCorrect ? 'success' : 'error'}>
                        <AlertTitle>{isUserCorrect ? 'Correct Answer' : 'Wrong Answer'}</AlertTitle>
                    </Alert>
                </Stack>}
            </FormControl>
        </Container>
    )
}