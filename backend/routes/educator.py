
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime

router = APIRouter()

# Data Models
class QuestionCreate(BaseModel):
    question: str
    options: List[str]
    correct_answer: int
    explanation: str

class CustomQuizCreate(BaseModel):
    title: str
    topic: str
    difficulty: str
    questions: List[QuestionCreate]
    time_limit: Optional[int] = 300

class CustomQuiz(BaseModel):
    id: str
    title: str
    topic: str
    difficulty: str
    questions: List[QuestionCreate]
    time_limit: int
    created_at: str
    created_by: str
    is_published: bool
    students_completed: int
    average_score: float

class QuizStats(BaseModel):
    total_quizzes: int
    total_students: int
    average_completion_rate: float
    most_popular_topic: str

# Mock storage (in production, use database)
CUSTOM_QUIZZES = {}

@router.post("/quiz")
async def create_custom_quiz(quiz: CustomQuizCreate, educator_id: str = "educator_123"):
    """
    Create a custom quiz by educator
    In production, educator_id would come from authentication
    """
    try:
        # Validate quiz data
        if not quiz.title or not quiz.topic or not quiz.questions:
            raise HTTPException(status_code=400, detail="Missing required quiz data")
        
        if len(quiz.questions) == 0:
            raise HTTPException(status_code=400, detail="Quiz must have at least one question")
        
        # Validate each question
        for i, question in enumerate(quiz.questions):
            if len(question.options) != 4:
                raise HTTPException(
                    status_code=400, 
                    detail=f"Question {i+1} must have exactly 4 options"
                )
            
            if question.correct_answer < 0 or question.correct_answer >= 4:
                raise HTTPException(
                    status_code=400, 
                    detail=f"Question {i+1} correct_answer must be between 0 and 3"
                )
        
        # Create quiz
        quiz_id = str(uuid.uuid4())
        custom_quiz = CustomQuiz(
            id=quiz_id,
            title=quiz.title,
            topic=quiz.topic,
            difficulty=quiz.difficulty,
            questions=quiz.questions,
            time_limit=quiz.time_limit,
            created_at=datetime.now().isoformat(),
            created_by=educator_id,
            is_published=True,
            students_completed=0,
            average_score=0.0
        )
        
        # Store quiz (in production, save to database)
        CUSTOM_QUIZZES[quiz_id] = custom_quiz
        
        # Mock integration with LMS (Learning Management System)
        lms_integration = {
            "quiz_id": quiz_id,
            "lms_url": f"https://lms.example.com/quiz/{quiz_id}",
            "embed_code": f'<iframe src="https://api.edututor.com/embed/quiz/{quiz_id}" width="100%" height="600"></iframe>',
            "sharing_link": f"https://edututor.com/quiz/{quiz_id}"
        }
        
        return {
            "quiz": custom_quiz,
            "lms_integration": lms_integration,
            "message": "Quiz created successfully"
        }
        
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Error creating quiz: {str(e)}")

@router.get("/quizzes")
async def get_educator_quizzes(educator_id: str = "educator_123"):
    """Get all quizzes created by an educator"""
    educator_quizzes = [
        quiz for quiz in CUSTOM_QUIZZES.values() 
        if quiz.created_by == educator_id
    ]
    
    return {
        "quizzes": educator_quizzes,
        "total_count": len(educator_quizzes)
    }

@router.get("/quiz/{quiz_id}")
async def get_quiz_details(quiz_id: str):
    """Get detailed information about a specific quiz"""
    if quiz_id not in CUSTOM_QUIZZES:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    quiz = CUSTOM_QUIZZES[quiz_id]
    
    # Mock detailed analytics
    detailed_stats = {
        "quiz": quiz,
        "analytics": {
            "total_attempts": quiz.students_completed,
            "completion_rate": 85.5,
            "average_score": quiz.average_score,
            "time_analytics": {
                "average_completion_time": 245,
                "fastest_completion": 120,
                "slowest_completion": 450
            },
            "question_analytics": [
                {
                    "question_id": 1,
                    "correct_percentage": 78.5,
                    "common_wrong_answers": ["Option B", "Option D"]
                }
            ]
        },
        "recent_submissions": [
            {
                "student_name": "Anonymous",
                "score": 4,
                "total": 5,
                "completion_time": 230,
                "submitted_at": "2024-01-15T10:30:00"
            }
        ]
    }
    
    return detailed_stats

@router.put("/quiz/{quiz_id}")
async def update_quiz(quiz_id: str, quiz_update: CustomQuizCreate):
    """Update an existing quiz"""
    if quiz_id not in CUSTOM_QUIZZES:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    existing_quiz = CUSTOM_QUIZZES[quiz_id]
    
    # Update quiz fields
    existing_quiz.title = quiz_update.title
    existing_quiz.topic = quiz_update.topic
    existing_quiz.difficulty = quiz_update.difficulty
    existing_quiz.questions = quiz_update.questions
    existing_quiz.time_limit = quiz_update.time_limit
    
    return {
        "quiz": existing_quiz,
        "message": "Quiz updated successfully"
    }

@router.delete("/quiz/{quiz_id}")
async def delete_quiz(quiz_id: str):
    """Delete a quiz"""
    if quiz_id not in CUSTOM_QUIZZES:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    deleted_quiz = CUSTOM_QUIZZES.pop(quiz_id)
    
    return {
        "message": f"Quiz '{deleted_quiz.title}' deleted successfully"
    }

@router.get("/stats")
async def get_educator_stats(educator_id: str = "educator_123"):
    """Get overall statistics for an educator"""
    educator_quizzes = [
        quiz for quiz in CUSTOM_QUIZZES.values() 
        if quiz.created_by == educator_id
    ]
    
    if not educator_quizzes:
        return QuizStats(
            total_quizzes=0,
            total_students=0,
            average_completion_rate=0.0,
            most_popular_topic="None"
        )
    
    total_students = sum(quiz.students_completed for quiz in educator_quizzes)
    
    # Mock topic popularity
    topic_counts = {}
    for quiz in educator_quizzes:
        topic_counts[quiz.topic] = topic_counts.get(quiz.topic, 0) + 1
    
    most_popular_topic = max(topic_counts.items(), key=lambda x: x[1])[0] if topic_counts else "None"
    
    stats = QuizStats(
        total_quizzes=len(educator_quizzes),
        total_students=total_students,
        average_completion_rate=87.3,  # Mock value
        most_popular_topic=most_popular_topic
    )
    
    return stats

@router.post("/quiz/{quiz_id}/publish")
async def publish_quiz(quiz_id: str):
    """Publish a quiz to make it available to students"""
    if quiz_id not in CUSTOM_QUIZZES:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    quiz = CUSTOM_QUIZZES[quiz_id]
    quiz.is_published = True
    
    return {
        "message": "Quiz published successfully",
        "quiz_url": f"https://edututor.com/quiz/{quiz_id}"
    }

@router.post("/quiz/{quiz_id}/unpublish")
async def unpublish_quiz(quiz_id: str):
    """Unpublish a quiz to make it unavailable to students"""
    if quiz_id not in CUSTOM_QUIZZES:
        raise HTTPException(status_code=404, detail="Quiz not found")
    
    quiz = CUSTOM_QUIZZES[quiz_id]
    quiz.is_published = False
    
    return {
        "message": "Quiz unpublished successfully"
    }
