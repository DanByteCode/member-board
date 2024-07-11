# Members Board
This project shows a post table of **Users**, which has a title and message.
## ESSENTIAL
You can register as a user to have an account to make your own posts.
The user can also delete their own posts if they wish.
### MEMBER ROLE
There is also a section to be promoted as **Member** which will be able to view the authors and dates of all the publications.
To obtain this rank you must enter the following code:
CODE: `ODIN`
### ADMINISTRATOR
Finally, there is the Administrator role, which can delete posts from any user.
## CONFIGURATION
To start the project you need to provide the environment variables.
- MDB: Your connection url of the MongoDB database
- SECRET: The secret word to manage sessions
- SALT_ROUNDS: Salt rounds for password encryption
- CODE_MEMBER: Membership code
- CODE_ADMIN: Code to be an administrator
