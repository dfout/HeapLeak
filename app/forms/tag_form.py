from flask_wtf import FlaskForm
from wtforms import SelectMultipleField,widgets
from wtforms.validators import DataRequired, ValidationError
from app.models import Tags

class MultiCheckBoxField(SelectMultipleField):
    widget = widgets.ListWidget(prefix_label=False)
    option_widget = widgets.CheckboxInput()

class TagForm(FlaskForm):
    tags = MultiCheckBoxField("Tags",choices=[x.value for x in Tags], validators=[DataRequired()])
