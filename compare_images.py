import cv2
import pickle

def compare_images(trained_images, input_image_path):
    input_image = cv2.imread(input_image_path, cv2.IMREAD_GRAYSCALE)
    if input_image is None:
        print("Error: Unable to read input image")
        return False
    
    input_image = cv2.resize(input_image, (100, 100))

    for img, filename in trained_images:
        resized_img = cv2.resize(img, (100, 100))
        result = cv2.matchTemplate(input_image, resized_img, cv2.TM_CCOEFF_NORMED)
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)
        
        if max_val > 0.6:
            print("Similarity with", filename, "is greater than 80%")
            return True
    
    print("No similar images found")
    return False

def compare(input_image_path):  # Receive full path of the image file
    print("comparing the image...", input_image_path)
    with open('user_interface/trained_model.pkl', 'rb') as f:
        trained_images = pickle.load(f)

    if trained_images:
        result = compare_images(trained_images, input_image_path)
        if result:
            return "yes"
        else:
            return "no"

# if __name__ == "__main__":
#     res = compare("user_interface/skull.jpg")
#     print(res)
