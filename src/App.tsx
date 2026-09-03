import React, { useState, useMemo } from 'react';
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

  const handleStart = () => {
    retakeQuiz();
    setCurrentScreen('quiz');
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setCurrentScreen('results');
    } else {
      nextQuestion();
    }
  };

  const handleRetake = () => {
    retakeQuiz();
    setCurrentScreen('quiz');
  };

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

      <footer className="relative z-10 py-4 px-6 text-center text-[11px] font-mono text-slate-600 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between max-w-5xl mx-auto w-full gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>BRAINROT METER v1.2 • DUAL-MODE FEED & RECOGNITION</span>
        </div>
        <div className="text-slate-500">
          Built for TinkerHub Useless Projects
        </div>
      </footer>
    </div>
  );
};

export default App;
