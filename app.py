from flask import Flask, render_template

app = Flask(__name__)

@app.route("/index.html")
def home():
    return render_template("index.html")

@app.route("/carometro")
def carometro():
    return render_template("carometro.html")

if __name__ == "__main__":
    app.run(debug=True)
    