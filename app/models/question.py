from .db import db, environment, SCHEMA

class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    body = db.Column(db.String(2000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    answers = db.relationship('Answer', back_populates='main_post')
    tags = db.relationship('Topic', back_populates='main_post')

    def to_dict(self):
        answer_dict_list=[x.to_dict_base() for x in self.answers]
        tag_dict_list = [x.to_dict() for x in self.tags]
        return {
            'id':self.id,
            'title':self.title,
            'body':self.body,
            'answers':answer_dict_list,
            'tags':tag_dict_list
        }
    def to_dict_base(self):
        return {
            'id':self.id,
            'title':self.title,
            'body':self.body,
        }
