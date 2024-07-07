from app.models import db, Topic, Tags, environment, SCHEMA
from sqlalchemy.sql import text
from random import randint

tags = [e for e in Tags]

# Adds a demo user, you can add other users here if you want
def seed_tags():
    # for k in range(1 , 14):
    #     for i in range(1,4):
    #         new_tag= Topic(
    #             question_id=k,
    #             tag = tags[randint(0, len(tags) - 1)]
    #         )
    #         db.session.add(new_tag)

    q1_tag1 = Topic(
    question_id=1,
    tag=tags[21]  # React
    )
    db.session.add(q1_tag1)

    q1_tag2 = Topic(
        question_id=1,
        tag=tags[33]  # RESTful APIs
    )
    db.session.add(q1_tag2)

    q1_tag3 = Topic(
        question_id=1,
        tag=tags[1]  # JavaScript
    )
    db.session.add(q1_tag3)

    q2_tag1 = Topic(
        question_id=2,
        tag=tags[2]  # Java
    )
    db.session.add(q2_tag1)

    q2_tag2 = Topic(
        question_id=2,
        tag=tags[96]  # Software Architecture
    )
    db.session.add(q2_tag2)

    q2_tag3 = Topic(
        question_id=2,
        tag=tags[88]  # Cybersecurity
    )
    db.session.add(q2_tag3)

    q3_tag1 = Topic(
        question_id=3,
        tag=tags[43]  # MySQL
    )
    db.session.add(q3_tag1)

    q3_tag2 = Topic(
        question_id=3,
        tag=tags[98]  # Performance Optimization
    )
    db.session.add(q3_tag2)

    q3_tag3 = Topic(
        question_id=3,
        tag=tags[81]  # Algorithms
    )
    db.session.add(q3_tag3)

    q4_tag1 = Topic(
        question_id=4,
        tag=tags[26]  # Django
    )
    db.session.add(q4_tag1)

    q4_tag2 = Topic(
        question_id=4,
        tag=tags[88]  # Cybersecurity
    )
    db.session.add(q4_tag2)

    q4_tag3 = Topic(
        question_id=4,
        tag=tags[95]  # API Design
    )
    db.session.add(q4_tag3)

    q5_tag1 = Topic(
        question_id=5,
        tag=tags[23]  # Vue.js
    )
    db.session.add(q5_tag1)

    q5_tag2 = Topic(
        question_id=5,
        tag=tags[96]  # Software Architecture
    )
    db.session.add(q5_tag2)

    q5_tag3 = Topic(
        question_id=5,
        tag=tags[95]  # API Design
    )
    db.session.add(q5_tag3)

    q6_tag1 = Topic(
        question_id=6,
        tag=tags[27]  # Flask
    )
    db.session.add(q6_tag1)

    q6_tag2 = Topic(
        question_id=6,
        tag=tags[33]  # RESTful APIs
    )
    db.session.add(q6_tag2)

    q6_tag3 = Topic(
        question_id=6,
        tag=tags[97]  # Microservices
    )
    db.session.add(q6_tag3)

    q7_tag1 = Topic(
        question_id=7,
        tag=tags[83]  # Machine Learning
    )
    db.session.add(q7_tag1)

    q7_tag2 = Topic(
        question_id=7,
        tag=tags[96]  # Software Architecture
    )
    db.session.add(q7_tag2)

    q7_tag3 = Topic(
        question_id=7,
        tag=tags[0]  # Python
    )
    db.session.add(q7_tag3)

    q8_tag1 = Topic(
        question_id=8,
        tag=tags[25]  # Node.js
    )
    db.session.add(q8_tag1)

    q8_tag2 = Topic(
        question_id=8,
        tag=tags[88]  # Cybersecurity
    )
    db.session.add(q8_tag2)

    q8_tag3 = Topic(
        question_id=8,
        tag=tags[96]  # Software Architecture
    )
    db.session.add(q8_tag3)

    q9_tag1 = Topic(
        question_id=9,
        tag=tags[52]  # AWS
    )
    db.session.add(q9_tag1)

    q9_tag2 = Topic(
        question_id=9,
        tag=tags[83]  # Machine Learning
    )
    db.session.add(q9_tag2)

    q9_tag3 = Topic(
        question_id=9,
        tag=tags[80]  # Continuous Deployment
    )
    db.session.add(q9_tag3)

    q10_tag1 = Topic(
        question_id=10,
        tag=tags[60]  # CI/CD
    )
    db.session.add(q10_tag1)

    q10_tag2 = Topic(
        question_id=10,
        tag=tags[0]  # Python
    )
    db.session.add(q10_tag2)

    q10_tag3 = Topic(
        question_id=10,
        tag=tags[79]  # Continuous Integration
    )
    db.session.add(q10_tag3)

    q11_tag1 = Topic(
        question_id=11,
        tag=tags[96]  # Software Architecture
    )
    db.session.add(q11_tag1)

    q11_tag2 = Topic(
        question_id=11,
        tag=tags[37]  # iOS
    )
    db.session.add(q11_tag2)

    q11_tag3 = Topic(
        question_id=11,
        tag=tags[36]  # Android
    )
    db.session.add(q11_tag3)

    q12_tag1 = Topic(
        question_id=12,
        tag=tags[13]  # CSS
    )
    db.session.add(q12_tag1)

    q12_tag2 = Topic(
        question_id=12,
        tag=tags[20]  # CSS3
    )
    db.session.add(q12_tag2)

    q12_tag3 = Topic(
        question_id=12,
        tag=tags[96]  # Software Architecture
    )
    db.session.add(q12_tag3)

    q13_tag1 = Topic(
        question_id=13,
        tag=tags[25]  # Node.js
    )
    db.session.add(q13_tag1)

    q13_tag2 = Topic(
        question_id=13,
        tag=tags[53]  # Azure
    )
    db.session.add(q13_tag2)

    q13_tag3 = Topic(
        question_id=13,
        tag=tags[88]  # Cybersecurity
    )
    db.session.add(q13_tag3)








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
