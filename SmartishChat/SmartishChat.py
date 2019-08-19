import requests

responses = {
    "what": "The 1958–59 Washington Huskies men's basketball team represented the University of Washington for the 1958–59 NCAA college basketball season",
    "when": "1958-59?",
    "why" : "a reason.",
    "who" : "Tippy Dye"
}

def processIntent(intent):
    key = intent["class_name"].lower()
    confidence = intent["confidence"]

    if confidence < 40:
        return "I'm sorry, I forgot that one. :("
    
    if key in responses:
        return "I am " + str(confidence) + "% sure that the answer is: \n" + responses[key]
    else:
        return "I don't know that"

# This function will pass your text to the machine learning model
# and return the top result with the highest confidence
def classify(text):
    key = "c84c5870-c2b0-11e9-a0f7-df809e7c9832a0ff0892-a73e-451d-aa55-d157ad22a00a"
    url = "https://machinelearningforkids.co.uk/api/scratch/"+ key + "/classify"

    response = requests.get(url, params={ "data" : text })

    if response.ok:
        responseData = response.json()
        topMatch = responseData[0]
        return topMatch
    else:
        response.raise_for_status()

'''response = classify(input("quesion? "))
print(response)'''

def main():
    print("Welcome human, I know a lot about the washinton huskies\n")

    name = input("what is you name? ")
    print("hello, "+name+".\n")

    print('Ask me a question about the washinton huskies, or type "q"quit.')

    userInput = ""
    while userInput != "q":
        userInput = input("").lower()
        #print(userInput)
        if userInput != "q":
            intent = classify(userInput)
            respose = processIntent(intent)
            print(respose)

    print("Bye, come back next time!")    

main()