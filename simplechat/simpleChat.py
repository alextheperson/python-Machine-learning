import re

prompts = {
    "what": "what are the washinton huskies?",
    "when": "When were the washinton huskies around?",
    "why" : "why did they choose a huskie?",
    "who" : "who was the head coach"
}

responses = {
    "what": "The 1958–59 Washington Huskies men's basketball team represented the University of Washington for the 1958–59 NCAA college basketball season",
    "when": "1958-59?",
    "why" : "a reason.",
    "who" : "Tippy Dye"
}

def processInput(userInput):
    # if it is not white space and is not alphanumeric, get rid of it
    userInput = re.sub(r'[^\w\s]', '', userInput)

    words = userInput.split(" ")

    matchingKeys=[]

    for word in words:
        if word in responses.keys():
            matchingKeys.append(word)

    if len(matchingKeys)== 0:
        return "I don't know that."

    elif len(matchingKeys)== 1:
        return responses[matchingKeys[0]]
    
    else:
        print("I do not Know what you mean. did you mean:")
        index = 1

        for key in matchingKeys:
            print(str(index)+") "+prompts[key])
            index += 1
        
        valid = False

        while not valid:
            selected = (input("#:"))
            try:
                selected = int(selected)
                if selected <= len(matchingKeys) and selected > 0:
                    valid = True
                else:
                    print("Please enter an option")
                
            except:
                print("please enter a NUMBER!")

        return responses[matchingKeys[selected-1]]
            

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
            respose = processInput(userInput)
            print(respose)

    print("Bye, come back next time!")    

main()