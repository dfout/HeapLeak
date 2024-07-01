from app.models import db, Question, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_questions():
    post1 = Question(
        title = "This is a test post, say hello!",
        body = "I was wondering, how do I change the title of my post? is that even possible?",
        user_id=1
        )
    post2 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=1
        )
    post3 = Question(
        title = "How does an oven work? All of my garlic bread is being burnt!",
        body = "I was wondering, how do I use an oven? I just want to have my garlic bread and eat it too!",
        user_id=2
        )
    post4 = Question(
        title = "Running into flask db errors",
        body = "Seems to run the default schema and prepare to upgrade, but errors out with no message in terminal. What do I need to do to fix this?",
        user_id=2
        )
    post5 = Question(
        title = "Issue with Application Visualization in Revit",
        body = "I developed an application using C# based on Revit. When I run the application from Visual Studio, it works perfectly. However, when I run the app from Revit, all the functionalities work except for the visualization function. It works the first time and then crashes.&%$;!Is there anyone who can help me?&%$;!Is there anyone I can share the code with who can help me fix this bug?",
        user_id=3
        )
    post6 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=3
        )
    post7 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=4
        )
    post8 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=4
        )
    post9 = Question(
        title = "This is a test post, say hello!",
        body = "I was wondering, how do I change the title of my post? is that even possible?",
        user_id=5
        )
    post10 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=5
        )
    post11 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=6
        )
    post12 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=6
        )
    post13 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=7
        )
    post14 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=7
        )
    post15 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=8
        )
    post16 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=8
        )
    post17 = Question(
        title = "This is a test post, say hello!",
        body = "I was wondering, how do I change the title of my post? is that even possible?",
        user_id=9
        )
    post18 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=9
        )
    post19 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=10
        )
    post20 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=10
        )
    post21 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=11
        )
    post22 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=11
        )
    post23 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=12
        )
    post24 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=12
        )
    post25 = Question(
        title = "This is a test post, say hello!",
        body = "I was wondering, how do I change the title of my post? is that even possible?",
        user_id=13
        )
    post26 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=13
        )
    post27 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=14
        )
    post28 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=14
        )
    post29 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=15
        )
    post30 = Question(
        title = "How does a toaster work? All of my toast is being burnt!",
        body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
        user_id=15
        )


    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)
    db.session.add(post10)
    db.session.add(post11)
    db.session.add(post12)
    db.session.add(post13)
    db.session.add(post14)
    db.session.add(post15)
    db.session.add(post16)
    db.session.add(post17)
    db.session.add(post18)
    db.session.add(post19)
    db.session.add(post20)
    db.session.add(post21)
    db.session.add(post22)
    db.session.add(post23)
    db.session.add(post24)
    db.session.add(post25)
    db.session.add(post26)
    db.session.add(post27)
    db.session.add(post28)
    db.session.add(post29)
    db.session.add(post30)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_questions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM questions"))

    db.session.commit()
