from app.models import db, Question, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_questions():
    # post1 = Question(
    #     title = "This is a test post, say hello!",
    #     body = "I was wondering, how do I change the title of my post? is that even possible?",
    #     user_id=1
    #     )
    # post2 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=1
    #     )
    # post3 = Question(
    #     title = "How does an oven work? All of my garlic bread is being burnt!",
    #     body = "I was wondering, how do I use an oven? I just want to have my garlic bread and eat it too!",
    #     user_id=2
    #     )
    # post4 = Question(
    #     title = "Running into flask db errors",
    #     body = "Seems to run the default schema and prepare to upgrade, but errors out with no message in terminal. What do I need to do to fix this?",
    #     user_id=2
    #     )
    # post5 = Question(
    #     title = "Issue with Application Visualization in Revit",
    #     body = "I developed an application using C# based on Revit. When I run the application from Visual Studio, it works perfectly. However, when I run the app from Revit, all the functionalities work except for the visualization function. It works the first time and then crashes.&%$;!Is there anyone who can help me?&%$;!Is there anyone I can share the code with who can help me fix this bug?",
    #     user_id=3
    #     )
    # post6 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=3
    #     )
    # post7 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=4
    #     )
    # post8 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=4
    #     )
    # post9 = Question(
    #     title = "This is a test post, say hello!",
    #     body = "I was wondering, how do I change the title of my post? is that even possible?",
    #     user_id=5
    #     )
    # post10 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=5
    #     )
    # post11 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=6
    #     )
    # post12 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=6
    #     )
    # post13 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=7
    #     )
    # post14 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=7
    #     )
    # post15 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=8
    #     )
    # post16 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=8
    #     )
    # post17 = Question(
    #     title = "This is a test post, say hello!",
    #     body = "I was wondering, how do I change the title of my post? is that even possible?",
    #     user_id=9
    #     )
    # post18 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=9
    #     )
    # post19 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=10
    #     )
    # post20 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=10
    #     )
    # post21 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=11
    #     )
    # post22 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=11
    #     )
    # post23 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=12
    #     )
    # post24 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=12
    #     )
    # post25 = Question(
    #     title = "This is a test post, say hello!",
    #     body = "I was wondering, how do I change the title of my post? is that even possible?",
    #     user_id=13
    #     )
    # post26 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=13
    #     )
    # post27 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=14
    #     )
    # post28 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=14
    #     )
    # post29 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=15
    #     )
    # post30 = Question(
    #     title = "How does a toaster work? All of my toast is being burnt!",
    #     body = "I was wondering, how do I use a toaster? I just want to have my bread and eat it too!",
    #     user_id=15
    #     )
#     post1 = Question(
#     title="How do I center a div in CSS?",
#     body="I'm trying to center a div both horizontally and vertically. I've tried using margin: auto but it doesn't seem to work. What am I missing?",
#     user_id=1
# )

#     post2 = Question(
#         title="What's the difference between let and var in JavaScript?",
#         body="I've seen examples using both let and var to declare variables in JavaScript. What are the differences and when should I use each one?",
#         user_id=2
#     )

#     post3 = Question(
#         title="How to connect to a MySQL database using Python?",
#         body="I'm new to Python and I'm trying to connect to a MySQL database. What libraries do I need and can you provide an example?",
#         user_id=3
#     )

#     post4 = Question(
#         title="What is the difference between == and === in JavaScript?",
#         body="I've come across both == and === in JavaScript. What is the difference between these two comparison operators?",
#         user_id=4
#     )

#     post5 = Question(
#         title="How do I create a virtual environment in Python?",
#         body="I want to create a virtual environment for my Python project to manage dependencies. What is the best way to do this?",
#         user_id=5
#     )

#     post6 = Question(
#         title="How to fetch data from an API in React?",
#         body="I'm building a React application and I need to fetch data from an external API. What is the best way to do this?",
#         user_id=6
#     )

#     post7 = Question(
#         title="How to implement user authentication in Django?",
#         body="I'm working on a Django project and I need to implement user authentication. What are the best practices for doing this?",
#         user_id=7
#     )

#     post8 = Question(
#         title="What is the best way to handle form validation in React?",
#         body="I have a form in my React application and I need to validate the input fields. What is the best approach to handle form validation?",
#         user_id=8
#     )

#     post9 = Question(
#     title="How to efficiently sort a large dataset in Python?",
#     body="I have a dataset with millions of records that I need to sort. What are the most efficient ways to sort such a large dataset in Python? Are there any libraries or specific algorithms that are better suited for this task?",
#     user_id=1
# )

#     post10 = Question(
#         title="What is the difference between abstract classes and interfaces in Java?",
#         body="I've been learning about object-oriented programming in Java, and I'm a bit confused about when to use abstract classes versus interfaces. Can someone explain the key differences between them and provide examples of when to use each?",
#         user_id=2
#     )

#     post11 = Question(
#         title="How to implement authentication in a Flask web application?",
#         body="I'm developing a web application using Flask and need to implement user authentication. What are the best practices for setting up authentication in Flask? Are there any libraries or extensions that can make this process easier?",
#         user_id=3
#     )

#     post12 = Question(
#         title="How to manage state in a React application?",
#         body="Managing state in a React application seems complex, especially as the app grows larger. Can someone explain the different methods for managing state in React and provide examples of when to use each method? Specifically, I'm interested in the use of Context API and Redux.",
#         user_id=4
#     )

#     post13 = Question(
#         title="What are the best practices for optimizing SQL queries?",
#         body="I've noticed that some of my SQL queries are running quite slowly. What are some best practices for optimizing SQL queries to improve performance? Are there specific techniques or tools that can help identify and resolve performance bottlenecks?",
#         user_id=5
#     )
    post1 = Question(
    title="How to implement lazy loading in a large-scale React application?",
    body="I'm working on a large-scale React application that has many components and routes. I've noticed that the initial load time of the app is quite slow, which negatively impacts the user experience. I've heard that lazy loading can help improve performance by loading components only when they are needed. Can someone explain how to implement lazy loading in a React application? What are the best practices and potential pitfalls to be aware of? Any code examples would be greatly appreciated.",
    user_id=1
    )
    db.session.add(post1)

    post2 = Question(
        title="How to handle exceptions in a multi-threaded Java application?",
        body="I'm developing a multi-threaded application in Java, and I'm struggling with exception handling. When an exception occurs in one thread, it doesn't seem to affect the other threads, which makes it hard to manage the overall application state. How can I properly handle exceptions in a multi-threaded environment? Are there any best practices or patterns that can help ensure that exceptions are logged and managed correctly across all threads? Examples would be helpful.",
        user_id=2
    )
    db.session.add(post2)

    post3 = Question(
        title="How to optimize performance in a large MySQL database?",
        body="I have a MySQL database that has grown significantly over time and now contains millions of records. I've noticed that some queries are taking much longer to execute than they used to. What are some effective strategies for optimizing performance in a large MySQL database? Are there specific indexing techniques, query optimizations, or hardware considerations that I should be aware of? Detailed explanations and examples would be very helpful.",
        user_id=3
    )
    db.session.add(post3)

    post4 = Question(
        title="How to implement a custom authentication system in a Django application?",
        body="I'm building a web application using Django and need to implement a custom authentication system. The default Django authentication system doesn't quite fit my requirements, so I need to create a custom solution. Can someone guide me through the process of creating a custom authentication backend in Django? What are the key steps and best practices to follow? Any code snippets or examples would be greatly appreciated.",
        user_id=4
    )
    db.session.add(post4)

    post5 = Question(
        title="How to effectively manage state in a Vue.js application?",
        body="I'm developing a Vue.js application and finding it challenging to manage the state as the application grows. I've heard about Vuex as a state management library for Vue, but I'm not sure if it's the right solution for my needs. Can someone explain the different methods for managing state in Vue.js, including Vuex? What are the pros and cons of each method, and when should each be used? Detailed explanations and examples would be very helpful.",
        user_id=5
    )
    db.session.add(post5)

    post6 = Question(
        title="How to create a scalable RESTful API with Flask?",
        body="I'm working on a project where I need to develop a RESTful API using Flask. The application is expected to scale significantly, and I want to ensure that the API can handle high traffic and large amounts of data. Can someone explain the best practices for creating a scalable RESTful API with Flask? What are the key considerations for performance, security, and maintainability? Code examples would be greatly appreciated.",
        user_id=6
    )
    db.session.add(post6)

    post7 = Question(
        title="How to perform data cleaning and preprocessing in Python for machine learning?",
        body="I'm working on a machine learning project and need to clean and preprocess a large dataset. The data contains missing values, duplicates, and various inconsistencies. What are the best practices for data cleaning and preprocessing in Python? Are there specific libraries or tools that can help streamline this process? Detailed explanations and code examples would be very helpful.",
        user_id=7
    )
    db.session.add(post7)

    post8 = Question(
        title="How to secure a Node.js application from common vulnerabilities?",
        body="I'm developing a web application using Node.js and want to ensure that it is secure from common vulnerabilities such as SQL injection, cross-site scripting (XSS), and cross-site request forgery (CSRF). What are the best practices for securing a Node.js application? Are there specific libraries or tools that can help protect against these threats? Detailed explanations and code examples would be greatly appreciated.",
        user_id=8
    )
    db.session.add(post8)

    post9 = Question(
        title="How to deploy a machine learning model using AWS SageMaker?",
        body="I've developed a machine learning model that performs well in my local environment, and now I need to deploy it to production. I've heard that AWS SageMaker is a good platform for deploying machine learning models. Can someone guide me through the process of deploying a machine learning model using AWS SageMaker? What are the key steps and best practices to follow? Any code snippets or examples would be very helpful.",
        user_id=9
    )
    db.session.add(post9)

    post10 = Question(
        title="How to implement continuous integration and deployment (CI/CD) for a Python project?",
        body="I'm working on a Python project and want to set up continuous integration and deployment (CI/CD) to automate testing and deployment. What are the best practices for implementing CI/CD for a Python project? Are there specific tools or platforms that are recommended for this purpose? Detailed explanations and examples would be greatly appreciated.",
        user_id=10
    )
    db.session.add(post10)

    post11 = Question(
        title="How to handle large file uploads in a web application?",
        body="I'm building a web application that needs to support large file uploads. I'm concerned about performance, security, and user experience when handling large files. What are the best practices for managing large file uploads in a web application? Are there specific technologies or techniques that can help streamline this process? Detailed explanations and examples would be greatly appreciated.",
        user_id=11
    )
    db.session.add(post11)

    post12 = Question(
        title="How to create a responsive design using CSS Grid and Flexbox?",
        body="I'm working on a web project and want to create a responsive design that works well on different screen sizes. I've heard that CSS Grid and Flexbox are powerful tools for creating responsive layouts. Can someone explain how to use CSS Grid and Flexbox to create a responsive design? What are the key concepts and best practices to keep in mind? Code examples would be very helpful.",
        user_id=12
    )
    db.session.add(post12)

    post13 = Question(
        title="How to implement OAuth 2.0 authentication in a Node.js application?",
        body="I'm developing a Node.js application and need to implement OAuth 2.0 authentication to allow users to log in with their Google accounts. Can someone guide me through the process of setting up OAuth 2.0 authentication in a Node.js application? What are the key steps and best practices to follow? Any code snippets or examples would be greatly appreciated.",
        user_id=13
    )
    db.session.add(post13)

#     db.session.add(post1)
#     db.session.add(post2)
#     db.session.add(post3)
#     db.session.add(post4)
#     db.session.add(post5)
#     db.session.add(post6)
#     db.session.add(post7)
#     db.session.add(post8)
#     db.session.add(post9)
#     db.session.add(post10)
#     db.session.add(post11)
#     db.session.add(post12)
#     db.session.add(post13)
    # db.session.add(post9)
    # db.session.add(post10)
    # db.session.add(post11)
    # db.session.add(post12)
    # db.session.add(post13)
    # db.session.add(post14)
    # db.session.add(post15)
    # db.session.add(post16)
    # db.session.add(post17)
    # db.session.add(post18)
    # db.session.add(post19)
    # db.session.add(post20)
    # db.session.add(post21)
    # db.session.add(post22)
    # db.session.add(post23)
    # db.session.add(post24)
    # db.session.add(post25)
    # db.session.add(post26)
    # db.session.add(post27)
    # db.session.add(post28)
    # db.session.add(post29)
    # db.session.add(post31)
    # db.session.add(post32)
    # db.session.add(post33)
    # db.session.add(post34)
    # db.session.add(post35)
    # db.session.add(post36)
    # db.session.add(post37)
    # db.session.add(post38)
    # db.session.add(post39)
    # db.session.add(post40)
    # db.session.add(post41)
    # db.session.add(post42)
    # db.session.add(post43)
    # db.session.add(post44)
    # db.session.add(post45)
    # db.session.add(post45)
    # db.session.add(post47)
    # db.session.add(post48)
    # db.session.add(post49)
    # db.session.add(post50)
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
