from flask import Flask, request, session
import pymysql

app = Flask(__name__)


def getCurcor():
    data = request.get_json()
    username = data["username"]
    password = data["password"]
    connection = pymysql.connect(host="localhost",
                                 port=3306,
                                 user="root",
                                 password="yangqiyuan2003",
                                 charset="utf8mb4",
                                 database="demo1"
                                 )
    cursor = connection.cursor()
    return username, password, cursor, connection


@app.route('/', methods=["post", "get"])
def helloworld():
    return "hello world"


@app.route("/do_register", methods=["post"])
def do_register():
    username, password, cursor, connection = getCurcor()
    sql = "insert into user values(%s,%s)"
    try:
        cursor.execute(sql, (username, password))
        connection.commit()
        cursor.close()
        connection.close()
        return "success"
    except:
        errorDefault = ""
        connection.rollback()
        sql_2 = "select * from user where username=%s"
        cursor.execute(sql_2, username)
        result = cursor.fetchone()
        if (result):
            errorDefault = "your username has been registered"
        else:
            errorDefault = "false"
        cursor.close()
        connection.close()
        return errorDefault


@app.route("/do_login", methods=["post"])
def do_login():
    username, password, cursor, connection = getCurcor()
    sql = "select * from user where username=%s and password=%s"
    cursor.execute(sql, (username, password))
    result = cursor.fetchone()
    cursor.close()
    connection.close()
    if result:
        return username + ":  success"
    else:
        return "false"


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
