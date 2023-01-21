import os
from os.path import join, dirname
from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify
from pymongo import MongoClient

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

db = MongoClient(os.environ.get('MONGODB_URI'))[os.environ.get('DB_NAME')]

app = Flask(__name__)


@app.route('/<name>')
def index(name):
    return render_template('index.html', name=name)


@app.route('/send-wish', methods=['POST'])
def send_wish():
    receiver_id = request.form['receiver_id']
    name = request.form['name']
    wish = request.form['wish']
    print(name, wish)
    db.wishes.insert_one({
        'receiver_id': receiver_id,
        'name': name,
        'wish': wish
    })
    return jsonify({'message': 'success'})


# I'm using POST method to prevent users from getting all wishes
@app.route('/get-wishes', methods=['POST'])
def get_wishes():
    receiver_id = request.form['receiver_id']
    wishes = db.wishes.find({'receiver_id': receiver_id}, {'_id': 0})
    return jsonify({'wishes': list(wishes), 'message': 'success'})


if __name__ == '__main__':
    app.run('0.0.0.0', 5000, debug=True)
