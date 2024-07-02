from flask_login import current_user, login_required
from flask import Blueprint, request
from app.models import Question, db, Answer, Topic, Save
from app.forms import QuestionForm, AnswerForm, TagForm

question_routes = Blueprint('question', __name__)

@question_routes.route('/')
def all_questions():
    '''
        Get all questions in the database,
        along with each question's tags
    '''
    questions = [x.to_dict() for x in Question.query.all()]
    for question in questions:
        question['Tags'] = [x.to_dict()['tag'] for x in Topic.query.filter_by(question_id=question['id']).all()]
    return {"Questions":questions}

@question_routes.route('/<int:id>')
def one_question(id):
    '''
        Get one question in the database by the id
    '''
    question = Question.query.filter_by(id=id).first()
    if question == None:
        return {"message":"Question could not be found"}, 404
    questionObj = question.to_dict()
    questionObj['Tags'] = [x.to_dict() for x in Topic.query.filter_by(question_id=question.id).all()]
    return {"Question":questionObj}

@question_routes.route('/', methods=['POST'])
@login_required
def make_question():
    '''
        If logged in and the data is valid,
        create a new question and add it to the database,
        allong with all tags requested into the database
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
        safe_question = new_question.to_dict()
        for x in form.data['tags']:
            new_tag = Topic (
                tag = x,
                question_id = new_question.id
            )
            db.session.add(new_tag)
            db.session.commit()
        safe_question['Tags'] = [x.to_dict() for x in Topic.query.filter_by(question_id=new_question.id).all()]
        return {"Question":safe_question}
    if form.errors:
        return {"message":"Bad Request", "errors":form.errors}, 400

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
        return {"message":"Bad Request", "errors":form.errors}, 400


@question_routes.route('/<int:id>/answers')
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
        return {"message":"Bad Request", "errors":form.errors}, 400

@question_routes.route('/<int:id>/tags', methods=['POST'])
@login_required
def add_tags(id):
    '''
        Add tags to a post that
        has already been made
    '''
    form = TagForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        for x in form.data['tags']:
            new_tag = Topic (
                tag = x,
                question_id = id
            )
            db.session.add(new_tag)
            db.session.commit()
        tags = [x.to_dict() for x in Topic.query.filter_by(question_id=id).all()]
        return {'Tags': tags}
    if form.errors:
        return {"message":"Bad Request",'errors':form.errors}, 400

@question_routes.route('/<int:id>/save', methods = ['POST'])
@login_required
def save_question(id):
    '''
        Creates a relation to save the requested
        question for the user
    '''
    question = Question.query.filter_by(id=id).first()
    if question != None:
        new_save = Save(
            question_id = id,
            user_id = current_user.id
        )
        db.session.add(new_save)
        db.session.commit()
        return {'User':current_user.to_dict(), 'Question': question.to_dict()}
    else:
        return {'message':"Question could not be found"}, 404

@question_routes.route('/<int:id>/save', methods = ['DELETE'])
@login_required
def unsave_question(id):
    '''
        Removes the relation to a save
        for a question and user
    '''
    save = Save.query.filter_by(question_id = id, user_id=current_user.id).first()
    if save != None:
        db.session.delete(save)
        db.session.commit()
        return {'Id':save.id}
    else:
        return {'message':"Relation could not be found"}, 404

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
