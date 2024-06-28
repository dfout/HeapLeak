from .db import db, environment, SCHEMA


class Topic(db.Model):
    __tablename__ = 'topics'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'), nullable=False)
    tag = db.Column(db.String(50), nullable=False)

    main_post = db.relationship('Question', back_populates='tags')

    def to_dict(self):
        return {
            'id':self.tag
        }
