from flask_wtf import FlaskForm
from wtforms import StringField, SelectMultipleField, widgets
from wtforms.validators import DataRequired, ValidationError
from app.models import Question, Tags

def minLengthTitle(form, field):
    if len(field.data) < 10:
        raise ValidationError('Title must be at least 10 characters long')
def minLengthBody(form, field):
    if len(field.data) < 20:
        raise ValidationError('Body must be at least 20 characters long')

class MultiCheckBoxField(SelectMultipleField):
    widget = widgets.ListWidget(prefix_label=False)
    option_widget = widgets.CheckboxInput()

class QuestionForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), minLengthTitle])
    body = StringField("Body", validators=[DataRequired(), minLengthBody])
    tags = MultiCheckBoxField("Tags",choices=[x.value for x in Tags], validators=[DataRequired()])

class QuestionUpdateForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), minLengthTitle])
    body = StringField("Body", validators=[DataRequired(), minLengthBody])
