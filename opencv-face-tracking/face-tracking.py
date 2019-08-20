import cv2
import time
import random

cap = cv2.VideoCapture(0)
cap.set(3, 1280)
cap.set(4, 720)

classifier = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

time.sleep(1)

points = 0
hitTarget = True

targetX = 0
targety = 0
targetW = 100

while(True):
    _, img = cap.read()

    img = cv2.flip(img, 1)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    faces = classifier.detectMultiScale(gray, 1.3, 5)

    for (x, y, w, h) in faces:
        cv2.rectangle(img, (x, y), (x+w, y+h), (200, 0, 200), 3)

        if (x <= targetX <= x + w) and (y <= targety <= y + h):
            hitTarget = True
            cv2.rectangle(img, (targetX, targety), (targetX + targetW, targety + targetW), (0, 225, 0), 3)
            points += 50
    
    if hitTarget :
        targetX = random.randint(targetW, 1280 - targetW)
        targety = random.randint(targetW, 720 - targetW)
        hitTarget = False

    cv2.rectangle(img, (targetX, targety), (targetX + targetW, targety + targetW), (0, 0, 225), 3)
    
    cv2.putText(img, "Score: "+str(points), (5, 27), cv2.FONT_HERSHEY_COMPLEX, 1, (0, 0, 0), 2)

    cv2.imshow("Face Tracker", img)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        cap.release()
        cv2.destroyAllWindows()
        break