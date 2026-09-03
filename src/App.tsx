import React, { useState, useMemo, useCallback } from 'react';
import rawQuestions from './data/questions.json';
import { Question } from './types/quiz';
import { validateQuestions } from './utils/validation';
import { useQuiz } from './hooks/useQuiz';
import { BackgroundFx } from './components/BackgroundFx';
import { Header } from './components/Header';
import { ValidationErrorBanner } from './components/ValidationErrorBanner';
import { Home } from './pages/Home';
import { Quiz } from './pages/Quiz';
import { Results } from './pages/Results';

type Screen = 'home' | 'quiz' | 'results';

export const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const validationResult = useMemo(() => {
    return validateQuestions(rawQuestions);
  }, []);

  const questions: Question[] = useMemo(() => {
    return rawQuestions as unknown as Question[];
  }, []);

  const {
    currentIndex,
    totalQuestions,
    isLocked,
    currentCommentary,
    lastAnswer,
    isLastQuestion,
    finalStats,
    submitAnswer,
    nextQuestion,
    retakeQuiz,
  } = useQuiz(questions);

  const handleStart = useCallback(() => {
    retakeQuiz();
    setCurrentScreen('quiz');
  }, [retakeQuiz]);

  const handleNextQuestion = useCallback(() => {
    if (isLastQuestion) {
      setCurrentScreen('results');
    } else {
      nextQuestion();
    }
  }, [isLastQuestion, nextQuestion]);

  const handleRetake = useCallback(() => {
    retakeQuiz();
    setCurrentScreen('quiz');
  }, [retakeQuiz]);

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col justify-between selection:bg-brand-violet selection:text-white font-sans relative overflow-x-hidden">
      <BackgroundFx />

      {!validationResult.isValid && (
        <ValidationErrorBanner errors={validationResult.errors} />
      )}

      <Header
        currentQuestionNumber={currentScreen === 'quiz' ? currentIndex + 1 : undefined}
        totalQuestions={currentScreen === 'quiz' ? totalQuestions : undefined}
        onRestart={handleStart}
        showRestart={currentScreen === 'quiz'}
      />

      <main className="flex-1 flex flex-col justify-center relative z-10">
        {currentScreen === 'home' && (
          <Home
            questionsCount={totalQuestions}
            onStart={handleStart}
          />
        )}

        {currentScreen === 'quiz' && (
          <Quiz
            questions={questions}
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            isLocked={isLocked}
            currentCommentary={currentCommentary}
            lastAnswer={lastAnswer}
            isLastQuestion={isLastQuestion}
            onSubmitAnswer={submitAnswer}
            onNextQuestion={handleNextQuestion}
          />
        )}

        {currentScreen === 'results' && (
          <Results
            stats={finalStats}
            onRetake={handleRetake}
          />
        )}
      </main>
    </div>
  );
};

export default App;
