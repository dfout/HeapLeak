from flask_login import current_user, login_required
from flask import Blueprint, request
from app.models import Question, db, Answer
from app.forms import QuestionForm, AnswerForm

question_routes = Blueprint('question', __name__)

@question_routes.route('/')
def all_questions():
    '''
        Get all questions in the database
    '''
    questions = [x.to_dict() for x in Question.query.all()]
    return {"Questions":questions}

@question_routes.route('/<int:id>')
def one_question(id):
    '''
        Get one question in the database by the id
    '''
    question = Question.query.filter_by(id=id).first()
    return {"Question":question.to_dict()}

@question_routes.route('/', methods=['POST'])
@login_required
def make_question():
    '''
        If logged in and the data is valid,
        create a new question and add it to the database
    '''
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_question = Question(
            title = form.data["title"],
            body = form.data["body"],
            user_id = current_user.id
        )
        db.session.add(new_question)
        db.session.commit()
        return {"Question":new_question.to_dict()}
    if form.errors:
        return {"message":"Bad Request", "errors":form.errors}, 404

@question_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_question(id):
    '''
        If logged in and the owner of the question,
        update the question and apply it to the
        database
    '''
    question = Question.query.filter_by(id=id).first()
    if question.user_id != current_user.id:
        return {"message":"Not the owner of this Question"},401
    form = QuestionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        question.title = form.data["title"]
        question.body = form.data["body"]
        db.session.commit()
        return {"Question":question.to_dict()}
    if form.errors:
        return {"message":"Bad Request", "errors":form.errors}, 404


@question_routes('/<int:id>/answers')
def all_answers(id):
    '''
        Get all answers for a question in the database
    '''
    answers = [x.to_dict() for x in Answer.query.filter_by(question_id=id).all()]
    return {"Answers":answers}


@question_routes.route('/<int:id>/answers', methods=["POST"])
@login_required
def make_answer(id):
    '''
        If logged in, make a new answer for a
        question and add it to the database,
        at the default of not being the
        primary answer for a question
    '''
    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_answer=Answer(
            body=form.data['body'],
            question_id=id,
            user_id=current_user.id,
            is_primary=False
        )
        db.session.commit()
        return {"Answer":new_answer.to_dict()}
    if form.errors:
        return {"message":"Bad Request", "errors":form.errors}, 404

@question_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    '''
        If logged in and the owner of the
        question, delete the question from the
        database if it exists
    '''
    question = Question.query.filter_by(id=id).first()
    if current_user.id == question.user_id:
        db.session.delete(question)
        db.session.commit()
        return {"id":id}
    else:
        return {"id":None}, 404
