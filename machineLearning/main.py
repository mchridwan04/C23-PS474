import flask
import io
import string
import time
import os
import numpy as np
import tensorflow as tf
from PIL import Image
from flask import Flask, jsonify, request

model = tf.keras.models.load_model('REPLACE NAME MODEL')

def prepare_image(img):
    img = Image.open(io.BytesIO(img))
    img = img.resize((256, 256))
    img = np.array(img)
    img = np.expand_dims(img, 0)
    return img


def predict_result(img):
    prediction = model.predict(img)[0][0]
    if prediction == 0:
        return "Kualitas ban dalam kondisi bagus"
    else:
        return "Kualitas ban dalam kondisi buruk"
    
def predict_status(img):
    prediction = model.predict(img)[0][0]
    if prediction == 0:
        return "True"
    else:
        return "False"


app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def infer_image():
    if 'file' not in request.files:
        return "Please try again. The Image doesn't exist"
    
    file = request.files.get('file')

    if not file:
        return

    img_bytes = file.read()
    img = prepare_image(img_bytes)
    prediction = predict_result(img)
    predictionStatus = predict_status(img)

    return jsonify(prediction=prediction, isTireGood=predictionStatus ,message="Prediction successful")
    

@app.route('/', methods=['GET'])
def index():
    return 'Machine Learning Detection Ban'


if __name__ == '__main__':
    app.run(debug=True)