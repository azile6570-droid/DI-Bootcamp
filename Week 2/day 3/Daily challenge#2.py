
french_words = ["Bonjour", "Au revoir", "Bienvenue", "A bientôt"]

translator = 'Translator'()

translated_words = {
    word: translator.translate(word, src="fr", dest="en").text
    for word in french_words
}

print(translated_words)
