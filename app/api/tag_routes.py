from flask_login import current_user, login_required
from flask import Blueprint, request
from app.models import db, Tags, Topic, Question
from app.forms import QuestionForm, AnswerForm

tags = Blueprint('tag',__name__)

@tags.route('/')
@login_required
def all_tags():
    tag_arr = [x.value for x in tags]
    return {"Tags":tag_arr}

@tags.route('/<int:id>')
@login_required
def remove_tag(id):
    tag = Topic.query.filter_by(id=id).first()
    question = Question.query.filter_by(id = tag.question_id).first()
    if current_user.id == question.user_id:
        db.session.delete(tag)
        db.session.commit()
        return {"id":id}
    else:
        return {'id':None}, 404
