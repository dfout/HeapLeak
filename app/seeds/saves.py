from app.models import db, Save, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_saves():
    post1 = Save(
        question_id=1,
        user_id=1
        )
    post2 = Save(
    question_id=2,
    user_id=1
    )
    post3 = Save(
        question_id=3,
        user_id=1
    )
    post4 = Save(
        question_id = 4,
        user_id = 1,
    )
    post5 = Save(
        question_id = 5, 
        user_id = 1
    )


    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_saves():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.saves RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM saves"))

    db.session.commit()