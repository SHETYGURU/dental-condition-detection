from flask import Flask, render_template, jsonify, request ,send_from_directory
from werkzeug.utils import secure_filename
from compare_images import compare
from detect import detect_problems
import os

app = Flask(__name__)
app.static_folder='static'
app.static_url_path='static/'

@app.route('/')
def intro():
    return render_template('intro.html')

@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/upload')
def upload():
    return render_template('upload.html')

@app.route('/detail')
def deatil():
    return render_template('details.html')

# @app.route('/intro')
# def intro():
#     return render_template('intro.html')

@app.route('/process',methods=['POST'])
def process(): 
    if "defected_image" not in request.files:
        return jsonify({'Error': 'No file found'})

    # Get the uploaded file
    defected_tooth = request.files["defected_image"]
    if defected_tooth:
        filename = secure_filename(defected_tooth.filename)
        defected_tooth.save(filename)
        file_name = os.path.basename(filename)
        print(file_name)
        res=compare(filename)
        print(res)
        if res == 'yes':
            results_dir = "C:/Users/user/Downloads/user_interface--(2)/user_interface/static/results"
            # Get the file name of the chosen image
            file_name = os.path.basename(filename)
            print(file_name)
            result = detect_problems(file_name)
            # Find the latest directory with the format "expX"
            latest_exp_dir = max([f.path for f in os.scandir(results_dir) if f.is_dir() and f.name.startswith("exp")], key=os.path.getmtime)

            # Construct the path to the image file in the latest expX directory
            image_path = os.path.join(os.path.relpath(latest_exp_dir),file_name)
            image_path = os.path.join(image_path.replace("\\", "/"))
            print("image :"+image_path)
            # Return the image path
            return jsonify({'DetectedTooth': image_path, 'Message': 'image detection successful'})
        else:
            print("select other image to proceed!")
            return jsonify({'Message': 'Please select correct image to proceed!'})  # Return message here

    return jsonify({'Error': 'Unknown error occurred'})

if __name__ == '__main__':
    app.run(debug=True)