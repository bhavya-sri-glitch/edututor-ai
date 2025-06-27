
import { useState, useEffect } from 'react';
import { QuizInterface } from '@/components/QuizInterface';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Brain, BookOpen } from 'lucide-react';

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

const Quiz = () => {
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock quiz data
  const mockQuizzes: Quiz[] = [
    {
      id: '1',
      title: 'JavaScript Fundamentals',
      topic: 'javascript',
      difficulty: 'beginner',
      timeLimit: 300,
      questions: [
        {
          id: 1,
          question: 'What is the correct way to declare a variable in JavaScript?',
          options: ['var myVar = 5;', 'variable myVar = 5;', 'v myVar = 5;', 'declare myVar = 5;'],
          correctAnswer: 0,
          explanation: 'In JavaScript, variables are declared using var, let, or const keywords.'
        },
        {
          id: 2,
          question: 'Which method is used to add an element to the end of an array?',
          options: ['append()', 'push()', 'add()', 'insert()'],
          correctAnswer: 1,
          explanation: 'The push() method adds one or more elements to the end of an array.'
        },
        {
          id: 3,
          question: 'What does "DOM" stand for?',
          options: ['Document Object Model', 'Data Object Management', 'Dynamic Object Method', 'Document Orientation Model'],
          correctAnswer: 0,
          explanation: 'DOM stands for Document Object Model, which represents the structure of HTML documents.'
        }
      ]
    },
    {
      id: '2',
      title: 'React Basics',
      topic: 'react',
      difficulty: 'intermediate',
      timeLimit: 450,
      questions: [
        {
          id: 1,
          question: 'What is JSX?',
          options: ['A JavaScript library', 'A syntax extension for JavaScript', 'A database query language', 'A CSS framework'],
          correctAnswer: 1,
          explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in React.'
        },
        {
          id: 2,
          question: 'Which hook is used to manage state in functional components?',
          options: ['useEffect', 'useState', 'useContext', 'useReducer'],
          correctAnswer: 1,
          explanation: 'useState is the primary hook for managing state in functional React components.'
        }
      ]
    }
  ];

  const generateQuiz = async () => {
    if (!topic || !difficulty) return;
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const matchingQuiz = mockQuizzes.find(
        quiz => quiz.topic === topic && quiz.difficulty === difficulty
      ) || mockQuizzes[0];
      
      setCurrentQuiz(matchingQuiz);
      setLoading(false);
    }, 1000);
  };

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    console.log(`Quiz completed! Score: ${score}/${totalQuestions}`);
    // Here you would typically send results to backend
    setCurrentQuiz(null);
  };

  if (currentQuiz) {
    return (
      <QuizInterface 
        quiz={currentQuiz} 
        onComplete={handleQuizComplete}
        onExit={() => setCurrentQuiz(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI-Powered Quiz
            </h1>
          </div>
          <p className="text-gray-600">
            Select your topic and difficulty level to generate a personalized quiz
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Quiz Configuration
            </CardTitle>
            <CardDescription>
              Choose your learning preferences to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Topic</label>
              <Select value={topic} onValueChange={setTopic}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a topic" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Difficulty Level</label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button 
              onClick={generateQuiz}
              disabled={!topic || !difficulty || loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              {loading ? 'Generating Quiz...' : 'Start Quiz'}
            </Button>
          </CardContent>
        </Card>

        {/* Sample Quiz Preview */}
        <div className="mt-8 grid gap-4">
          <h3 className="text-lg font-semibold text-gray-800">Available Quizzes</h3>
          {mockQuizzes.map((quiz) => (
            <Card key={quiz.id} className="hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setCurrentQuiz(quiz)}>
              <CardHeader>
                <CardTitle className="text-lg">{quiz.title}</CardTitle>
                <CardDescription>
                  {quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)} • {quiz.questions.length} questions • {Math.floor(quiz.timeLimit / 60)} minutes
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
