from flask_login import current_user, login_required
from flask import Blueprint, request
from app.models import Question, User, db, Answer, Topic, Save,Tags
from app.forms import QuestionForm, AnswerForm, TagForm, QuestionUpdateForm

question_routes = Blueprint('question', __name__)

@question_routes.route('/')
def all_questions():
    '''
        Get all questions in the database,
        along with each question's tags
    '''
    questions = [x.to_dict() for x in Question.query.all()]
    for question in questions:
        question['Tags'] = [x.to_dict() for x in Topic.query.filter_by(question_id=question['id']).all()]
        author = User.query.filter_by(id = question['ownerId']).first()
        question['author'] = author.username
        question['Answers'] = [x.to_dict() for x in Answer.query.filter_by(question_id = question['id']).all()]
        for answer in question['Answers']:
            user = User.query.filter_by(id = answer['ownerId']).first()
            answer['author'] = user.to_dict()
        question['numSaves'] = len(Save.query.filter_by(question_id = question['id']).all())

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
    author = User.query.filter_by(id = question.user_id).first()
    questionObj['author'] = author.username
    questionObj['Answers'] = [x.to_dict() for x in Answer.query.filter_by(question_id = question.id).all()]
    for answer in questionObj['Answers']:
        user = User.query.filter_by(id = answer['ownerId']).first()
        answer['author'] = user.to_dict()
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
            for v in Tags:
                if v.value == x:
                    new_tag = Topic (
                    tag = v,
                    question_id = new_question.id
                    )
                    db.session.add(new_tag)
        db.session.commit()
        safe_question['Tags'] = [x.to_dict() for x in Topic.query.filter_by(question_id=new_question.id).all()]
        safe_question['author'] = current_user.username
        return {"Question":safe_question}
    if form.errors:
        print(form.errors)
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
        oldTags = [x for x in Topic.query.filter_by(question_id = id).all()]
        _ = [db.session.delete(x) for x in oldTags]
        db.session.commit()
        for tag in form.data['tags']:
            for v in Tags:
                if v.value == tag:
                    new_tag = Topic (
                    tag = v,
                    question_id = id
                    )
                    db.session.add(new_tag)
        db.session.commit()
        safe_question = question.to_dict()
        safe_question['Tags'] = [x.to_dict() for x in Topic.query.filter_by(question_id = id).all()]
        safe_question['author'] = current_user.username
        safe_question['Answers']= [x.to_dict() for x in Answer.query.filter_by(question_id = id).all()]
        return {"Question":safe_question}
    if form.errors:
        return {"message":"Bad Request", "errors":form.errors}, 400


@question_routes.route('/<int:id>/answers')
def all_answers(id):
    '''
        Get all answers for a question in the database
    '''
    answers = [x.to_dict() for x in Answer.query.filter_by(question_id=id).all()]
    for answer in answers:
        author = User.query.filter_by(id=answer['ownerId']).first()
        answer['author'] = author.username
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
        db.session.add(new_answer)
        db.session.commit()
        safe_answer = new_answer.to_dict()
        x_question = Question.query.filter_by(id=id).first()
        question = x_question.to_dict()
        owner = User.query.filter_by(id= question['ownerId']).first()
        question['owner'] = owner.to_dict()
        safe_answer['mainPost'] = question
        return {"Answer":safe_answer}
    if form.errors:
        print(form.errors)
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

@question_routes.route('/<int:id>/saves', methods = ['POST'])
@login_required
def save_question(id):
    '''
        Creates a relation to save the requested
        question for the user
    '''
    x_question = Question.query.filter_by(id=id).first()
    if x_question != None:
        new_save = Save(
            question_id = id,
            user_id = current_user.id
        )
        db.session.add(new_save)
        db.session.commit()
        safe_save = new_save.to_dict()
        question = x_question.to_dict()
        question['Tags'] = [x.to_dict() for x in Topic.query.filter_by(question_id=question['id']).all()]
        author = User.query.filter_by(id = question['ownerId']).first()
        question['author'] = author.username
        safe_save['post'] = question
        return {'Save':safe_save}
    else:
        return {'message':"Question could not be found"}, 404

@question_routes.route('/saves/<int:id>', methods = ['DELETE'])
@login_required
def unsave_question(id):
    '''
        Removes the relation to a save
        for a question and user
    '''
    save = Save.query.filter_by(id = id).first()
    if save != None:
        db.session.delete(save)
        db.session.commit()
        return {'Id':id}
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
