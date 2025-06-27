
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, BookOpen, Users, Brain } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-10 w-10 text-indigo-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              EduTutor AI
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Personalized Learning with Generative AI & LMS Integration
          </p>
        </header>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Transform Your Learning Experience
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience AI-powered personalized learning with adaptive quizzes, real-time feedback, 
            and comprehensive progress tracking. Whether you're a student or educator, we have the tools you need.
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              onClick={() => navigate('/auth')} 
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/quiz')}
            >
              Try Demo Quiz
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <GraduationCap className="h-8 w-8 text-indigo-600 mb-2" />
              <CardTitle>Adaptive Learning</CardTitle>
              <CardDescription>
                AI-powered quizzes that adapt to your learning pace and style
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Personalized question difficulty</li>
                <li>• Real-time performance analysis</li>
                <li>• Custom learning paths</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <BookOpen className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Rich Content</CardTitle>
              <CardDescription>
                Comprehensive quiz library across multiple subjects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Multiple choice questions</li>
                <li>• Instant feedback</li>
                <li>• Progress tracking</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Users className="h-8 w-8 text-purple-600 mb-2" />
              <CardTitle>Educator Tools</CardTitle>
              <CardDescription>
                Create and manage custom quizzes for your students
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Quiz creation interface</li>
                <li>• Student analytics</li>
                <li>• Custom difficulty levels</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-indigo-600">10K+</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">500+</div>
              <div className="text-gray-600">Educators</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">50K+</div>
              <div className="text-gray-600">Quizzes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Start Learning?</CardTitle>
              <CardDescription className="text-indigo-100">
                Join thousands of students and educators already using EduTutor AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/auth')}
                variant="secondary"
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100"
              >
                Create Free Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
