from flask import Blueprint, jsonify
from flask_login import login_required,current_user
from app.models import User, Save, Question, Answer, Topic

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/saves')
@login_required
def get_saved_posts():
    '''
        Get all of the current logged in
        user's saved questions, return
        an empty array if there are no
        relations or if the questions no longer
        exist
    '''
    saves = [x.to_dict() for x in Save.query.filter_by(user_id=current_user.id).all()]
    for x in saves:
        x_question = Question.query.filter_by(id=x['post']).first()
        question = x_question.to_dict()
        question['Tags'] = [x.to_dict() for x in Topic.query.filter_by(question_id=question['id']).all()]
        author = User.query.filter_by(id = question['ownerId']).first()
        question['author'] = author.username
        question['Answers'] = [x.to_dict() for x in Answer.query.filter_by(question_id = question['id']).all()]
        if x_question!= None:
            x['post'] = question
    return {"SavedQuestions": saves}

@user_routes.route('/answers')
@login_required
def get_my_answers():
    '''
        Get all of the current logged in
        user's answers to questions, return
        an empty array if there are no
        relations or if the questions no longer
        exist
    '''
    answers = [x.to_dict() for x in Answer.query.filter_by(user_id=current_user.id).all()]
    for answer in answers:
        main = Question.query.filter_by(id = answer['mainPost']).first()
        question = main.to_dict()
        owner = User.query.filter_by(id= question['ownerId']).first()
        question['owner'] = owner.to_dict()
        answer['mainPost'] = question
    return {"Answers":answers}
