from flask import Flask, render_template, request, jsonify
from tinydb import TinyDB, Query

app = Flask('app')
db = TinyDB('tinydb/markers.json')
User = Query()

print(db.all())

@app.route('/')
def index():
  return render_template("index.html")

@app.route('/map')
def map():
  return render_template("map.html")

@app.route('/save_marker', methods=['GET'])
def save_marker():
  lat = request.args['lat']
  lng = request.args['lng']
  title = request.args['title']
  description = request.args['description']
  imageUrl = request.args['imageUrl']

  # Here you can save the received marker data to your database or perform other actions
  db.insert({'title': title, 'description': description, 'imageUrl': imageUrl, 'lat': lat, 'lng': lng})

  return jsonify(success=True)

@app.route('/load_markers', methods=['GET'])
def load_markers():
  markers = db.all()

  return markers


app.run(host='0.0.0.0', port=8080)
