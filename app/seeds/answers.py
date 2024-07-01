from app.models import db, Answer, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint

answer_bodys = [
   "Have you turned it off and on again?",
   "troll answer 404",
   "Ah, the age-old question. As ancient as time itself. Try Googling it – you'll find a million answers, none of which will work for you.",
   "Well, that depends. Do you want to be endlessly frustrated by syntax errors or just mildly annoyed by them?",
   "Sure, just send over your entire future salary as a down payment. You know, because that's what you'd be learning to earn.",
   "JavaScript isn't weird. You're just not weird enough yet to understand it.",
   "Try the ancient method of reading the documentation and actually writing code. Revolutionary, I know.",
   "The one you already have installed. But if you like installing random software, go ahead and try them all.",
   "First, stop asking vague questions on HeapLeak and start solving real problems. Baby steps.",
   "Sure, recursion is... Oh look, I have to explain recursion again."
   ]

# Adds a demo user, you can add other users here if you want
def seed_answers():
   for i in range(1, 16):
    for k in range(1 , 31):
       if i != k and k % 3 == 0 or i % 3 == 0:
        newAnswer = Answer(
          body=answer_bodys[randint(0, len(answer_bodys)-1)],
          user_id = i,
          question_id = k,
          is_primary = False
        )
        db.session.add(newAnswer)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_answers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.answers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))

    db.session.commit()
