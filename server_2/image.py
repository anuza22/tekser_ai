from flask import Flask, request, jsonify
import cv2
import numpy as np
import pytesseract
from pytesseract import Output

app = Flask(__name__)

@app.route('/process-image', methods=['POST'])
def process_image():
    file = request.files['image']
    correct_positions = request.form.get('correctPositions')
    wrong_positions = request.form.get('wrongPositions')

    correct_positions = json.loads(correct_positions)
    wrong_positions = json.loads(wrong_positions)

    npimg = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    d = pytesseract.image_to_data(gray, output_type=Output.DICT)

    for i in range(len(d['text'])):
        if int(d['conf'][i]) > 60:
            x, y, w, h = d['left'][i], d['top'][i], d['width'][i], d['height'][i]
            for pos in correct_positions:
                if pos['x'] in range(x, x + w) and pos['y'] in range(y, y + h):
                    cv2.putText(img, 'Correct', (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
                    cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)
            for pos in wrong_positions:
                if pos['x'] in range(x, x + w) and pos['y'] in range(y, y + h):
                    cv2.putText(img, 'Wrong', (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)
                    cv2.rectangle(img, (x, y), (x + w, y + h), (0, 0, 255), 2)

    _, buffer = cv2.imencode('.jpg', img)
    encoded_image = buffer.tobytes()

    return encoded_image, 200, {'Content-Type': 'image/jpeg'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
