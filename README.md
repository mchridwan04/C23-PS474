Bengkel API CC

Endpoint : comingsoon

    Register URL /api/register

Method POST

Request Body (JSON)

    “email”, String, required
    “usern”, String, required
    “pass”, String, required

Response "success"

    Login URL /login

Method POST

Request Body (JSON)

    “email”, String, required
    “usern”, String, required
    “pass”, String, required

Response "login success" (if login is successful) "login fail" (else)

    Explore URL /explore

Method GET

Request Body (JSON) none

Response "[
{ "userAvatar": userAvatar link "username": username string "feeds": post feeds link "numLikes": "X likes" (in string, X is amount of likes) "caption": caption string } ]"
