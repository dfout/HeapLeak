from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    anita = User(
        username='anita', email='anita@aa.io', password='password')
    sigmus = User(
        username='sigmus', email='sigmus@aa.io', password='password')
    velma = User(
        username='velma', email='velma@aa.io', password='password')
    clayton = User(
        username='clayton', email='clayton@aa.io', password='password')
    caroline = User(
        username='glad0s', email='caroline@aa.io', password='c4ke1sthetruth')
    xavier = User(
        username='xavier', email='xavier@aa.io', password='password')
    chell = User(
        username='chell', email='chell@aa.io', password='password')
    carlo = User(
        username='carlo', email='carlo@aa.io', password='password')
    lyra = User(
        username='lyra', email='lyra@aa.io', password='password')
    kyran = User(
        username='kyran', email='kyran@aa.io', password='password')
    heather = User(
        username='heather', email='heather@aa.io', password='password')
    torvald = User(
        username='torvald', email='torvald@aa.io', password='password')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(anita)
    db.session.add(sigmus)
    db.session.add(velma)
    db.session.add(clayton)
    db.session.add(caroline)
    db.session.add(xavier)
    db.session.add(chell)
    db.session.add(carlo)
    db.session.add(lyra)
    db.session.add(kyran)
    db.session.add(heather)
    db.session.add(torvald)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
