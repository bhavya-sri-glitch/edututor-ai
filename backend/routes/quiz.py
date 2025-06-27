
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import random

router = APIRouter()

# Data Models
class Question(BaseModel):
    id: int
    question: str
    options: List[str]
    correct_answer: int
    explanation: str

class Quiz(BaseModel):
    id: str
    title: str
    topic: str
    difficulty: str
    questions: List[Question]
    time_limit: int

class QuizRequest(BaseModel):
    topic: str
    difficulty: str
    num_questions: Optional[int] = 5

class SubmitAnswer(BaseModel):
    question_id: int
    selected_answer: int

class QuizSubmission(BaseModel):
    quiz_id: str
    answers: List[SubmitAnswer]
    time_taken: int

# Mock quiz data
MOCK_QUESTIONS = {
    "javascript": {
        "beginner": [
            {
                "id": 1,
                "question": "What is the correct way to declare a variable in JavaScript?",
                "options": ["var myVar = 5;", "variable myVar = 5;", "v myVar = 5;", "declare myVar = 5;"],
                "correct_answer": 0,
                "explanation": "In JavaScript, variables are declared using var, let, or const keywords."
            },
            {
                "id": 2,
                "question": "Which method is used to add an element to the end of an array?",
                "options": ["append()", "push()", "add()", "insert()"],
                "correct_answer": 1,
                "explanation": "The push() method adds one or more elements to the end of an array."
            },
            {
                "id": 3,
                "question": "What does 'DOM' stand for?",
                "options": ["Document Object Model", "Data Object Management", "Dynamic Object Method", "Document Orientation Model"],
                "correct_answer": 0,
                "explanation": "DOM stands for Document Object Model, which represents the structure of HTML documents."
            }
        ],
        "intermediate": [
            {
                "id": 4,
                "question": "What is closure in JavaScript?",
                "options": [
                    "A way to close browser windows",
                    "A function that has access to outer scope variables",
                    "A method to end program execution",
                    "A type of loop"
                ],
                "correct_answer": 1,
                "explanation": "A closure is a function that retains access to variables from its outer scope even after the outer function has finished executing."
            },
            {
                "id": 5,
                "question": "What is the difference between '==' and '===' in JavaScript?",
                "options": [
                    "No difference",
                    "== checks type and value, === checks only value",
                    "=== checks type and value, == checks only value",
                    "== is faster than ==="
                ],
                "correct_answer": 2,
                "explanation": "=== performs strict equality comparison (checks both type and value), while == performs loose equality comparison (type coercion may occur)."
            }
        ]
    },
    "react": {
        "beginner": [
            {
                "id": 6,
                "question": "What is JSX?",
                "options": ["A JavaScript library", "A syntax extension for JavaScript", "A database query language", "A CSS framework"],
                "correct_answer": 1,
                "explanation": "JSX is a syntax extension for JavaScript that allows you to write HTML-like code in React."
            }
        ],
        "intermediate": [
            {
                "id": 7,
                "question": "Which hook is used to manage state in functional components?",
                "options": ["useEffect", "useState", "useContext", "useReducer"],
                "correct_answer": 1,
                "explanation": "useState is the primary hook for managing state in functional React components."
            }
        ]
    }
}

@router.get("/quiz")
async def get_quiz(topic: str, difficulty: str, num_questions: int = 5):
    """
    Generate a quiz based on topic and difficulty level
    This would integrate with Watsonx AI in production
    """
    try:
        # Mock implementation - in production, this would call Watsonx API
        topic_lower = topic.lower()
        difficulty_lower = difficulty.lower()
        
        if topic_lower not in MOCK_QUESTIONS:
            raise HTTPException(status_code=404, detail=f"Topic '{topic}' not found")
        
        if difficulty_lower not in MOCK_QUESTIONS[topic_lower]:
            raise HTTPException(status_code=404, detail=f"Difficulty '{difficulty}' not available for topic '{topic}'")
        
        available_questions = MOCK_QUESTIONS[topic_lower][difficulty_lower]
        
        # Select random questions up to num_questions
        selected_questions = random.sample(
            available_questions, 
            min(num_questions, len(available_questions))
        )
        
        quiz = Quiz(
            id=f"{topic_lower}_{difficulty_lower}_{random.randint(1000, 9999)}",
            title=f"{topic.title()} - {difficulty.title()} Level",
            topic=topic,
            difficulty=difficulty,
            questions=selected_questions,
            time_limit=300  # 5 minutes default
        )
        
        return quiz
        
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Error generating quiz: {str(e)}")

@router.post("/submit")
async def submit_quiz(submission: QuizSubmission):
    """
    Submit quiz answers and get results
    This would store results in a database in production
    """
    try:
        # Mock scoring logic
        # In production, this would:
        # 1. Validate the quiz_id
        # 2. Score the answers against correct answers
        # 3. Store results in database
        # 4. Update user progress
        # 5. Generate personalized recommendations
        
        total_questions = len(submission.answers)
        correct_answers = 0
        
        # Mock scoring - in reality, you'd look up correct answers from database
        for answer in submission.answers:
            # This is a simplified mock - real implementation would check against stored quiz
            if random.choice([True, False, True]):  # Mock 66% correct rate
                correct_answers += 1
        
        score_percentage = (correct_answers / total_questions) * 100 if total_questions > 0 else 0
        
        # Mock performance analysis (would use Watsonx AI in production)
        performance_analysis = {
            "strengths": ["Problem solving", "Logical thinking"],
            "areas_for_improvement": ["Advanced concepts", "Time management"],
            "recommended_topics": ["Functions", "Data structures"],
            "difficulty_adjustment": "intermediate" if score_percentage > 80 else "beginner"
        }
        
        result = {
            "quiz_id": submission.quiz_id,
            "score": correct_answers,
            "total_questions": total_questions,
            "score_percentage": round(score_percentage, 2),
            "time_taken": submission.time_taken,
            "performance_analysis": performance_analysis,
            "next_recommended_quiz": {
                "topic": "javascript",
                "difficulty": performance_analysis["difficulty_adjustment"]
            }
        }
        
        return result
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error submitting quiz: {str(e)}")

@router.get("/topics")
async def get_available_topics():
    """Get list of available quiz topics"""
    return {
        "topics": list(MOCK_QUESTIONS.keys()),
        "difficulties": ["beginner", "intermediate", "advanced"]
    }

@router.get("/quiz/{quiz_id}/results")
async def get_quiz_results(quiz_id: str):
    """Get detailed results for a specific quiz"""
    # Mock implementation - would fetch from database in production
    return {
        "quiz_id": quiz_id,
        "student_performance": {
            "completion_rate": 95.5,
            "average_time": 240,
            "common_mistakes": ["Question 2", "Question 5"]
        },
        "ai_recommendations": {
            "next_topics": ["Advanced JavaScript", "React Fundamentals"],
            "study_materials": ["JavaScript MDN Docs", "React Official Tutorial"]
        }
    }
