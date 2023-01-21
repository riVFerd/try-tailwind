from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/<name>')
def index(name):
    return render_template('index.html', name=name)


if __name__ == '__main__':
    app.run('0.0.0.0', 5000, debug=True)
