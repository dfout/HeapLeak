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

madeIds = [
   [1,2],
   [3,4],
   [5,6],
   [7,8],
   [9,10],
   [11,12],
   [13,14],
   [15,16],
   [17,18],
   [19,20],
   [21,22],
   [23,24],
   [25,26],
   [27,28],
   [29,30],
]

# Adds a demo user, you can add other users here if you want
def seed_answers():
#    for i in range(1, 16):
#     for k in range(1 , 31):
#        if k not in madeIds[i-1] and (i % 2 == 0):
#         newAnswer = Answer(
#           body=answer_bodys[randint(0, len(answer_bodys)-1)],
#           user_id = i,
#           question_id = k,
#           is_primary = False
#         )
#         db.session.add(newAnswer)

# Answers for post1
    answer1_1 = Answer(
        body="To center a div horizontally, you can use margin: 0 auto. For vertical centering, you can use flexbox.",
        user_id=2,
        question_id=1,
        is_primary=False
    )
    db.session.add(answer1_1)

    answer1_2 = Answer(
        body="Using flexbox is a great way to center elements. Set display: flex and justify-content: center for horizontal centering and align-items: center for vertical centering.",
        user_id=3,
        question_id=1,
        is_primary=False
    )
    db.session.add(answer1_2)

    answer1_3 = Answer(
        body="You can also use grid layout by setting display: grid and place-items: center.",
        user_id=4,
        question_id=1,
        is_primary=False
    )
    db.session.add(answer1_3)

    answer1_4 = Answer(
        body="If you are using older browsers, you might need to use absolute positioning with top, bottom, left, and right set to 0 and margin auto.",
        user_id=5,
        question_id=1,
        is_primary=False
    )
    db.session.add(answer1_4)

    answer1_5 = Answer(
        body="Remember to set a height for the parent element if you are using flexbox or grid for vertical centering.",
        user_id=6,
        question_id=1,
        is_primary=False
    )
    db.session.add(answer1_5)

    # Answers for post2
    answer2_1 = Answer(
        body="let is block-scoped and var is function-scoped. Use let to avoid variable hoisting issues.",
        user_id=1,
        question_id=2,
        is_primary=False
    )
    db.session.add(answer2_1)

    answer2_2 = Answer(
        body="var declarations are processed before any code is executed, which is why they are hoisted. let and const are not hoisted.",
        user_id=3,
        question_id=2,
        is_primary=False
    )
    db.session.add(answer2_2)

    answer2_3 = Answer(
        body="let allows you to declare variables that are limited to the scope of a block statement, or expression on which it is used.",
        user_id=4,
        question_id=2,
        is_primary=False
    )
    db.session.add(answer2_3)

    answer2_4 = Answer(
        body="You should prefer let over var to avoid unexpected behavior due to hoisting and scope issues.",
        user_id=5,
        question_id=2,
        is_primary=False
    )
    db.session.add(answer2_4)

    answer2_5 = Answer(
        body="const is another option for declaring variables, and it works similarly to let but creates a constant that cannot be reassigned.",
        user_id=6,
        question_id=2,
        is_primary=False
    )
    db.session.add(answer2_5)

    # Answers for post3
    answer3_1 = Answer(
        body="You can use the MySQL Connector/Python library. Install it using pip install mysql-connector-python.",
        user_id=2,
        question_id=3,
        is_primary=False
    )
    db.session.add(answer3_1)

    answer3_2 = Answer(
        body="Here's a basic example: import mysql.connector, connect to the database with mysql.connector.connect(), and then create a cursor to execute queries.",
        user_id=1,
        question_id=3,
        is_primary=False
    )
    db.session.add(answer3_2)

    answer3_3 = Answer(
        body="Don't forget to handle exceptions using try and except blocks to catch any errors that occur during the connection or query execution.",
        user_id=4,
        question_id=3,
        is_primary=False
    )
    db.session.add(answer3_3)

    answer3_4 = Answer(
        body="You can also use SQLAlchemy as an ORM for more advanced database interactions and to avoid writing raw SQL queries.",
        user_id=5,
        question_id=3,
        is_primary=False
    )
    db.session.add(answer3_4)

    answer3_5 = Answer(
        body="Remember to close the connection using connection.close() after you're done with database operations.",
        user_id=6,
        question_id=3,
        is_primary=False
    )
    db.session.add(answer3_5)

    # Answers for post4
    answer4_1 = Answer(
        body="== compares values after type coercion, while === compares both value and type without coercion.",
        user_id=2,
        question_id=4,
        is_primary=False
    )
    db.session.add(answer4_1)

    answer4_2 = Answer(
        body="Use === to avoid unexpected results due to type coercion, which can happen with ==.",
        user_id=3,
        question_id=4,
        is_primary=False
    )
    db.session.add(answer4_2)

    answer4_3 = Answer(
        body="For example, '5' == 5 is true because == converts '5' to a number, but '5' === 5 is false because the types are different.",
        user_id=1,
        question_id=4,
        is_primary=False
    )
    db.session.add(answer4_3)

    answer4_4 = Answer(
        body="In general, always use === unless you have a specific reason to use == and are aware of the type conversion behavior.",
        user_id=5,
        question_id=4,
        is_primary=False
    )
    db.session.add(answer4_4)

    answer4_5 = Answer(
        body="Also note that == and === both compare by reference when dealing with objects, so {a:1} === {a:1} is false.",
        user_id=6,
        question_id=4,
        is_primary=False
    )
    db.session.add(answer4_5)

    # Answers for post5
    answer5_1 = Answer(
        body="You can use the venv module in Python 3.3+ to create virtual environments. Run python -m venv myenv to create one.",
        user_id=2,
        question_id=5,
        is_primary=False
    )
    db.session.add(answer5_1)

    answer5_2 = Answer(
        body="After creating the virtual environment, activate it using source myenv/bin/activate on Unix or myenv\\Scripts\\activate on Windows.",
        user_id=3,
        question_id=5,
        is_primary=False
    )
    db.session.add(answer5_2)

    answer5_3 = Answer(
        body="Once activated, you can install dependencies using pip and they will be isolated to your virtual environment.",
        user_id=1,
        question_id=5,
        is_primary=False
    )
    db.session.add(answer5_3)

    answer5_4 = Answer(
        body="Remember to deactivate the virtual environment when you are done working by running deactivate.",
        user_id=4,
        question_id=5,
        is_primary=False
    )
    db.session.add(answer5_4)

    answer5_5 = Answer(
        body="You can also use virtualenv if you are using an older version of Python or prefer its features.",
        user_id=6,
        question_id=5,
        is_primary=False
    )
    db.session.add(answer5_5)

    # Answers for post6
    answer6_1 = Answer(
        body="You can use the fetch API to make HTTP requests. Use useEffect to call fetch when the component mounts.",
        user_id=2,
        question_id=6,
        is_primary=False
    )
    db.session.add(answer6_1)

    answer6_2 = Answer(
        body="Here's an example: useEffect(() => { fetch('api-url').then(res => res.json()).then(data => setData(data)) }, []);",
        user_id=3,
        question_id=6,
        is_primary=False
    )
    db.session.add(answer6_2)

    answer6_3 = Answer(
        body="You can also use axios, which is a popular library for making HTTP requests in React.",
        user_id=1,
        question_id=6,
        is_primary=False
    )
    db.session.add(answer6_3)

    answer6_4 = Answer(
        body="Don't forget to handle errors by adding a catch block to your fetch or axios request.",
        user_id=4,
        question_id=6,
        is_primary=False
    )
    db.session.add(answer6_4)

    answer6_5 = Answer(
        body="If you are dealing with large data sets, consider using useSWR or React Query for data fetching and caching.",
        user_id=6,
        question_id=6,
        is_primary=False
    )
    db.session.add(answer6_5)

    # Answers for post7
    answer7_1 = Answer(
        body="Django has built-in support for user authentication. You can use the django.contrib.auth module to manage users and authentication.",
        user_id=2,
        question_id=7,
        is_primary=False
    )
    db.session.add(answer7_1)

    answer7_2 = Answer(
        body="To get started, add 'django.contrib.auth' and 'django.contrib.contenttypes' to your INSTALLED_APPS in settings.py.",
        user_id=3,
        question_id=7,
        is_primary=False
    )
    db.session.add(answer7_2)

    answer7_3 = Answer(
        body="Use the User model provided by Django to create and manage user accounts. You can also customize the User model if needed.",
        user_id=1,
        question_id=7,
        is_primary=False
    )
    db.session.add(answer7_3)

    answer7_4 = Answer(
        body="Django also provides views and forms for handling login, logout, and password management. Use the built-in views for these tasks.",
        user_id=4,
        question_id=7,
        is_primary=False
    )
    db.session.add(answer7_4)

    answer7_5 = Answer(
        body="For more advanced authentication features, consider using third-party packages like django-allauth or django-rest-auth.",
        user_id=6,
        question_id=7,
        is_primary=False
    )
    db.session.add(answer7_5)

    # Answers for post8
    answer8_1 = Answer(
        body="You can use the express-validator library for input validation in an Express.js application. Install it using npm install express-validator.",
        user_id=2,
        question_id=8,
        is_primary=False
    )
    db.session.add(answer8_1)

    answer8_2 = Answer(
        body="To use express-validator, import the check and validationResult functions. Use check in your route to validate inputs and validationResult to handle validation errors.",
        user_id=3,
        question_id=8,
        is_primary=False
    )
    db.session.add(answer8_2)

    answer8_3 = Answer(
        body="Here's an example: app.post('/route', [check('email').isEmail(), check('password').isLength({ min: 6 })], (req, res) => { const errors = validationResult(req); if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array() }); } });",
        user_id=1,
        question_id=8,
        is_primary=False
    )
    db.session.add(answer8_3)

    answer8_4 = Answer(
        body="Make sure to handle the validation errors appropriately in your route handler to provide feedback to the user.",
        user_id=4,
        question_id=8,
        is_primary=False
    )
    db.session.add(answer8_4)

    answer8_5 = Answer(
        body="You can also create custom validators using express-validator if you have specific validation requirements.",
        user_id=6,
        question_id=8,
        is_primary=False
    )
    db.session.add(answer8_5)

    # Answers for post31
    answer9_1 = Answer(
        body="You can use the built-in sorted() function for smaller datasets, but for larger ones, consider using external libraries like pandas or NumPy for efficient sorting.",
        user_id=1,
        question_id=9,
        is_primary=False
    )
    db.session.add(answer9_1)

    answer9_2 = Answer(
        body="The pandas library provides a sort_values() method that is highly efficient for large datasets.",
        user_id=2,
        question_id=9,
        is_primary=False
    )
    db.session.add(answer9_2)

    answer9_3 = Answer(
        body="For extremely large datasets, you might want to consider parallel processing techniques with libraries like Dask.",
        user_id=3,
        question_id=9,
        is_primary=False
    )
    db.session.add(answer9_3)

    answer9_4 = Answer(
        body="You can also use SQL databases for sorting if your dataset is stored in a database. SQL sorting is highly optimized.",
        user_id=4,
        question_id=9,
        is_primary=False
    )
    db.session.add(answer9_4)

    answer9_5 = Answer(
        body="Another efficient way is to use the heapq module which implements the heap queue algorithm, also known as the priority queue algorithm.",
        user_id=5,
        question_id=9,
        is_primary=False
    )
    db.session.add(answer9_5)

    answer9_6 = Answer(
        body="Consider using Python's built-in sorted() function with the key parameter for custom sorting logic.",
        user_id=6,
        question_id=9,
        is_primary=False
    )
    db.session.add(answer9_6)

    answer9_7 = Answer(
        body="If you're dealing with numeric data, NumPy's sort() function is optimized for performance.",
        user_id=7,
        question_id=9,
        is_primary=False
    )
    db.session.add(answer9_7)

    # Answers for post32
    answer10_1 = Answer(
        body="Abstract classes can provide default behavior, whereas interfaces cannot. Use abstract classes when you want to share code among several closely related classes.",
        user_id=1,
        question_id=10,
        is_primary=False
    )
    db.session.add(answer10_1)

    answer10_2 = Answer(
        body="Interfaces are used to define a contract that implementing classes must adhere to, without providing any implementation.",
        user_id=2,
        question_id=10,
        is_primary=False
    )
    db.session.add(answer10_2)

    answer10_3 = Answer(
        body="Abstract classes can have member variables that are inherited, whereas interfaces cannot.",
        user_id=3,
        question_id=10,
        is_primary=False
    )
    db.session.add(answer10_3)

    answer10_4 = Answer(
        body="Interfaces support multiple inheritance, meaning a class can implement multiple interfaces, but a class can only inherit from one abstract class.",
        user_id=4,
        question_id=10,
        is_primary=False
    )
    db.session.add(answer10_4)

    answer10_5 = Answer(
        body="Use interfaces when you expect that unrelated classes would implement your interface. For example, both a Dog and a Car can have a start() method.",
        user_id=5,
        question_id=10,
        is_primary=False
    )
    db.session.add(answer10_5)

    answer10_6 = Answer(
        body="Abstract classes are a good choice when there is some shared behavior, whereas interfaces are better for completely unrelated classes.",
        user_id=6,
        question_id=10,
        is_primary=False
    )
    db.session.add(answer10_6)

    answer10_7 = Answer(
        body="A practical example: use an abstract class for Animals with shared behavior (e.g., breathing) and interfaces for specific abilities (e.g., flying).",
        user_id=7,
        question_id=10,
        is_primary=False
    )
    db.session.add(answer10_7)

    # Answers for post33
    answer11_1 = Answer(
        body="Flask-Login is a useful extension for handling user authentication in Flask applications.",
        user_id=1,
        question_id=11,
        is_primary=False
    )
    db.session.add(answer11_1)

    answer11_2 = Answer(
        body="You can use the werkzeug.security module to hash passwords securely.",
        user_id=2,
        question_id=11,
        is_primary=False
    )
    db.session.add(answer11_2)

    answer11_3 = Answer(
        body="To implement login functionality, you'll need to set up user sessions and manage cookies for user state.",
        user_id=3,
        question_id=11,
        is_primary=False
    )
    db.session.add(answer11_3)

    answer11_4 = Answer(
        body="The Flask-JWT-Extended extension can be used if you prefer using JSON Web Tokens for authentication.",
        user_id=4,
        question_id=11,
        is_primary=False
    )
    db.session.add(answer11_4)

    answer11_5 = Answer(
        body="Always use HTTPS to ensure secure communication between the client and server.",
        user_id=5,
        question_id=11,
        is_primary=False
    )
    db.session.add(answer11_5)

    answer11_6 = Answer(
        body="Consider using OAuth 2.0 for third-party authentication providers like Google or Facebook.",
        user_id=6,
        question_id=11,
        is_primary=False
    )
    db.session.add(answer11_6)

    answer11_7 = Answer(
        body="Remember to validate and sanitize all user inputs to prevent security vulnerabilities such as SQL injection.",
        user_id=7,
        question_id=11,
        is_primary=False
    )
    db.session.add(answer11_7)

    # Answers for post34
    answer12_1 = Answer(
        body="The Context API is useful for passing data through the component tree without having to pass props down manually at every level.",
        user_id=1,
        question_id=12,
        is_primary=False
    )
    db.session.add(answer12_1)

    answer12_2 = Answer(
        body="Redux is a state management library that is particularly useful for managing complex state in large applications.",
        user_id=2,
        question_id=12,
        is_primary=False
    )
    db.session.add(answer12_2)

    answer12_3 = Answer(
        body="For simple state management, React's built-in useState and useReducer hooks are often sufficient.",
        user_id=3,
        question_id=12,
        is_primary=False
    )
    db.session.add(answer12_3)

    answer12_4 = Answer(
        body="The useContext hook makes it easy to access context values without having to pass them down as props.",
        user_id=4,
        question_id=12,
        is_primary=False
    )
    db.session.add(answer12_4)

    answer12_5 = Answer(
        body="Redux can be overkill for small applications, but it shines when you need to manage global state and complex interactions.",
        user_id=5,
        question_id=12,
        is_primary=False
    )
    db.session.add(answer12_5)

    answer12_6 = Answer(
        body="Libraries like Recoil and Zustand offer alternative approaches to state management with less boilerplate than Redux.",
        user_id=6,
        question_id=12,
        is_primary=False
    )
    db.session.add(answer12_6)

    answer12_7 = Answer(
        body="Using the React DevTools extension can help you visualize the component tree and understand state propagation.",
        user_id=7,
        question_id=12,
        is_primary=False
    )
    db.session.add(answer12_7)

    # Answers for post35
    answer13_1 = Answer(
        body="Index your columns to speed up query execution. Indexing is crucial for columns that are frequently used in WHERE clauses.",
        user_id=1,
        question_id=13,
        is_primary=False
    )
    db.session.add(answer13_1)

    answer13_2 = Answer(
        body="Avoid using SELECT * in your queries. Instead, specify only the columns you need.",
        user_id=2,
        question_id=13,
        is_primary=False
    )
    db.session.add(answer13_2)

    answer13_3 = Answer(
        body="Use EXPLAIN to analyze your queries and understand how they are executed.",
        user_id=3,
        question_id=13,
        is_primary=False
    )
    db.session.add(answer13_3)

    answer13_4 = Answer(
        body="Normalize your database schema to reduce redundancy and improve data integrity.",
        user_id=4,
        question_id=13,
        is_primary=False
    )
    db.session.add(answer13_4)

    answer13_5 = Answer(
        body="Denormalize your schema in some cases to avoid complex joins, but be careful about data consistency.",
        user_id=5,
        question_id=13,
        is_primary=False
    )
    db.session.add(answer13_5)

    answer13_6 = Answer(
        body="Consider using materialized views for complex queries that are frequently accessed.",
        user_id=6,
        question_id=13,
        is_primary=False
    )
    db.session.add(answer13_6)

    answer13_7 = Answer(
        body="Use query caching mechanisms to store the results of expensive queries for faster retrieval.",
        user_id=7,
        question_id=13,
        is_primary=False
    )
    db.session.add(answer13_7)


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
