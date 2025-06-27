
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  id: string;
  title: string;
  topic: string;
  difficulty: string;
  questions: Question[];
  timeLimit: number;
}

interface QuizInterfaceProps {
  quiz: Quiz;
  onComplete: (score: number, totalQuestions: number) => void;
  onExit: () => void;
}

export const QuizInterface = ({ quiz, onComplete, onExit }: QuizInterfaceProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(quiz.timeLimit);
  const [quizStarted, setQuizStarted] = useState(false);
  const { toast } = useToast();

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  useEffect(() => {
    if (!quizStarted || showResults) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, showResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion.id]: answerIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
    const score = calculateScore();
    toast({
      title: "Quiz Completed!",
      description: `You scored ${score} out of ${quiz.questions.length}`,
    });
  };

  const calculateScore = () => {
    return quiz.questions.reduce((score, question) => {
      return selectedAnswers[question.id] === question.correctAnswer ? score + 1 : score;
    }, 0);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{quiz.title}</CardTitle>
            <div className="flex justify-center gap-2 mt-4">
              <Badge variant="secondary">{quiz.topic}</Badge>
              <Badge variant="outline">{quiz.difficulty}</Badge>
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-semibold text-blue-800">Questions</div>
                <div className="text-2xl font-bold text-blue-600">{quiz.questions.length}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="font-semibold text-green-800">Time Limit</div>
                <div className="text-2xl font-bold text-green-600">{Math.floor(quiz.timeLimit / 60)}m</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="font-semibold text-purple-800">Difficulty</div>
                <div className="text-2xl font-bold text-purple-600 capitalize">{quiz.difficulty}</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Instructions:</h3>
              <ul className="text-left text-sm text-gray-600 space-y-1">
                <li>• Read each question carefully</li>
                <li>• Select the best answer from the options provided</li>
                <li>• You can navigate back and forth between questions</li>
                <li>• Submit your quiz before time runs out</li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={onExit}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button 
                onClick={startQuiz}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                Start Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quiz.questions.length) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="mb-6">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Quiz Results</CardTitle>
              <div className="flex justify-center items-center gap-4 mt-4">
                <div className="text-4xl font-bold text-indigo-600">{score}/{quiz.questions.length}</div>
                <div className="text-lg text-gray-600">({percentage}%)</div>
              </div>
            </CardHeader>
          </Card>

          <div className="space-y-4">
            {quiz.questions.map((question, index) => {
              const userAnswer = selectedAnswers[question.id];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <Card key={question.id} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                      {isCorrect ? (
                        <CheckCircle className="h-6 w-6 text-green-500" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-500" />
                      )}
                    </div>
                    <p className="text-gray-700">{question.question}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isUserAnswer = userAnswer === optionIndex;
                        const isCorrectAnswer = optionIndex === question.correctAnswer;
                        
                        return (
                          <div
                            key={optionIndex}
                            className={`p-2 rounded border ${
                              isCorrectAnswer
                                ? 'bg-green-100 border-green-300'
                                : isUserAnswer
                                ? 'bg-red-100 border-red-300'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            {option}
                            {isCorrectAnswer && <span className="ml-2 text-green-600 font-semibold">✓ Correct</span>}
                            {isUserAnswer && !isCorrectAnswer && <span className="ml-2 text-red-600 font-semibold">✗ Your answer</span>}
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button variant="outline" onClick={onExit}>
              Back to Quizzes
            </Button>
            <Button 
              onClick={() => onComplete(score, quiz.questions.length)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              Continue Learning
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" onClick={onExit}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Exit Quiz
          </Button>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatTime(timeRemaining)}
            </Badge>
            <Badge>{currentQuestionIndex + 1} of {quiz.questions.length}</Badge>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">
              Question {currentQuestionIndex + 1}
            </CardTitle>
            <p className="text-lg text-gray-700 leading-relaxed">
              {currentQuestion.question}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all hover:shadow-md ${
                    selectedAnswers[currentQuestion.id] === index
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion.id] === index
                        ? 'border-indigo-500 bg-indigo-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers[currentQuestion.id] === index && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-800">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswers[currentQuestion.id] === undefined}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                {currentQuestionIndex === quiz.questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
