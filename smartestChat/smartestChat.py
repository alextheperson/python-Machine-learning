import nltk
import numpy as np
import random
import string
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

f = open('info.txt', 'r')
raw = f.read()

sentence_tokens = nltk.sent_tokenize(raw)
lemmer = nltk.stem.WordNetLemmatizer()

def lemTokens(tokens):
    return[lemmer.lemmatize(token) for token in tokens]

remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)


def lemNormalize(text):
    return lemTokens(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))


GREETINGS = ("hello", "hello", "sup", "greetings", "good", "hi", "what's up?", "hey")
RESPONSE = ["hello, human", "greetings, human", "you too, human", "hi, human", "welcome to my domain, human"]


def greeting(sentence):
    sentence = re.sub(r'[^\w\s]', '', sentence)
    for word  in sentence.split():
        if word.lower() in GREETINGS:
            return random.choice(RESPONSE)

def response(userInput):
    sentence_tokens.append(userInput)
    Tfidvec = TfidfVectorizer(tokenizer=lemNormalize)
    tfidf = Tfidvec.fit_transform(sentence_tokens)

    vals = cosine_similarity(tfidf[-1], tfidf)
    flat = vals.flatten()

    idx = flat.argsort()[-2]

    flat.sort()

    bestresponse = flat[-2]

    if bestresponse == 0:
        return "I don't know"
    else:
        return sentence_tokens[idx]
    return None

print(">>>Hello, small insignifficant human servent what questions do you have about robots? If you would like to exit my supirior presence, type'bye'")
name = input(">>>What is your name?\n")
while True:
    userInput = input("user("+name+") $").lower()
    print(">>>", end="")
    if userInput != "bye":
        if greeting(userInput) != None:
            print(greeting(userInput))
        else:
            print(response(userInput))
            sentence_tokens.remove(userInput)
    else:
        print("...")
        break