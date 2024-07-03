from .db import db, environment, SCHEMA, add_prefix_for_prod

class Save(db.Model):
    __tablename__ = 'saves'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    def to_dict(self):
        return{
            'id':self.id,
            'post':self.question_id
        }
