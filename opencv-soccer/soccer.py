import cv2

goal_lower = (98, 6, 115)
goal_upper = (138, 46, 195)

ball_lower = (-9, 132, 213)
ball_upper = (31, 172, 293)

def overlap(ballX, ballY, ballRadius, goalX, goalY, goalWidth, goalHeight):
    if(goalX < ballX - ballRadius < goalX + goalWidth):
        if(goalY < ballY - ballRadius < goalY + goalHeight):
            return True
    return False

cap = cv2.VideoCapture(1)#0 if you see your self
cap.set(3, 640)
cap.set(4, 480)

scored = False
ready = True

while True:

    _, img = cap.read()

    img = cv2.flip(img, 1)

    blurred = cv2.GaussianBlur(img, (11, 11), 0)

    hsv = cv2.cvtColor(blurred, cv2.COLOR_BGR2HSV)

    goalMask = cv2.inRange(hsv, goal_lower, goal_upper)
    goalMask = cv2.erode(goalMask, None, iterations = 2)
    goalMask = cv2.dilate(goalMask, None, iterations = 2)

    goalContours, goalHi = cv2.findContours(goalMask.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    ballMask = cv2.inRange(hsv, ball_lower, ball_upper)
    ballMask = cv2.erode(ballMask, None, iterations = 2)
    ballMask = cv2.dilate(ballMask, None, iterations = 2)

    ballContours, ballHi = cv2.findContours(ballMask.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)


    if len(goalContours) > 0 and len(ballContours) > 0:
        bestGoal = max(goalContours, key=cv2.contourArea)

        goalX, goalY, goalW, goalH = cv2.boundingRect(bestGoal)
        cv2.rectangle(img, (goalX, goalY), (goalX + goalW, goalY + goalH), (0, 255, 0), 2)

        bestBall = max(ballContours,  key= cv2.contourArea)

        (ballX, ballY), radius = cv2.minEnclosingCircle(bestBall)
        center = (int(ballX), int(ballY))
        radius = int(radius)
        cv2.circle(img, center, radius, (0, 255, 0), 2)

        if (overlap(ballX, ballY, radius, goalX, goalY, goalW, goalH)):
            if not scored and ready:
                scored = True
                ready = False
            else:
                scored = False

    cv2.imshow('soccer', img)

    if cv2.waitKey(1) & 0xFF == ord('r'):
        ready = True
    
    if scored:
        print('goal!!')

    if cv2.waitKey(1) & 0xFF == ord('q'):
        cap.release()
        cv2.destroyAllWindows()
        break