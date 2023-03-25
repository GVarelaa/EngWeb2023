import json
import requests

with open("persons.json") as file:
    data = json.load(file)


for person in data["pessoas"]:
    res = requests.post("http://localhost:3000/persons", json=person)

