from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Question(db.Model):
    __tablename__ = 'questions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    body = db.Column(db.String(2000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    time_created = db.Column(db.DateTime(timezone=True), server_default=db.func.now())
    time_updated = db.Column(db.DateTime(timezone=True), server_default=db.func.now(), onupdate=db.func.now())

    def to_dict(self):
        return {
            'id':self.id,
            'title':self.title,
            'body':self.body,
            'ownerId':self.user_id,
            'timeCreated':self.time_created,
            'timeUpdated':self.time_updated
        }
