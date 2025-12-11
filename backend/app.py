from flask import Flask, request, jsonify
from flask_cors import CORS
import os, json
from datetime import datetime

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(BASE_DIR, 'data.json')

def read_data():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        try:
            return json.load(f)
        except:
            return []

def write_data(arr):
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(arr, f, indent=2)

@app.route('/submit', methods=['POST'])
def submit():
    payload = request.get_json() or {}
    if not payload.get('name') or not payload.get('email'):
        return jsonify({'ok': False, 'error': 'name and email required'}), 400

    record = {
        'name': payload.get('name'),
        'email': payload.get('email'),
        'primary_skills': [s.strip() for s in (payload.get('primary_skills') or '').split(',') if s.strip()],
        'secondary_skills': [s.strip() for s in (payload.get('secondary_skills') or '').split(',') if s.strip()],
        'experience': payload.get('experience'),
        'submitted_at': datetime.utcnow().isoformat() + 'Z'
    }
    arr = read_data()
    arr.append(record)
    write_data(arr)
    return jsonify({'ok': True, 'saved': record})

@app.route('/list', methods=['GET'])
def lst():
    return jsonify(read_data())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
