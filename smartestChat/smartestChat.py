import nltk
import numpy as np
import random
import string
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

f = open('info.txt', 'r')
raw = f.read().lower()

sentence_tokens = nltk.sent_tokenize(raw)
lemmer = nltk.stem.WordNetLemmatizer()

def lemTokens(tokens):
    return[lemmer.lemmatize(tokens) for token in tokens]

remove_punct_dict = dict((ord(punct), None) for punct in string.punctuation)


def lemNormalize(text):
    return Lem(nltk.word_tokenize(text.lower().translate(remove_punct_dict)))


GREETINGS = ("hello", "sup", "greetings", "good", "hi", "what's up?", "hey")
RESPONSE = ["hello, human", "greetings, human", "you too, human", "hi, human", "welcome to my domain, human"]


def greeting(sentence):
    for word  in sentence.split():
        if word.lower() in GREETINGS:
            return random.choice(RESPONSE)
        else:
            return "hi"

print(greeting(input("")))