from .db import db, environment, SCHEMA

class Answer(db.Model):
    __tablename__ = 'answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(2000), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    is_primary = db.Column(db.Boolean, nullable=False)

    def to_dict(self):
        return {
            'id':self.id,
            'body':self.body,
            'is_primary':self.is_primary,
            'mainPost':self.question_id,
            'ownerId':self.user_id
        }
