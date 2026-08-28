# Challenge
import string
import re
from collections import Counter


class Text:
    def __init__(self, text):
        self.text = text

    def _words(self):
        return self.text.lower().split()

    def word_frequency(self, word):
        count = self._words().count(word.lower())
        return count if count > 0 else None

    def most_common_word(self):
        words = self._words()

        if not words:
            return None

        return Counter(words).most_common(1)[0][0]

    def unique_words(self):
        return list(set(self._words()))

    @classmethod
    def from_file(cls, file_path):
        with open(file_path, "r", encoding="utf-8") as file:
            return cls(file.read())


class TextModification(Text):
    def remove_punctuation(self):
        translation_table = str.maketrans("", "", string.punctuation)
        self.text = self.text.translate(translation_table)
        return self.text

    def remove_stop_words(self):
        stop_words = {
            "a", "an", "the", "and", "or", "but", "is", "are",
            "in", "on", "at", "to", "of", "for", "with", "this",
            "that", "it", "as", "was", "were", "be", "by"
        }

        words = self.text.split()
        self.text = " ".join(
            word for word in words if word.lower() not in stop_words
        )
        return self.text

    def remove_special_characters(self):
        self.text = re.sub(r"[^a-zA-Z0-9\s]", "", self.text)
        return self.text


text = Text(
    "A good book is a book that makes you think. "
    "A good book can teach you something new."
)

print("Frequency of 'book':", text.word_frequency("book"))
print("Most common word:", text.most_common_word())
print("Unique words:", text.unique_words())

modified_text = TextModification(text.text)
print("Without punctuation:", modified_text.remove_punctuation())
print("Without stop words:", modified_text.remove_stop_words())
print(
    "Without special characters:",
    modified_text.remove_special_characters()
)