prompts{
    "what": "what are the washinton huskies?",
    "when": "When were the washinton huskies around?",
    "why" : "why did they choose a huskie?",
    "who" : "who was the head coach"
}

resposes{
    "what": "The 1958–59 Washington Huskies men's basketball team represented the University of Washington for the 1958–59 NCAA college basketball season",
    "when": "1958-59?",
    "why" : "a reason.",
    "who" : "Tippy Dye"
}

def processInput(userInput):
    

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