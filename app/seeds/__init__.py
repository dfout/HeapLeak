from flask.cli import AppGroup
from .users import seed_users, undo_users
from .questions import seed_questions, undo_questions
from .answers import seed_answers,undo_answers
from .tags import seed_tags,undo_tags
from .saves import seed_saves, undo_saves

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_saves()
        undo_tags()
        undo_answers()
        undo_questions()
        undo_users()
    seed_users()
    print('-' * 30)
    seed_questions()
    print('-' * 30)
    seed_answers()
    print('-' * 30)
    seed_tags()
    seed_saves()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_saves()
    undo_tags()
    undo_answers()
    undo_questions()
    undo_users()
    # Add other undo functions here
