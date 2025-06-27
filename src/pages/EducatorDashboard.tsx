
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Brain, Plus, BookOpen, Users, BarChart3, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
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
  createdAt: string;
  studentsCompleted: number;
  averageScore: number;
}

const EducatorDashboard = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [quizTitle, setQuizTitle] = useState('');
  const [quizTopic, setQuizTopic] = useState('');
  const [quizDifficulty, setQuizDifficulty] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentOptions, setCurrentOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [explanation, setExplanation] = useState('');
  const { toast } = useToast();

  // Mock created quizzes
  const [createdQuizzes, setCreatedQuizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'Advanced JavaScript Concepts',
      topic: 'JavaScript',
      difficulty: 'advanced',
      questions: [],
      createdAt: '2024-01-15',
      studentsCompleted: 45,
      averageScore: 78
    },
    {
      id: '2',
      title: 'React Hooks Fundamentals',
      topic: 'React',
      difficulty: 'intermediate',
      questions: [],
      createdAt: '2024-01-10',
      studentsCompleted: 32,
      averageScore: 85
    }
  ]);

  const addQuestion = () => {
    if (!currentQuestion || currentOptions.some(opt => !opt) || correctAnswer === null || !explanation) {
      toast({
        title: "Error",
        description: "Please fill in all question fields",
        variant: "destructive"
      });
      return;
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      question: currentQuestion,
      options: [...currentOptions],
      correctAnswer,
      explanation
    };

    setQuestions([...questions, newQuestion]);
    
    // Reset form
    setCurrentQuestion('');
    setCurrentOptions(['', '', '', '']);
    setCorrectAnswer(null);
    setExplanation('');

    toast({
      title: "Success",
      description: "Question added successfully"
    });
  };

  const removeQuestion = (questionId: string) => {
    setQuestions(questions.filter(q => q.id !== questionId));
  };

  const createQuiz = () => {
    if (!quizTitle || !quizTopic || !quizDifficulty || questions.length === 0) {
      toast({
        title: "Error",
        description: "Please fill in all quiz details and add at least one question",
        variant: "destructive"
      });
      return;
    }

    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title: quizTitle,
      topic: quizTopic,
      difficulty: quizDifficulty,
      questions,
      createdAt: new Date().toISOString().split('T')[0],
      studentsCompleted: 0,
      averageScore: 0
    };

    setCreatedQuizzes([...createdQuizzes, newQuiz]);
    
    // Reset form
    setQuizTitle('');
    setQuizTopic('');
    setQuizDifficulty('');
    setQuestions([]);

    toast({
      title: "Success",
      description: "Quiz created successfully!"
    });

    setActiveTab('manage');
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...currentOptions];
    newOptions[index] = value;
    setCurrentOptions(newOptions);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Educator Dashboard
            </h1>
          </div>
          <p className="text-gray-600">Create and manage your custom quizzes</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm">
            <Button
              variant={activeTab === 'create' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('create')}
              className="mr-1"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Quiz
            </Button>
            <Button
              variant={activeTab === 'manage' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('manage')}
              className="mr-1"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Manage Quizzes
            </Button>
            <Button
              variant={activeTab === 'analytics' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('analytics')}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
          </div>
        </div>

        {/* Create Quiz Tab */}
        {activeTab === 'create' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Quiz Details */}
            <Card>
              <CardHeader>
                <CardTitle>Quiz Details</CardTitle>
                <CardDescription>Set up the basic information for your quiz</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quizTitle">Quiz Title</Label>
                    <Input
                      id="quizTitle"
                      value={quizTitle}
                      onChange={(e) => setQuizTitle(e.target.value)}
                      placeholder="Enter quiz title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quizTopic">Topic</Label>
                    <Select value={quizTopic} onValueChange={setQuizTopic}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select topic" />
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
                </div>
                <div>
                  <Label htmlFor="quizDifficulty">Difficulty Level</Label>
                  <Select value={quizDifficulty} onValueChange={setQuizDifficulty}>
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
              </CardContent>
            </Card>

            {/* Add Question */}
            <Card>
              <CardHeader>
                <CardTitle>Add Question</CardTitle>
                <CardDescription>Create a new question for your quiz</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="question">Question</Label>
                  <Textarea
                    id="question"
                    value={currentQuestion}
                    onChange={(e) => setCurrentQuestion(e.target.value)}
                    placeholder="Enter your question"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Answer Options</Label>
                  {currentOptions.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correctAnswer"
                        checked={correctAnswer === index}
                        onChange={() => setCorrectAnswer(index)}
                        className="text-indigo-600"
                      />
                      <Input
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <Label htmlFor="explanation">Explanation</Label>
                  <Textarea
                    id="explanation"
                    value={explanation}
                    onChange={(e) => setExplanation(e.target.value)}
                    placeholder="Explain why this is the correct answer"
                  />
                </div>

                <Button onClick={addQuestion} className="w-full">
                  Add Question
                </Button>
              </CardContent>
            </Card>

            {/* Questions Preview */}
            {questions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Questions ({questions.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {questions.map((question, index) => (
                      <div key={question.id} className="border rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">Question {index + 1}</h4>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeQuestion(question.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <p className="text-gray-700 mb-2">{question.question}</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {question.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`p-2 rounded ${
                                optIndex === question.correctAnswer
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-white'
                              }`}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    onClick={createQuiz} 
                    className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                  >
                    Create Quiz
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Manage Quizzes Tab */}
        {activeTab === 'manage' && (
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-6">
              {createdQuizzes.map((quiz) => (
                <Card key={quiz.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{quiz.title}</CardTitle>
                        <CardDescription>Created on {quiz.createdAt}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{quiz.topic}</Badge>
                        <Badge variant="outline">{quiz.difficulty}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{quiz.studentsCompleted}</div>
                        <div className="text-sm text-blue-800">Students Completed</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{quiz.averageScore}%</div>
                        <div className="text-sm text-green-800">Average Score</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{quiz.questions.length || 5}</div>
                        <div className="text-sm text-purple-800">Questions</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Total Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-indigo-600">127</div>
                  <p className="text-sm text-gray-600">Active learners</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Quizzes Created
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">{createdQuizzes.length}</div>
                  <p className="text-sm text-gray-600">Published quizzes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Average Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">82%</div>
                  <p className="text-sm text-gray-600">Across all quizzes</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { student: "Alice Johnson", quiz: "JavaScript Fundamentals", score: 95, time: "2 hours ago" },
                    { student: "Bob Smith", quiz: "React Basics", score: 78, time: "4 hours ago" },
                    { student: "Carol Davis", quiz: "Advanced JavaScript", score: 88, time: "6 hours ago" },
                  ].map((activity, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{activity.student}</div>
                        <div className="text-sm text-gray-600">Completed "{activity.quiz}"</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-green-600">{activity.score}%</div>
                        <div className="text-xs text-gray-500">{activity.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducatorDashboard;
