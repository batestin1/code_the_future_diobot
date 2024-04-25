import os
import base64
import requests

from flask import Flask, render_template, request, jsonify
from bot import BlenderBot

app = Flask(__name__, template_folder='templates')

"""
    Initialize the bot on run application
"""
chat_bot = BlenderBot()


@app.route("/")
def web_client():
    """
        Route default '/': Renderize the HTML form
    """
    return render_template('web_client.html')

@app.route('/api')
def api():
    try:
        """ 
            Get data from HTTP request from form 
        """
        user_input = request.args.get('user_input')
        response = chat_bot.get_response(user_input)
    except Exception as e:
        response = f"Oh no, I'm sorry my circuits detected somthing wrong: ! Error:{e}"
    return jsonify(response)