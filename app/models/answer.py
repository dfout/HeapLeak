from .db import db, environment, SCHEMA

class Answer(db.Model):
    __tablename__ = 'answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    body = db.Column(db.String(2000), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    owner = db.relationship('User', back_populates='answers')
    main_post = db.relationship('Question', back_populates='answers')

    def to_dict(self):
        return {
            'id':self.id,
            'title':self.title,
            'body':self.body,
            'mainPost':self.main_post.to_dict_base(),
            'owner':self.owner.to_dict(),
        }
    def to_dict_base(self):
        return {
            'id':self.id,
            'title':self.title,
            'body':self.body,
            'mainPost':self.main_post.to_dict_base(),
            'owner':self.owner.to_dict(),
        }
