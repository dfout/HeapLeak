from app.models import db, Topic, Tags, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint

tags = [e for e in Tags]

# Adds a demo user, you can add other users here if you want
def seed_tags():
    for k in range(1 , 14):
        for i in range(1,4):
            new_tag= Topic(
                question_id=k,
                tag = tags[randint(0, len(tags) - 1)]
            )
            db.session.add(new_tag)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.topics RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))

    db.session.commit()
