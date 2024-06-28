from flask_login import current_user, login_required
from flask import Blueprint, request
from app.models import db, Answer, Question
from app.forms import AnswerForm

answer_routes = Blueprint('answer', __name__)

@answer_routes.route('/<int:id>', methods=['PUT'])
@login_required
def edit_answer(id):
    answer = Answer.query.filter_by(id=id).first()
    if answer.user_id != current_user.id:
        return {"message":"Not the owner of this Answer"},401
    form = AnswerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        answer.body = form.data['body']
        db.session.commit()
        return {"Answer": answer.to_dict()}
    if form.errors:
        return {"message":"Bad Request", "errors": form.errors},400

@answer_routes.route('/<int:id>/mark_primary', methods=['PUT'])
@login_required
def promote_answer(id):
    answer = Answer.query.filter_by(id=id).first()
    question = Question.query.filter_by(id=answer.question_id)
    if question.user_id == current_user.id:
        previous_primary = Answer.query.filter_by(is_primary=True).first()
        if previous_primary != None:
            previous_primary.is_primary = False
            answer.is_primary = True
            db.session.commit()
            return {"NewPrimary":answer.to_dict(), "OldPrimary":previous_primary.to_dict()}
        else:
            answer.is_primary = True
            db.session.commit()
            return {"NewPrimary":answer.to_dict()}
    else:
        return {"message":"Not the owner of this Question"}, 401


@answer_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_answer(id):
    answer = Answer.query.filter_by(id=id).first()
    if current_user.id == answer.user_id:
        db.session.delete(answer)
        db.session.commit()
        return {"id":id}
    else:
        return {"id":None}
