from .db import db, environment, SCHEMA,add_prefix_for_prod

class Answer(db.Model):
    __tablename__ = 'answers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(2000), nullable=False)
    question_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('questions.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    is_primary = db.Column(db.Boolean, nullable=False)
    time_created = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    time_updated = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

    def to_dict(self):
        return {
            'id':self.id,
            'body':self.body,
            'is_primary':self.is_primary,
            'mainPost':self.question_id,
            'ownerId':self.user_id,
            'timeCreated':self.time_created,
            'timeUpdated':self.time_updated
        }
