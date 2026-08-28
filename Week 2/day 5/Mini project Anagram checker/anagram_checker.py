from pathlib import Path


class AnagramChecker:
    def __init__(self, file_path=None):
        if file_path is None:
            file_path = Path(__file__).parent / "words.txt"

        with open(file_path, "r", encoding="utf-8") as file:
            self.words = {
                word.strip().lower()
                for word in file
                if word.strip()
            }

    def is_valid_word(self, word):
        return word.lower() in self.words

    def is_anagram(self, word1, word2):
        return sorted(word1.lower()) == sorted(word2.lower())

    def get_anagrams(self, word):
        anagrams = []

        for candidate in self.words:
            if (
                candidate != word.lower()
                and self.is_anagram(word, candidate)
            ):
                anagrams.append(candidate)

        return sorted(anagrams)
