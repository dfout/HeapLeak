from flask_wtf import FlaskForm
from wtforms import StringField, SelectMultipleField, widgets
from wtforms.validators import DataRequired, ValidationError
from app.models import Question, Tags

def minLengthTitle(form, field):
    if len(field) < 10:
        raise ValidationError('Title must be at least 10 character long')
def minLengthBody(form, field):
    if len(field) < 20:
        raise ValidationError('Body must be at least 20 character long')

class MultiCheckBoxField(SelectMultipleField):
    widget = widgets.ListWidget(prefix_label=False)
    option_widget = widgets.CheckboxInput()
